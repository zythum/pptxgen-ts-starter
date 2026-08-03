/**
 * generate-pptx.ts — CLI build tool for `npm run generate`.
 *
 * Uses tsImport() (from the tsx runtime) to dynamically import the deck
 * entry file and renders it to a .pptx file.
 */
import { tsImport } from "tsx/esm/api";
import { createRequire } from "node:module";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { validateDeck, renderPptx, writePptx } from "@zythum02/pptxgenjsx/render";
import arg from "arg";
import JSZip from "jszip";

// PptxGenJS 4.0.1 writes a trailing apostrophe in table ranges for embedded
// workbooks used by non-scatter charts, e.g. ref="A1:D5'". PowerPoint tolerates
// it, while stricter OOXML consumers such as Keynote may reject the workbook.
// Upstream fix: https://github.com/gitbrent/PptxGenJS/pull/1327
const INVALID_EMBEDDED_TABLE_REF = /\bref="([A-Z]{1,3}[1-9]\d*:[A-Z]{1,3}[1-9]\d*)'"/g;

export interface ChartTableRefFixResult {
  data: Uint8Array;
  fixedTableRefs: number;
  fixedWorkbooks: number;
}

/**
 * Repair PptxGenJS's malformed table-range apostrophe in embedded XLSX files.
 * The transformation is intentionally narrow and safe to run more than once.
 */
export async function fixPptxGenJsChartTableRefs(
  input: ArrayBuffer | Uint8Array,
): Promise<ChartTableRefFixResult> {
  const pptx = await JSZip.loadAsync(input);
  const embeddedWorkbooks = pptx.file(/^ppt\/embeddings\/[^/]+\.xlsx$/i);
  let fixedTableRefs = 0;
  let fixedWorkbooks = 0;

  for (const embeddedWorkbook of embeddedWorkbooks) {
    const workbook = await JSZip.loadAsync(await embeddedWorkbook.async("uint8array"));
    const tables = workbook.file(/^xl\/tables\/table[^/]*\.xml$/i);
    let workbookFixes = 0;

    for (const table of tables) {
      const xml = await table.async("string");
      const sanitized = xml.replace(INVALID_EMBEDDED_TABLE_REF, (_match, range: string) => {
        workbookFixes += 1;
        return `ref="${range}"`;
      });

      if (sanitized !== xml) {
        workbook.file(table.name, sanitized);
      }
    }

    if (workbookFixes > 0) {
      const sanitizedWorkbook = await workbook.generateAsync({
        type: "uint8array",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      });
      pptx.file(embeddedWorkbook.name, sanitizedWorkbook);
      fixedTableRefs += workbookFixes;
      fixedWorkbooks += 1;
    }
  }

  if (fixedTableRefs === 0) {
    return {
      data: input instanceof Uint8Array ? input : new Uint8Array(input),
      fixedTableRefs,
      fixedWorkbooks,
    };
  }

  const data = await pptx.generateAsync({
    type: "uint8array",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
  return { data, fixedTableRefs, fixedWorkbooks };
}

async function fixGeneratedChartTableRefs(output: string) {
  const source = await fs.promises.readFile(output);
  const result = await fixPptxGenJsChartTableRefs(source);
  if (result.fixedTableRefs === 0) return;

  await fs.promises.writeFile(output, result.data);
}

// ── CLI entry point ───────────────────────────────────────────────
const currentUrl = pathToFileURL(process.argv[1]!).href;
if (currentUrl === import.meta.url) {
  main().catch((err) => {
    const e = err instanceof Error ? err : new Error(String(err));
    console.error("✖ Failed to generate presentation");
    console.error("  Error:", e.message);
    console.error("  Stack:", e.stack);
    process.exit(1);
  });

  async function main() {
    const args = arg(
      {
        "--output": String,
        "--help": Boolean,
        "-o": "--output",
      },
      { argv: process.argv.slice(2) },
    );

    if (args["--help"]) {
      console.log("Usage: tsx scripts/generate-pptx.ts [options] <entry>");
      console.log("");
      console.log("Options:");
      console.log("  -o, --output <file>   Output .pptx file path");
      console.log("  --help                Show this help message");
      process.exit(0);
    }

    const entry = args._[0];
    const output = args["--output"] ?? args._[1];
    if (!entry) {
      console.error("Usage: tsx scripts/generate-pptx.ts [options] <entry>");
      console.error("  <entry> — Path to the slide entry file (e.g. src/ppt.tsx)");
      process.exit(1);
    }
    if (!output) {
      console.error("Error: --output is required");
      process.exit(1);
    }
    // Resolve entry relative to current working directory
    const cwd = process.cwd();
    const resolvedEntry = path.resolve(cwd, entry);
    const resolvedOutput = output.startsWith("/") ? output : path.resolve(cwd, output);
    try {
      await generate({ entry: resolvedEntry, output: resolvedOutput });
      console.log("✅ Generated:", resolvedOutput);
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      console.error("✖ Failed to generate presentation");
      console.error("  Entry file:", resolvedEntry);
      console.error("  Error:", e.message);
      console.error("  Stack:", e.stack);
      process.exit(1);
    }
  }
}

export interface GenerateOptions {
  /** Entry file path relative to root (e.g. src/ppt.tsx) */
  entry: string;
  /** Output .pptx file path */
  output?: string;
  /** Output as ArrayBuffer */
  outputType?: "arraybuffer";
  /** Project root (default: parent of scripts/) */
  root?: string;
}

export async function generate(options: GenerateOptions): Promise<ArrayBuffer | undefined> {
  const root = options.root ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const entryPath = path.resolve(root, options.entry);

  // Resolve output path before chdir (output can be relative to original cwd)
  const outputAbs = options.output
    ? path.isAbsolute(options.output)
      ? options.output
      : path.resolve(root, options.output)
    : undefined;

  // chdir to the entry file's directory so its relative imports resolve correctly
  process.chdir(path.dirname(entryPath));

  // tsImport does NOT cache — every call re-evaluates with latest changes
  let mod;
  try {
    mod = await tsImport(entryPath.replace(/\\/g, "/"), import.meta.url);
  } catch (err) {
    const e = err instanceof Error ? err : new Error(String(err));
    e.message = `Failed to import entry file "${entryPath}":\n  ${e.message}`;
    throw e;
  }

  let deck;
  try {
    deck = mod.default();
  } catch (err) {
    const e = err instanceof Error ? err : new Error(String(err));
    e.message = `Error in deck default export (${entryPath}):\n  ${e.message}`;
    throw e;
  }

  // Validate before rendering
  const issues = await validateDeck(deck);
  if (issues.some((i: any) => i.level === "error")) {
    const err = new Error("Deck validation failed:\n" + JSON.stringify(issues, null, 2));
    // Attach the entry file path for better error reporting
    throw err;
  }

  // Use createRequire to get the real constructor (avoids ESM default-import wrapper issue)
  const PptxGenJS = createRequire(import.meta.url)("pptxgenjs");
  const pptx = new PptxGenJS();

  if (outputAbs) {
    // Ensure output directory exists
    const outputDir = path.dirname(outputAbs);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    try {
      await renderPptx(deck, { fileName: outputAbs, pptx });
      await fixGeneratedChartTableRefs(outputAbs);
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      e.message = `Failed to render PPTX to "${outputAbs}":\n  ${e.message}`;
      throw e;
    }
    return undefined;
  }

  if (options.outputType === "arraybuffer") {
    try {
      const buf = (await writePptx(deck, { outputType: "arraybuffer", pptx })) as ArrayBuffer;
      const result = await fixPptxGenJsChartTableRefs(buf);
      return new Uint8Array(result.data).buffer;
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      e.message = `Failed to write PPTX buffer:\n  ${e.message}`;
      throw e;
    }
  }

  throw new Error("Must specify either output or outputType");
}
