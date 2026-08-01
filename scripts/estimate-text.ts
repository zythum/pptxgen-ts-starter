#!/usr/bin/env tsx
/**
 * estimate-text.ts
 *
 * Measure exact rendered height of text at a given width, font, and
 * line-spacing.  Uses the `@napi-rs/canvas` package for real font
 * metrics — no guessing.
 *
 * Core rules for pptxgenjs:
 *   content height (in) = lineCount × lineSpacing / 72
 *   total height (in)   = content height + top margin + bottom margin
 * `--json` reports the total as `layout.height`; it includes both vertical margins.
 * Canvas 2D measureText determines the wrapped line count used by these formulas.
 *
 * Usage:
 *   npx tsx scripts/estimate-text.ts [options] "<text>"
 *   cat text.txt | npx tsx scripts/estimate-text.ts --stdin [options]
 *
 * Options (text measurement):
 *   --width, -w     Container width in inches          (default: 7.0)
 *   --font,  -f     CSS font string                     (default: "18pt Arial")
 *   --leading, -l   lineSpacing in pt                   (default: fontSize × 1.35)
 *   --margin        Container margin on all sides (in) (default: 0)
 *   --stdin         Read text from stdin
 *   --json          Output raw JSON instead of human-readable description
 *
 * Font helpers:
 *   --download-font, -d  <family>  Download font from Google Fonts
 *   --font-file           <path>   Register a local .ttf/.otf/.woff2 file
 *
 * Examples:
 *   npx tsx scripts/estimate-text.ts -w 3.5 -f "11pt Arial" --leading 22 "Long text…"
 *   cat arch.txt | npx tsx scripts/estimate-text.ts --stdin -w 5 -f "14pt Inter"
 *   npx tsx scripts/estimate-text.ts -d Inter -w 5 -f "14pt Inter" "Hello World"
 */

import { createCanvas, GlobalFonts, type SKRSContext2D } from "@napi-rs/canvas";
import * as readline from "node:readline";
import * as fs from "node:fs";
import * as path from "node:path";
import * as https from "node:https";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const DPI = 96;
const PT_TO_PX = 4 / 3; // 1pt = 1.333px at 96dpi

/** Convert CSS pt sizes to px explicitly; @napi fallback fonts otherwise use inconsistent units. */
function normalizeCanvasFont(fontCss: string): string {
  return fontCss.replace(/([\d.]+)\s*pt\b/gi, (_, value: string) => {
    return `${parseFloat(value) * PT_TO_PX}px`;
  });
}

function fontWithFamily(fontCss: string, family: string): string {
  const normalized = normalizeCanvasFont(fontCss);
  const size = /[\d.]+\s*px\b/i.exec(normalized);
  if (!size || size.index === undefined) return `${normalized} "${family}"`;
  return `${normalized.slice(0, size.index + size[0].length)} "${family}"`;
}

/** Create a context with the given font string. */
function createCtx(fontCss: string): SKRSContext2D {
  const ctx = createCanvas(1, 1).getContext("2d");
  ctx.font = normalizeCanvasFont(fontCss);
  return ctx;
}

const widthMeasureCache = new WeakMap<
  SKRSContext2D,
  {
    cjkCtx: SKRSContext2D | null;
    emojiCtx: SKRSContext2D | null;
    emWidthPx: number;
  }
>();
const widthGraphemeSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
const eastAsianWidthPattern =
  /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\u3000-\u303f\uff01-\uff60\uffe0-\uffe6]/u;
const emojiWidthPattern = /\p{Extended_Pictographic}/u;

function firstAvailableFont(candidates: string[]): string | null {
  return candidates.find((family) => isFontAvailable(family)) ?? null;
}

function createFallbackCtx(baseFont: string, family: string | null): SKRSContext2D | null {
  return family ? createCtx(fontWithFamily(baseFont, family)) : null;
}

function getWidthMeasureState(ctx: SKRSContext2D) {
  const cached = widthMeasureCache.get(ctx);
  if (cached) return cached;

  const emWidthPx = parseFontSizePt(ctx.font) * PT_TO_PX;
  const primaryCjkWidth = ctx.measureText("汉").width;
  const primarySupportsCjk = primaryCjkWidth >= emWidthPx * 0.95;
  const cjkFamily = primarySupportsCjk
    ? null
    : firstAvailableFont([
        "Arial Unicode MS",
        "Hiragino Sans",
        "Songti SC",
        "Microsoft YaHei",
        "Yu Gothic",
        "Malgun Gothic",
        "Noto Sans CJK SC",
        "Noto Sans SC",
        "WenQuanYi Zen Hei",
      ]);
  const emojiFamily = firstAvailableFont([
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Noto Color Emoji",
    "Twemoji Mozilla",
  ]);
  const state = {
    cjkCtx: primarySupportsCjk ? ctx : createFallbackCtx(ctx.font, cjkFamily),
    emojiCtx: createFallbackCtx(ctx.font, emojiFamily),
    emWidthPx,
  };
  widthMeasureCache.set(ctx, state);
  return state;
}

function measureWidth(ctx: SKRSContext2D, text: string): number {
  const state = getWidthMeasureState(ctx);
  let width = 0;
  let run = "";
  let runKind: "primary" | "cjk" | "emoji" | null = null;

  const flush = () => {
    if (run === "" || runKind === null) return;
    if (runKind === "cjk") {
      width += state.cjkCtx
        ? state.cjkCtx.measureText(run).width
        : [...widthGraphemeSegmenter.segment(run)].length * state.emWidthPx;
    } else if (runKind === "emoji") {
      width += state.emojiCtx
        ? state.emojiCtx.measureText(run).width
        : [...widthGraphemeSegmenter.segment(run)].length * state.emWidthPx;
    } else {
      width += ctx.measureText(run).width;
    }
    run = "";
  };

  for (const { segment } of widthGraphemeSegmenter.segment(text)) {
    const kind = emojiWidthPattern.test(segment)
      ? "emoji"
      : eastAsianWidthPattern.test(segment)
        ? "cjk"
        : "primary";
    if (runKind !== null && kind !== runKind) flush();
    runKind = kind;
    run += segment;
  }
  flush();
  return width;
}

/**
 * Check if a font family is available on the system (or already registered).
 */
function isFontAvailable(family: string): boolean {
  return GlobalFonts.families.some((f) => f.family.toLowerCase() === family.toLowerCase());
}

/**
 * Parse font size in pt from a CSS font string.
 * Supports "11pt Arial", "18px Arial", "24px Inter, sans-serif" etc.
 */
function parseFontSizePt(fontCss: string): number {
  const m = fontCss.match(/([\d.]+)\s*(pt|px)/);
  if (!m) return 18; // default
  const v = parseFloat(m[1]);
  if (m[2] === "px") return v / PT_TO_PX; // px → pt
  return v;
}

/* ------------------------------------------------------------------ */
/*  Word-wrap layout                                                   */
/* ------------------------------------------------------------------ */

interface LayoutResult {
  /** Text of each wrapped line */
  lines: string[];
  /** Number of lines */
  lineCount: number;
  /** Per-line width usage for diagnostics */
  lineWidthsPx: number[];
}

function wordWrap(text: string, ctx: SKRSContext2D, containerWidthPx: number): LayoutResult {
  const lines: string[] = [];
  const lineWidthsPx: number[] = [];
  const wordSegmenter = new Intl.Segmenter(undefined, { granularity: "word" });
  const graphemeSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  const cjkPattern = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
  const noLineStart = new Set([
    "、",
    "。",
    "，",
    "．",
    "・",
    "！",
    "？",
    "：",
    "；",
    "…",
    "‥",
    "）",
    "〕",
    "］",
    "｝",
    "〉",
    "》",
    "」",
    "』",
    "】",
    "〙",
    "〗",
    "〟",
    "’",
    "”",
    ",",
    ".",
    "!",
    "?",
    ":",
    ";",
    ")",
    "]",
    "}",
    "ぁ",
    "ぃ",
    "ぅ",
    "ぇ",
    "ぉ",
    "っ",
    "ゃ",
    "ゅ",
    "ょ",
    "ゎ",
    "ァ",
    "ィ",
    "ゥ",
    "ェ",
    "ォ",
    "ッ",
    "ャ",
    "ュ",
    "ョ",
    "ヮ",
    "ヵ",
    "ヶ",
    "ー",
    "々",
    "ゝ",
    "ゞ",
    "ヽ",
    "ヾ",
  ]);
  const noLineEnd = new Set([
    "（",
    "〔",
    "［",
    "｛",
    "〈",
    "《",
    "「",
    "『",
    "【",
    "〘",
    "〖",
    "〝",
    "‘",
    "“",
    "(",
    "[",
    "{",
  ]);

  const pushLine = (line: string) => {
    lines.push(line);
    lineWidthsPx.push(measureWidth(ctx, line));
  };

  const tokenize = (paragraph: string) => {
    const tokens: string[] = [];

    for (const { segment } of wordSegmenter.segment(paragraph)) {
      if (/^\s+$/u.test(segment)) {
        // Match the previous behavior: keep inter-word spaces with the token
        // before them, while dropping leading whitespace.
        if (tokens.length > 0) tokens[tokens.length - 1] += segment;
        continue;
      }

      if (!cjkPattern.test(segment)) {
        // Keep Latin words, numbers, emoji, and punctuation atomic unless the
        // whole token is itself wider than the container.
        tokens.push(segment);
        continue;
      }

      // CJK permits breaks between most characters. If Intl.Segmenter returns
      // a mixed-script segment, buffer adjacent non-CJK graphemes so embedded
      // Latin words are not split merely because they touch CJK text.
      let nonCjkBuffer = "";
      for (const { segment: grapheme } of graphemeSegmenter.segment(segment)) {
        if (cjkPattern.test(grapheme)) {
          if (nonCjkBuffer !== "") {
            tokens.push(nonCjkBuffer);
            nonCjkBuffer = "";
          }
          tokens.push(grapheme);
        } else {
          nonCjkBuffer += grapheme;
        }
      }
      if (nonCjkBuffer !== "") tokens.push(nonCjkBuffer);
    }

    return tokens;
  };

  const applyKinsoku = (tokens: string[]) => {
    const glued: string[] = [];
    let pendingPrefix = "";

    for (const originalToken of tokens) {
      const token = pendingPrefix + originalToken;
      pendingPrefix = "";
      const graphemes = [...graphemeSegmenter.segment(token)].map(({ segment }) => segment);
      const trimmedEndGraphemes = [...graphemeSegmenter.segment(token.trimEnd())].map(
        ({ segment }) => segment,
      );
      const first = graphemes[0];
      const last = trimmedEndGraphemes.at(-1);

      // Opening punctuation must travel with the following token so it cannot
      // be left at the end of a line.
      if (last && noLineEnd.has(last)) {
        pendingPrefix = token;
        continue;
      }

      // Closing punctuation and Japanese small kana must travel with the
      // preceding token so they cannot begin a new line.
      if (first && noLineStart.has(first) && glued.length > 0) {
        glued[glued.length - 1] += token;
        continue;
      }

      glued.push(token);
    }

    // Malformed input that ends with opening punctuation has no following
    // token; attach it backward rather than emitting a punctuation-only token.
    if (pendingPrefix !== "") {
      if (glued.length > 0) glued[glued.length - 1] += pendingPrefix;
      else glued.push(pendingPrefix);
    }

    return glued;
  };

  for (const para of text.split("\n")) {
    if (para.length === 0) {
      pushLine("");
      continue;
    }

    const tokens = applyKinsoku(tokenize(para));

    let line = "";
    for (const token of tokens) {
      const candidate = line + token;
      if (measureWidth(ctx, candidate) <= containerWidthPx) {
        line = candidate;
        continue;
      }

      if (line !== "") {
        pushLine(line);
        line = "";
      }

      if (measureWidth(ctx, token) <= containerWidthPx) {
        line = token;
        continue;
      }

      // Emergency fallback for a token that cannot fit on an empty line, such
      // as a long URL. Split only at Unicode grapheme boundaries so combined
      // emoji and accents remain intact. Extremely narrow containers may force
      // this fallback to override kinsoku glue.
      for (const { segment } of graphemeSegmenter.segment(token)) {
        const hardWrapCandidate = line + segment;
        if (line !== "" && measureWidth(ctx, hardWrapCandidate) > containerWidthPx) {
          pushLine(line);
          line = /^\s+$/u.test(segment) ? "" : segment;
        } else {
          line = hardWrapCandidate;
        }
      }
    }
    if (line) pushLine(line);
  }

  return { lines, lineCount: lines.length, lineWidthsPx };
}

/* ------------------------------------------------------------------ */
/*  Output                                                             */
/* ------------------------------------------------------------------ */

/**
 * Extract the font-family name from a CSS font string.
 * e.g. "11pt Arial, sans-serif" → "Arial"
 */
function parseFontFamily(fontCss: string): string {
  // Remove leading size/weight/style, split by comma, take first
  const afterLeading = fontCss.replace(/^[\d./\w-]+\s+/, "");
  return afterLeading.split(",")[0].trim();
}

function printDescription(
  fontCss: string,
  widthIn: number,
  leadingPt: number,
  marginIn: number,
  result: LayoutResult,
) {
  const totalHeightIn = (result.lineCount * leadingPt) / 72 + marginIn * 2;
  const family = parseFontFamily(fontCss);
  const fontSizePt = parseFontSizePt(fontCss);

  const lines: string[] = [];
  for (let i = 0; i < result.lines.length; i++) {
    const w = (result.lineWidthsPx[i] / DPI).toFixed(2);
    lines.push(`  Line ${i + 1}: "${result.lines[i].trim()}" (${w}in)`);
  }

  const output = [
    `Font:         ${family} ${fontSizePt}pt`,
    `Container:    ${widthIn.toFixed(1)}in wide${marginIn > 0 ? `, ${marginIn.toFixed(2)}in margin each side` : ""}`,
    `Leading:      ${leadingPt}pt`,
    `Line count:   ${result.lineCount}`,
    `Total height: ${totalHeightIn.toFixed(2)}in  ← use this for <Text h={...}>`,
    `Lines:`,
    ...lines,
  ].join("\n");

  process.stdout.write(output + "\n");
}

function printJson(
  fontCss: string,
  widthIn: number,
  leadingPt: number,
  marginIn: number,
  result: LayoutResult,
) {
  // Preserve the public JSON shape: layout.height is the total box height,
  // including top and bottom margins.
  const totalHeightIn = (result.lineCount * leadingPt) / 72 + marginIn * 2;

  const lines = result.lines.map((text, i) => ({
    index: i,
    text,
    width: `${(result.lineWidthsPx[i] / DPI).toFixed(2)}in`,
  }));

  const output = {
    font: fontCss,
    fontFamily: parseFontFamily(fontCss),
    fontSize: `${parseFontSizePt(fontCss)}pt`,
    layout: {
      width: `${widthIn.toFixed(1)}in`,
      height: `${totalHeightIn.toFixed(2)}in`,
      margin: `${marginIn.toFixed(2)}in`,
    },
    leading: `${leadingPt}pt`,
    lineCount: result.lineCount,
    lines,
  };

  process.stdout.write(JSON.stringify(output, null, 2) + "\n");
}

/* ------------------------------------------------------------------ */
/*  Google Fonts download                                              */
/* ------------------------------------------------------------------ */

const FONTS_DIR = path.resolve(ROOT, ".fonts");
const CACHE_FILE = path.join(FONTS_DIR, ".cache.json");

/** Google Fonts CSS API URL — no API key needed */
function googleFontsCssUrl(family: string): string {
  return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}`;
}

interface FontCache {
  [family: string]: { file: string; weight: string; style: string };
}

function readCache(): FontCache {
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function writeCache(cache: FontCache) {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

/** HTTP(S) GET returning body as string. */
function httpGet(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "pptxgen-ts-starter" } }, (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const body = Buffer.concat(chunks).toString("utf-8");
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 200)}`));
          } else {
            resolve(body);
          }
        });
      })
      .on("error", reject);
  });
}

/** Download a binary URL to a local file, return the file path. */
async function httpDownload(url: string, dest: string): Promise<void> {
  await fs.promises.mkdir(path.dirname(dest), { recursive: true });
  await new Promise<void>((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, { headers: { "User-Agent": "pptxgen-ts-starter" } }, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} downloading font`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (e) => {
        file.close();
        reject(e);
      });
  });
}

/**
 * Download a font family from Google Fonts.
 * Returns the local path to the downloaded font file.
 * Caches: once downloaded, reuses the cached file.
 */
async function downloadFont(family: string): Promise<string> {
  const cache = readCache();
  const cached = cache[family];
  if (cached) {
    const p = path.join(FONTS_DIR, cached.file);
    if (fs.existsSync(p)) {
      return p;
    }
  }

  const cssText = await httpGet(googleFontsCssUrl(family));
  if (!cssText.includes("font-family")) {
    throw new Error(`Font "${family}" not found on Google Fonts`);
  }

  // Parse src: url(...) from @font-face
  const urlMatch = cssText.match(/src:\s*url\(([^)]+)\)/);
  if (!urlMatch) {
    throw new Error(`Cannot find font URL in Google Fonts response for "${family}"`);
  }
  const fontUrl = urlMatch[1];

  // Determine file extension from URL
  const extMatch = fontUrl.match(/\.(\w+)(?:[?#]|$)/);
  const ext = extMatch?.[1] ?? "woff2";

  const fileName = `${family.replace(/\s+/g, "-")}.${ext}`;
  const filePath = path.join(FONTS_DIR, fileName);

  await httpDownload(fontUrl, filePath);

  cache[family] = { file: fileName, weight: "400", style: "normal" };
  writeCache(cache);

  return filePath;
}

/* ------------------------------------------------------------------ */
/*  CLI                                                                */
/* ------------------------------------------------------------------ */

interface Opts {
  text?: string;
  widthIn: number;
  fontCss: string;
  leadingPt: number | undefined;
  marginIn: number;
  stdin: boolean;
  json: boolean;
  downloadFont?: string;
  fontFiles: string[];
}

function parseArgs(): Opts {
  const args = process.argv.slice(2);
  const kv: Record<string, string> = {};
  const positional: string[] = [];
  let stdin = false;
  const fontFiles: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--width" || a === "-w") {
      kv.width = args[++i];
    } else if (a === "--font" || a === "-f") {
      kv.font = args[++i];
    } else if (a === "--leading" || a === "-l") {
      kv.leading = args[++i];
    } else if (a === "--margin") {
      kv.margin = args[++i];
    } else if (a === "--stdin") {
      stdin = true;
    } else if (a === "--json") {
      kv.json = "true";
    } else if (a === "--download-font" || a === "-d") {
      kv.downloadFont = args[++i];
    } else if (a === "--font-file") {
      fontFiles.push(args[++i]);
    } else if (a.startsWith("-")) {
      console.error(`Unknown flag: ${a}`);
      process.exit(1);
    } else {
      positional.push(a);
    }
  }

  if (!stdin && positional.length === 0 && !kv.downloadFont) {
    console.error("Usage:");
    console.error('  estimate-text.ts [options] "<text>"');
    console.error('  echo "..." | estimate-text.ts --stdin [options]');
    console.error('  estimate-text.ts --download-font Inter [options] "<text>"');
    process.exit(1);
  }

  const fontCss = kv.font ?? "18pt Arial";

  return {
    text: stdin ? undefined : positional.join(" "),
    widthIn: parseFloat(kv.width ?? "7.0"),
    fontCss,
    leadingPt: kv.leading !== undefined ? parseFloat(kv.leading) : undefined,
    marginIn: parseFloat(kv.margin ?? "0"),
    stdin,
    json: kv.json === "true",
    downloadFont: kv.downloadFont,
    fontFiles,
  };
}

async function getStdinText(): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin });
  const parts: string[] = [];
  for await (const line of rl) parts.push(line);
  return parts.join("\n");
}

async function main() {
  const opts = parseArgs();

  // Register custom font files
  for (const fp of opts.fontFiles) {
    const abs = path.resolve(fp);
    const family = path.basename(abs, path.extname(abs));
    GlobalFonts.registerFromPath(abs, family);
  }

  // Download font from Google Fonts if requested
  if (opts.downloadFont) {
    const fontPath = await downloadFont(opts.downloadFont);
    GlobalFonts.registerFromPath(fontPath, opts.downloadFont);
  }

  // Auto-download font from --font if it looks like a web font and isn't on system
  const fontFamilyName = opts.fontCss
    .replace(/^[\d.]+(?:pt|px)\s+/, "")
    .split(",")[0]
    .trim();
  if (!opts.downloadFont && !isFontAvailable(fontFamilyName)) {
    try {
      const fontPath = await downloadFont(fontFamilyName);
      GlobalFonts.registerFromPath(fontPath, fontFamilyName);
    } catch {
      // silent fallback: use system font
    }
  }

  const marginPx = opts.marginIn * DPI;
  const containerWidthPx = opts.widthIn * DPI - marginPx * 2;

  if (containerWidthPx <= 0) {
    console.error("Error: container too narrow (width - 2×margin <= 0)");
    process.exit(1);
  }

  // Auto-calc default leading: fontSize × 1.35 (typical PowerPoint default)
  const fontSizePt = parseFontSizePt(opts.fontCss);
  const leadingPt = opts.leadingPt ?? Math.round(fontSizePt * 1.35);

  const text = opts.stdin ? await getStdinText() : opts.text!;
  const ctx = createCtx(opts.fontCss);
  const result = wordWrap(text, ctx, containerWidthPx);

  if (opts.json) {
    printJson(opts.fontCss, opts.widthIn, leadingPt, opts.marginIn, result);
  } else {
    printDescription(opts.fontCss, opts.widthIn, leadingPt, opts.marginIn, result);
  }
}

main();
