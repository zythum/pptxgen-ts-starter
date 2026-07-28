/**
 * generate.ts — CLI build tool for `npm run generate`.
 *
 * Uses tsImport() (from the tsx runtime) to dynamically import the deck
 * entry file and renders it to a .pptx file.
 */
import { tsImport } from "tsx/esm/api";
import { createRequire } from "node:module";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { validateDeck, renderPptx, writePptx } from "@artifact-kit/pptxgenjs-jsx";
import arg from "arg";

// ── CLI entry point ───────────────────────────────────────────────
const currentUrl = pathToFileURL(process.argv[1]!).href;
if (currentUrl === import.meta.url) {
  main().catch((err) => {
    console.error("Failed to generate presentation:", err);
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
      console.log("Usage: tsx scripts/generate.ts [options] <entry>");
      console.log("");
      console.log("Options:");
      console.log("  -o, --output <file>   Output .pptx file path");
      console.log("  --help                Show this help message");
      process.exit(0);
    }

    const entry = args._[0];
    const output = args["--output"] ?? args._[1];
    if (!entry) {
      console.error("Usage: tsx scripts/generate.ts [options] <entry>");
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
    await generate({ entry: resolvedEntry, output: resolvedOutput });
    console.log("✅ Generated:", resolvedOutput);
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
    ? (path.isAbsolute(options.output) ? options.output : path.resolve(root, options.output))
    : undefined;

  // chdir to the entry file's directory so its relative imports resolve correctly
  process.chdir(path.dirname(entryPath));

  // tsImport does NOT cache — every call re-evaluates with latest changes
  const mod = await tsImport(
    entryPath.replace(/\\/g, "/"),
    import.meta.url,
  );
  const deck = mod.default();

  // Validate before rendering
  const issues = validateDeck(deck);
  if (issues.some((i: any) => i.level === "error")) {
    throw new Error(
      "Deck validation failed:\n" + JSON.stringify(issues, null, 2)
    );
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
    await renderPptx(deck, { fileName: outputAbs, pptx });
    return undefined;
  }

  if (options.outputType === "arraybuffer") {
    const buf = await writePptx(deck, { outputType: "arraybuffer", pptx }) as ArrayBuffer;
    return buf;
  }

  throw new Error("Must specify either output or outputType");
}
