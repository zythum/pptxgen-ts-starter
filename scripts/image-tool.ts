#!/usr/bin/env tsx
/**
 * image-tool.ts
 *
 * Image utilities for pptxgenjs slide development:
 *   - Query image dimensions and automatic color-distribution statistics
 *   - Resize images (maintain aspect ratio or exact dimensions)
 *   - Crop images (by aspect ratio, pixel dimensions, or exact rectangle)
 *
 * Uses the `sharp` package for all image operations.
 *
 * Usage:
 *   npx tsx scripts/image-tool.ts --image photo.png
 *   npx tsx scripts/image-tool.ts --image photo.png --resize 1200
 *   npx tsx scripts/image-tool.ts --image photo.png --resize 800x600
 *   npx tsx scripts/image-tool.ts --image photo.png --crop 16:9
 *   npx tsx scripts/image-tool.ts --image photo.png --crop 1:1 --resize 400
 *   npx tsx scripts/image-tool.ts --image photo.png --crop 800x600+100+50
 *
 * Options:
 *   --image  <path>    (Required) Path to the image file
 *   --resize <w>x<h>   Resize image to exact w×h px
 *   --resize <w>       Resize image to width w px (maintain aspect ratio)
 *   --crop   <aspect>  Crop by aspect ratio, e.g. 16:9, 4:3, 1:1 (centered)
 *   --crop   <w>x<h>   Crop to exact pixel dimensions (centered)
 *   --crop   <w>x<h>+<x>+<y>  Crop rectangle with offset from top-left
 *   --output <path>    Output path (otherwise auto-named)
 *
 * Examples:
 *   npx tsx scripts/image-tool.ts --image media/images/photo.png
 *   npx tsx scripts/image-tool.ts --image photo.png --resize 1200 --output thumb.png
 *   npx tsx scripts/image-tool.ts --image photo.png --crop 16:9 --resize 1920
 */

import sharp, { Metadata } from "sharp";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

type ImageMeta = Metadata;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function section(title: string) {
  console.log(`  ── ${title} ──`);
  console.log("");
}

function field(label: string, value: string) {
  console.log(`  ${label.padEnd(22)}${value}`);
}

function fmtAspect(w: number, h: number): string {
  const g = gcd(w, h);
  return `${w / g}:${h / g}`;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/* ------------------------------------------------------------------ */
/*  Image Info                                                         */
/* ------------------------------------------------------------------ */

function fileSizeKB(filePath: string): string {
  const bytes = fs.statSync(filePath).size;
  return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(0)} KB`;
}

function printImageInfo(filePath: string, meta: ImageMeta) {
  const w = meta.width!;
  const h = meta.height!;
  const aspect = fmtAspect(w, h);
  const ratio = w / h;
  const absPath = path.resolve(filePath);

  section("Image Info");
  field("File:", absPath);
  field("Dimensions:", `${w} × ${h} px`);
  field("Aspect:", `${aspect} (${ratio.toFixed(2)})`);
  field("Format:", `${meta.format}${meta.space ? ` (${meta.space})` : ""}`);
  field("Size:", fileSizeKB(filePath));
}

/* ------------------------------------------------------------------ */
/*  Color Analysis                                                     */
/* ------------------------------------------------------------------ */

const COLOR_SAMPLE_MAX_DIMENSION = 256;
const COLOR_BUCKET_SIZE = 32;
const COLOR_BUCKET_MASK = COLOR_BUCKET_SIZE - 1;
const PALETTE_SIZE = 5;

interface ColorBucket {
  weight: number;
  red: number;
  green: number;
  blue: number;
}

interface VisualDistribution {
  dark: number;
  mid: number;
  light: number;
  lowSaturation: number;
  mediumSaturation: number;
  highSaturation: number;
}

function formatHexChannel(value: number): string {
  return Math.round(value).toString(16).padStart(2, "0").toUpperCase();
}

function formatColor(red: number, green: number, blue: number): string {
  return `${formatHexChannel(red)}${formatHexChannel(green)}${formatHexChannel(blue)}`;
}

function formatPercent(value: number, total: number): string {
  return `${((value / total) * 100).toFixed(1)}%`;
}

function colorRole(index: number, coverage: number): string {
  if (index === 0) return "Dominant";
  return coverage >= 8 ? "Secondary" : "Accent";
}

function addVisualSample(
  distribution: VisualDistribution,
  red: number,
  green: number,
  blue: number,
  weight: number,
) {
  const brightness = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
  if (brightness < 1 / 3) distribution.dark += weight;
  else if (brightness < 2 / 3) distribution.mid += weight;
  else distribution.light += weight;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const saturation = max === 0 ? 0 : (max - min) / max;
  if (saturation < 0.2) distribution.lowSaturation += weight;
  else if (saturation < 0.65) distribution.mediumSaturation += weight;
  else distribution.highSaturation += weight;
}

/**
 * Print a sampled visual summary. The color histogram uses 32-value RGB
 * buckets and reports the average source color in each bucket, so the output
 * remains useful for photographic images without scanning every pixel.
 */
async function printColorAnalysis(filePath: string) {
  const { data, info } = await sharp(filePath)
    .toColourspace("srgb")
    .ensureAlpha()
    .resize({
      width: COLOR_SAMPLE_MAX_DIMENSION,
      height: COLOR_SAMPLE_MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
      kernel: sharp.kernel.nearest,
    })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const buckets = new Map<number, ColorBucket>();
  const distribution: VisualDistribution = {
    dark: 0,
    mid: 0,
    light: 0,
    lowSaturation: 0,
    mediumSaturation: 0,
    highSaturation: 0,
  };
  let visibleWeight = 0;

  for (let offset = 0; offset < data.length; offset += info.channels) {
    const red = data[offset];
    const green = data[offset + 1];
    const blue = data[offset + 2];
    const alpha = info.channels === 4 ? data[offset + 3] : 255;
    const weight = alpha / 255;
    if (weight === 0) continue;

    const bucketKey =
      ((red & ~COLOR_BUCKET_MASK) << 16) |
      ((green & ~COLOR_BUCKET_MASK) << 8) |
      (blue & ~COLOR_BUCKET_MASK);
    const bucket = buckets.get(bucketKey) ?? { weight: 0, red: 0, green: 0, blue: 0 };
    bucket.weight += weight;
    bucket.red += red * weight;
    bucket.green += green * weight;
    bucket.blue += blue * weight;
    buckets.set(bucketKey, bucket);

    visibleWeight += weight;
    addVisualSample(distribution, red, green, blue, weight);
  }

  section("Color Analysis");
  if (visibleWeight === 0) {
    field("Visible pixels:", "none (fully transparent image)");
    return;
  }

  const palette = [...buckets.values()].sort((a, b) => b.weight - a.weight).slice(0, PALETTE_SIZE);
  const [dominant] = palette;

  field("Sample:", `${info.width} × ${info.height} px`);
  field(
    "Dominant color:",
    formatColor(
      dominant.red / dominant.weight,
      dominant.green / dominant.weight,
      dominant.blue / dominant.weight,
    ),
  );
  console.log("  Color distribution:");
  for (const [index, bucket] of palette.entries()) {
    const coverage = (bucket.weight / visibleWeight) * 100;
    const color = formatColor(
      bucket.red / bucket.weight,
      bucket.green / bucket.weight,
      bucket.blue / bucket.weight,
    );
    console.log(`    ${colorRole(index, coverage).padEnd(10)}${color}  ${coverage.toFixed(1)}%`);
  }
  field(
    "Brightness:",
    `Dark ${formatPercent(distribution.dark, visibleWeight)} · Mid ${formatPercent(distribution.mid, visibleWeight)} · Light ${formatPercent(distribution.light, visibleWeight)}`,
  );
  field(
    "Saturation:",
    `Low ${formatPercent(distribution.lowSaturation, visibleWeight)} · Medium ${formatPercent(distribution.mediumSaturation, visibleWeight)} · High ${formatPercent(distribution.highSaturation, visibleWeight)}`,
  );
}

/* ------------------------------------------------------------------ */
/*  Resize                                                             */
/* ------------------------------------------------------------------ */

interface ResizeSpec {
  width?: number;
  height?: number;
}

function parseResizeSpec(spec: string): ResizeSpec {
  if (spec.includes("x")) {
    const [w, h] = spec.split("x").map(Number);
    return { width: w, height: h };
  }
  const n = Number(spec);
  return { width: n };
}

async function resizeImage(
  src: string,
  meta: ImageMeta,
  spec: string,
  output?: string,
): Promise<string> {
  const parsed = parseResizeSpec(spec);
  const w = meta.width!;
  const h = meta.height!;

  let targetW = parsed.width;
  let targetH = parsed.height;

  // If only one dimension provided, compute the other
  if (targetW && !targetH) {
    targetH = Math.round(targetW * (h / w));
  } else if (targetH && !targetW) {
    targetW = Math.round(targetH * (w / h));
  }

  if (!targetW || !targetH) {
    console.error("  ✗  Invalid resize spec: " + spec);
    process.exit(1);
  }

  // Determine output path
  const parsedPath = path.parse(src);
  const outPath = output
    ? path.resolve(ROOT, output)
    : path.join(parsedPath.dir, `${parsedPath.name}.${targetW}x${targetH}${parsedPath.ext}`);

  section("Resize");
  field("Operation:", `scale to ${targetW} × ${targetH} px`);
  field("Output:", path.resolve(outPath));

  await sharp(src).resize(targetW, targetH, { fit: "cover", position: "centre" }).toFile(outPath);

  return outPath;
}

/* ------------------------------------------------------------------ */
/*  Crop                                                               */
/* ------------------------------------------------------------------ */

interface CropSpec {
  width: number;
  height: number;
  left: number;
  top: number;
}

/**
 * Parse crop spec string. Supports three forms:
 *   "16:9"     → aspect ratio (auto-compute dimensions, center crop)
 *   "800x600"  → exact px dimensions (center crop)
 *   "800x600+100+50" → exact px rect with offset from top-left
 */
function parseCropSpec(spec: string, imgW: number, imgH: number): CropSpec {
  // Try dimension + offset form: 800x600+100+50
  const rectMatch = spec.match(/^(\d+)x(\d+)\+(\d+)\+(\d+)$/);
  if (rectMatch) {
    return {
      width: parseInt(rectMatch[1]),
      height: parseInt(rectMatch[2]),
      left: parseInt(rectMatch[3]),
      top: parseInt(rectMatch[4]),
    };
  }

  // Try dimension only form: 800x600
  const dimMatch = spec.match(/^(\d+)x(\d+)$/);
  if (dimMatch) {
    const w = parseInt(dimMatch[1]);
    const h = parseInt(dimMatch[2]);
    return {
      width: w,
      height: h,
      left: Math.max(0, Math.floor((imgW - w) / 2)),
      top: Math.max(0, Math.floor((imgH - h) / 2)),
    };
  }

  // Try aspect ratio form: 16:9
  const arMatch = spec.match(/^(\d+):(\d+)$/);
  if (arMatch) {
    const num = parseInt(arMatch[1]);
    const den = parseInt(arMatch[2]);
    const targetRatio = num / den;
    const imgRatio = imgW / imgH;

    // The crop rectangle must not exceed image bounds.
    // If target aspect is wider than source → crop height, keep full width.
    // If target aspect is taller than source → crop width, keep full height.
    let w: number, h: number;
    if (targetRatio > imgRatio) {
      // Target wider → keep full width, compute matching height
      w = imgW;
      h = Math.round(w / targetRatio);
    } else {
      // Target taller → keep full height, compute matching width
      h = imgH;
      w = Math.round(h * targetRatio);
    }

    return {
      width: w,
      height: h,
      left: Math.max(0, Math.floor((imgW - w) / 2)),
      top: Math.max(0, Math.floor((imgH - h) / 2)),
    };
  }

  console.error(`  ✗  Invalid crop spec: "${spec}"`);
  console.error("     Expected forms: 16:9, 800x600, 800x600+100+50");
  process.exit(1);
}

async function cropImage(
  src: string,
  spec: string,
  output?: string,
  resizeSpec?: string,
): Promise<string> {
  const meta = await sharp(src).metadata();
  const imgW = meta.width!;
  const imgH = meta.height!;
  const crop = parseCropSpec(spec, imgW, imgH);

  const parsedPath = path.parse(src);
  const cropLabel = `${crop.width}x${crop.height}`;
  const outPath = output
    ? path.resolve(ROOT, output)
    : path.join(parsedPath.dir, `${parsedPath.name}.crop-${cropLabel}${parsedPath.ext}`);

  let pipeline = sharp(src).extract({
    left: crop.left,
    top: crop.top,
    width: crop.width,
    height: crop.height,
  });

  if (resizeSpec) {
    const rp = parseResizeSpec(resizeSpec);
    const targetW = rp.width;
    const targetH = rp.height ?? Math.round(crop.height * (targetW! / crop.width));
    pipeline = pipeline.resize(targetW, targetH, { fit: "cover", position: "centre" });
  }

  await pipeline.toFile(outPath);

  const outMeta = await sharp(outPath).metadata();

  section("Crop" + (resizeSpec ? " + Resize" : ""));
  field("Region:", `${crop.width}x${crop.height}+${crop.left}+${crop.top}`);
  field("Crop spec:", spec);
  if (resizeSpec) field("Resize spec:", resizeSpec);
  field("Output:", path.resolve(outPath));
  field("Result:", `${outMeta.width} × ${outMeta.height} px, ${fileSizeKB(outPath)}`);

  return outPath;
}

/* ------------------------------------------------------------------ */
/*  CLI                                                                */
/* ------------------------------------------------------------------ */

interface Opts {
  image: string;
  resize?: string;
  crop?: string;
  output?: string;
}

function printUsage() {
  console.error("Usage:");
  console.error("  npx tsx scripts/image-tool.ts --image photo.png");
  console.error("  npx tsx scripts/image-tool.ts --image photo.png --resize 1200");
  console.error("  npx tsx scripts/image-tool.ts --image photo.png --crop 16:9 --resize 1920");
  console.error("");
  console.error("Options:");
  console.error("  --image  <path>    (Required) Path to the image file");
  console.error("  --resize <w>x<h>   Resize to exact dimensions");
  console.error("  --resize <w>       Resize to width w (maintain aspect)");
  console.error("  --crop   <aspect>  Crop by aspect ratio (16:9, 4:3, 1:1)");
  console.error("  --crop   <w>x<h>   Crop to exact pixel dims (centered)");
  console.error("  --crop   <w>x<h>+<x>+<y>  Crop rect with offset");
  console.error("  --output <path>    Output file path");
}

function parseArgs(): Opts {
  const args = process.argv.slice(2);
  const kv: Record<string, string> = {};

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--image") {
      kv.image = args[++i];
    } else if (a === "--resize") {
      kv.resize = args[++i];
    } else if (a === "--crop") {
      kv.crop = args[++i];
    } else if (a === "--output") {
      kv.output = args[++i];
    } else if (a.startsWith("-")) {
      console.error(`Unknown flag: ${a}`);
      process.exit(1);
    } else {
      console.error(`Unexpected argument: ${a}`);
      process.exit(1);
    }
  }

  if (!kv.image) {
    printUsage();
    process.exit(1);
  }

  return {
    image: kv.image,
    resize: kv.resize,
    crop: kv.crop,
    output: kv.output,
  };
}

async function main() {
  const opts = parseArgs();

  const imgPath = path.resolve(ROOT, opts.image);
  if (!fs.existsSync(imgPath)) {
    console.error(`  ✗  Image not found: ${imgPath}`);
    process.exit(1);
  }

  const meta = await sharp(imgPath).metadata();

  // Inspect the source image when no transform was requested.
  if (!opts.resize && !opts.crop) {
    printImageInfo(imgPath, meta);
    await printColorAnalysis(imgPath);
    return;
  }

  // Crop first, then optionally resize. Analyze the final output rather than
  // the source because either transformation can change color coverage.
  if (opts.crop) {
    const outPath = await cropImage(imgPath, opts.crop, opts.output, opts.resize);
    await printColorAnalysis(outPath);
    return;
  }

  // Resize only
  if (opts.resize) {
    const outPath = await resizeImage(imgPath, meta, opts.resize, opts.output);
    const outMeta = await sharp(outPath).metadata();
    field("Result:", `${outMeta.width} × ${outMeta.height} px, ${fileSizeKB(outPath)}`);
    await printColorAnalysis(outPath);
  }
}

main();
