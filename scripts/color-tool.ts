#!/usr/bin/env tsx
/**
 * color-tool.ts
 *
 * Color derivation utilities for pptxgenjs slide development.
 *
 * Why this tool:
 * the design skill (palettes.md) forbids LLMs from inventing hex colors out
 * of thin air — derived colors must come from preset tokens. Hand-computing
 * hex → HSL in the head is unreliable, so any derived color (lighten /
 * darken / desaturate / contrast check) must be computed with this tool.
 *
 * Color math is delegated to the `color` npm package (the de-facto standard);
 * this script only wraps it into a pptxgenjs-friendly CLI.
 *
 * Usage:
 *   npx tsx scripts/color-tool.ts --hex 7C3AED --lighten 15
 *   npx tsx scripts/color-tool.ts --hex 7C3AED --darken 10
 *   npx tsx scripts/color-tool.ts --hex 7C3AED --gray
 *   npx tsx scripts/color-tool.ts --hex 1F2937 --hex F9FAFB --contrast
 *
 * Options:
 *   --hex <color>       Base color; may appear twice for --contrast.
 *                       Accepts 7C3AED / #7C3AED / 7C3 / FFF
 *   --lighten <0-100>   Lighten by N HSL lightness points
 *   --darken  <0-100>   Darken by N HSL lightness points
 *   --gray              Desaturate (HSL saturation → 0, lightness kept)
 *   --contrast          Compute WCAG contrast ratio against the second --hex
 *   --json              Structured JSON output (for --contrast)
 *
 * Multiple color ops (--lighten/--darken/--gray) apply in order.
 * Output hex is 6-digit, uppercase, no "#" — the format pptxgenjs expects.
 * Derivation mode prints ONLY the resulting hex; --json only affects
 * --contrast mode (ratio + WCAG pass flags).
 */

import Color from "color";

type ColorInstance = InstanceType<typeof Color>;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

type ColorOp =
  | { type: "lighten"; value: number }
  | { type: "darken"; value: number }
  | { type: "gray" };

function parseHex(input: string): ColorInstance {
  let s = input.trim().replace(/^#/, "");
  if (s.length === 3)
    s = s
      .split("")
      .map((c) => c + c)
      .join("");
  if (!/^[0-9a-fA-F]{6}$/.test(s)) {
    console.error(`  ✗  Invalid hex color: "${input}"`);
    console.error("     Expected forms: 7C3AED, #7C3AED, 7C3");
    process.exit(1);
  }
  return new Color("#" + s);
}

function toHex(c: ColorInstance): string {
  return c.hex().slice(1).toUpperCase();
}

function applyOps(color: ColorInstance, ops: ColorOp[]): ColorInstance {
  let c = color;
  for (const op of ops) {
    if (op.type === "lighten" || op.type === "darken") {
      const hsl = c.hsl().object();
      const delta = op.type === "lighten" ? op.value : -op.value;
      c = new Color({ ...hsl, l: Math.max(0, Math.min(100, hsl.l + delta)) });
    } else if (op.type === "gray") {
      const hsl = c.hsl().object();
      c = new Color({ ...hsl, s: 0 });
    }
  }
  return c;
}

/* ------------------------------------------------------------------ */
/*  CLI                                                                */
/* ------------------------------------------------------------------ */

interface Opts {
  hexes: string[];
  ops: ColorOp[];
  contrast: boolean;
  json: boolean;
}

function printUsage() {
  console.error("Usage:");
  console.error("  npx tsx scripts/color-tool.ts --hex 7C3AED --lighten 15");
  console.error("  npx tsx scripts/color-tool.ts --hex 7C3AED --darken 10");
  console.error("  npx tsx scripts/color-tool.ts --hex 7C3AED --gray");
  console.error("  npx tsx scripts/color-tool.ts --hex 7C3AED --hex 1F2937 --contrast");
  console.error("");
  console.error("Options:");
  console.error("  --hex <color>       Base color (repeat for --contrast)");
  console.error("  --lighten <0-100>   Lighten by N HSL lightness points");
  console.error("  --darken  <0-100>   Darken by N HSL lightness points");
  console.error("  --gray              Desaturate (HSL saturation → 0)");
  console.error("  --contrast          WCAG contrast ratio vs 2nd --hex");
  console.error("  --json              JSON output");
}

function parseArgs(): Opts {
  const args = process.argv.slice(2);
  const hexes: string[] = [];
  const ops: ColorOp[] = [];
  let contrast = false;
  let json = false;

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    const next = () => args[++i];
    if (a === "--hex") {
      hexes.push(next());
    } else if (a === "--lighten") {
      ops.push({ type: "lighten", value: parseFloat(next()) });
    } else if (a === "--darken") {
      ops.push({ type: "darken", value: parseFloat(next()) });
    } else if (a === "--gray") {
      ops.push({ type: "gray" });
    } else if (a === "--contrast") {
      contrast = true;
    } else if (a === "--json") {
      json = true;
    } else if (a.startsWith("-")) {
      console.error(`Unknown flag: ${a}`);
      process.exit(1);
    } else {
      console.error(`Unexpected argument: ${a}`);
      process.exit(1);
    }
  }

  if (hexes.length === 0) {
    printUsage();
    process.exit(1);
  }
  if (contrast && hexes.length < 2) {
    console.error("  ✗  --contrast requires two --hex arguments");
    process.exit(1);
  }

  return { hexes, ops, contrast, json };
}

function main() {
  const opts = parseArgs();
  const base = parseHex(opts.hexes[0]);

  // Contrast mode
  if (opts.contrast) {
    const other = parseHex(opts.hexes[1]);
    const ratio = base.contrast(other);
    if (opts.json) {
      process.stdout.write(
        JSON.stringify(
          {
            colorA: toHex(base),
            colorB: toHex(other),
            contrast: Number(ratio.toFixed(2)),
            passesAA: ratio >= 4.5, // normal text
            passesAALarge: ratio >= 3, // large text (>=18pt or >=14pt bold)
          },
          null,
          2,
        ) + "\n",
      );
    } else {
      console.log("  ── Contrast ──");
      console.log(`  Color A:     ${toHex(base)}`);
      console.log(`  Color B:     ${toHex(other)}`);
      console.log(`  Ratio:       ${ratio.toFixed(2)}:1`);
      console.log(
        `  AA (4.5:1):  ${ratio >= 4.5 ? "PASS" : "FAIL"}  Large text (3:1): ${ratio >= 3 ? "PASS" : "FAIL"}`,
      );
    }
    return;
  }

  // Derivation mode — print only the resulting hex
  const hex = toHex(applyOps(base, opts.ops));

  process.stdout.write(hex + "\n");
}

main();
