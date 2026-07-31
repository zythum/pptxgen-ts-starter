# pptxgen-ts-starter — Agent Guide

> Build `.pptx` presentations with JSX + TypeScript + pptxgenjs. Slides are JSX components compiled into PowerPoint files.

## Tech Stack

| Layer            | Technology                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------- |
| JSX Components   | `@zythum02/pptxgenjsx` — `<Slide>`, `<Text>`, `<Rect>`, `<Chart>`, `<Table>`, `<Image>`, etc. |
| Rendering Engine | `pptxgenjs` ^4.0.1                                                                            |
| Dev Server       | Vanilla Node HTTP via `tsx` — **no file watching, refresh browser manually**                  |
| PPTX Viewer      | `@silurus/ooxml` (browser)                                                                    |
| TS Config        | `jsx: "react-jsx"`, `jsxImportSource: "@zythum02/pptxgenjsx"`                                 |

## Project Structure

```
src/
├── ppt.tsx                  # Entry — default export, composes all slides in <Deck>
├── slides/                  # One file per slide, numbered: 01-title.tsx, 02-*.tsx …
├── components/              # Shared UI: SlideBackground, SectionHeader, Card
├── token/
│   ├── colors.ts            # Color tokens — single source of truth for slide colors
│   └── typography.ts        # Font & size tokens — single source of truth for slide typography
└── media/images/            # Image assets — paths relative to src/ppt.tsx
scripts/
├── color-tool.ts            # Derive palette variants + check WCAG contrast
├── dev-server.ts            # Dev server — do not modify
├── estimate-text.ts         # Measure rendered text height (prevent overflow)
├── generate.ts              # .pptx builder — do not modify
└── image-tool.ts            # Query image metadata, crop, resize
web/index.html               # Browser PPTX viewer
.agents/skills/pptxgenjsx/   # Component API reference (loaded on demand)
.agents/skills/design/       # Design guidance: workflow + templates & themes
.deck/                       # Per-deck workspace: brief.md / research.md / outline.md / spec.md
output/                      # Generated .pptx files
```

## Conventions

### Slides

- **Default async exports (anonymous)** — `export default async function ()`. Components are regular functions (`export function Card()`). **Never annotate return types.**
- **Numbered files** — `01-title.tsx`, `02-overview.tsx`, ordered by presentation flow.
- **Full-size background first** — every slide's first child is `<SlideBackground />`.
- **Composed in `src/ppt.tsx`** — import all slides, arrange inside `<Deck>`.

### Components

- Extract into `components/` when a pattern appears in **3+ slides**.
- Expose only what varies — `<SlideBackground color="dark" />` takes zero position props; `<Card>` takes all four (`x, y, w, h`).
- Keep positioning visible in the slide file, not hidden behind a component abstraction.

### Positioning & Canvas

- **Absolute inches** — every element needs `x`, `y`, `w`, `h`. No flexbox, no grid.
- Canvas size — `<Deck layout={...}>` accepts a built-in enum (e.g. `"LAYOUT_WIDE"`) or a custom `{ width, height }` object. For enums, look up dimensions in `.agents/skills/pptxgenjsx/references/deck.md` (built-in layout table).

### Colors

- Hex **without `#`** — `"7C3AED"` not `"#7C3AED"`.
- Transparency: `fill: { color: "18181B", transparency: 50 }` (0–100).
- **Single source of truth** — all colors used in slides must come from
  `src/token/colors.ts` (`colors.background`, `colors.primary`, …). Never
  hardcode bare hex in slide files. Fill the token file from a chosen palette
  (see `.agents/skills/design/templates-themes/palettes.md`) when starting a
  deck; derive new variants with `scripts/color-tool.ts`, then register them
  in `colors.ts` under a semantic name.

### Typography

- **Single source of truth** — `fontFace` / `fontSize` come from
  `src/token/typography.ts` (`typography.font.*`, `typography.size.*`) — no
  magic numbers in slides.
- `bold: true/false` is written directly — pptxgenjs has no numeric
  `fontWeight`.
- New sizes: update `.deck/spec.md` §4 first, then propagate to `typography.ts`.
- Per-slide exceptions (measured with `estimate-text.ts`) may use literal
  values, with a comment explaining why.

### Shapes

| Component     | Use when                                                            |
| ------------- | ------------------------------------------------------------------- |
| `<Rect>`      | Plain rectangle — backgrounds, accent bars, dividers                |
| `<RoundRect>` | **Visible** rounded corners — cards, badges. Never `rectRadius={0}` |
| `<Ellipse>`   | Circles and ellipses                                                |

### Code Style

- **No return type annotations** — let TypeScript infer from JSX.
- `src/ppt.tsx` must be a **default export** (`export default function ()`).
- **No HTML elements** — `<div>`, `<span>`, `<p>` are not in `JSX.IntrinsicElements`. Only imported components are valid.
- **Don't modify** `scripts/*` `web/*` — infrastructure, not content.

## Workflow: Add or Edit a Slide

1. Create `src/slides/NN-name.tsx` — async function returning the slide content in `<>`, with `<SlideBackground>` as the first child.
2. Compose content using `<Text>`, `<TextRun>`, `<Rect>`, `<Chart>`, `<Table>`, etc. (see [pptxgenjsx](.agents/skills/pptxgenjsx/SKILL.md) for component API).
3. **Verify layout** — use `estimate-text.ts` and `image-tool.ts` to prevent text overflow, element overlap, and image distortion (see [Layout Quality Check](#layout-quality-check) below).
4. Import the slide in `src/ppt.tsx` — use `component: () => import("../slides/NN-name")` and add it inside `<Deck>`.
5. `npm run dev` → **refresh browser** to preview, or `npm run generate` for `.pptx`.

### Slide Template

```tsx
import { Slide, Text, TextRun, Notes } from "@zythum02/pptxgenjsx";
import { SlideBackground } from "../components/SlideBackground";
import { SectionHeader } from "../components/SectionHeader";
import { colors } from "../token/colors";
import { typography } from "../token/typography";

export default async function () {
  return (
    <Slide>
      <SlideBackground color="light" />
      <SectionHeader title="My Section" />

      <Text x={0.8} y={2.0} w={6} h={0.8} align="left" valign="middle">
        <TextRun
          text="Content goes here"
          options={{ fontSize: typography.size.body, color: colors.ink }}
        />
      </Text>

      <Notes>Speaker notes.</Notes>
    </Slide>
  );
}
```

## Layout Quality Check

Before committing a slide, verify content fits properly to avoid runtime surprises.

### Text overflow

When text content has variable length (data-driven, speaker names, long titles), **always** measure rendered height before picking container `h`.

```
npx tsx scripts/estimate-text.ts -w 6.5 -f "18pt Inter" --leading 26 \
  "Variable-length text that might overflow its box"
```

**Check against container** — if the reported height exceeds your `h`, widen the box, reduce font size, or add `shrinkText` to the `<Text>` component.

**Use `--json` for programmatic checks** — parse the output in scripts or CI.

### Element overlap

After placing all elements on a slide, verify their bounding boxes don't collide:

```
# Measure each text block
npx tsx scripts/estimate-text.ts -w 4 -f "14pt Arial" --json "Title text"
npx tsx scripts/estimate-text.ts -w 4 -f "12pt Arial" --json "Body text"
```

Manually sum `y + height` for each element and confirm it's ≤ the next element's `y`. Common overlap points:

- `<SectionHeader>` fixed height vs. content below it
- Multi-column text layouts where columns share vertical space
- `<Image>` + caption `<Text>` stacked vertically

### Image stretching

For `<Image>` elements, always confirm the source image aspect ratio matches your container:

```
npx tsx scripts/image-tool.ts --image src/media/images/photo.png
```

Output shows native `width × height`. Compute aspect ratio (e.g. `1920/1080 = 1.778`) and compare to your `<Image w / h>` (e.g. `6.5/3.656 = 1.778`). If they don't match, use `--crop` or `--resize` to produce a correctly-sized asset:

```
# Crop photo to 16:9 then resize to fit 6.5" × 3.656" at 96 DPI
npx tsx scripts/image-tool.ts --image photo.png --crop 16:9 --resize 624x351 --output photo-ready.png
```

**Rule of thumb:** always crop/resize **before** referencing the image in a slide. Never rely on `pptxgenjs` to stretch an image into a mismatched container — PowerPoint handles non-native aspect ratios poorly.

## Common Mistakes

| ❌ Wrong                      | ✅ Correct                                                        |
| ----------------------------- | ----------------------------------------------------------------- |
| `color="#FFFFFF"`             | `color="FFFFFF"` (no `#`)                                         |
| `fontSize: 18` literal        | `fontSize: typography.size.body` (from `src/token/typography.ts`) |
| `<RoundRect rectRadius={0}>`  | `<Rect>`                                                          |
| `<div>`, `<span>`, `<p>`      | `<Text>` + `<TextRun>`                                            |
| Named export in `src/ppt.tsx` | `export default function ()`                                      |
| Missing full-size background  | `<SlideBackground />` as first child                              |
| `function Foo(): PptxNode`    | `async function Foo()` — no return type                           |
| Modifying `scripts/*.ts`      | Content belongs in `src/slides/` and `src/components/`            |
| Forgetting `breakLine: true`  | Set on the last `<TextRun>` of each line                          |

## Skills

- [pptxgenjsx](.agents/skills/pptxgenjsx/SKILL.md) — Component API reference. Use when authoring slide components.
- [design](.agents/skills/design/SKILL.md) — Design guidance: 7-stage workflow + templates & themes. Use when planning a deck, choosing styles/colors/typography, or running pre-delivery QA.

## CLI Tools

### `scripts/estimate-text.ts` — Text measurement

Measure exact rendered height of text at a given width, font, and line-spacing. Uses Canvas 2D `measureText` for precise word-wrap.

```
npx tsx scripts/estimate-text.ts -w 3.5 -f "11pt Arial" --leading 22 "Long text to measure…"
echo "..." | npx tsx scripts/estimate-text.ts --stdin -w 5 -f "14pt Inter"
```

**Options:** `--width/-w` (container width in inches), `--font/-f` (CSS font string), `--leading/-l` (line spacing in pt), `--margin` (container padding), `--json` (structured JSON output), `--download-font/-d` (download from Google Fonts), `--font-file` (register local .ttf/.otf/.woff2), `--stdin` (read from stdin).

**Output:** human-readable description by default; use `--json` for structured output.

### `scripts/image-tool.ts` — Image query & processing

Query image metadata, resize, or crop images. All operations use `sharp`.

```
npx tsx scripts/image-tool.ts --image photo.png          # query metadata only
npx tsx scripts/image-tool.ts --image photo.png --resize 800   # scale to 800px wide
npx tsx scripts/image-tool.ts --image photo.png --crop 16:9    # center crop to 16:9
npx tsx scripts/image-tool.ts --image photo.png --crop 1:1 --resize 400
```

**Options:** `--image <path>` (required), `--resize <w>` or `<w>x<h>`, `--crop <aspect>` (e.g. `16:9`, `1:1`) or `<w>x<h>` or `<w>x<h>+<x>+<y>`, `--output <path>`.

### `scripts/color-tool.ts` — Color derivation & contrast

Derive colors from a base hex (lighten / darken / desaturate) and check WCAG
contrast ratios. Never hand-compute hex math — the design skill forbids
inventing colors, and derived values must come from this tool. Color math is
delegated to the `color` npm package.

```
npx tsx scripts/color-tool.ts --hex 7C3AED --lighten 15   # lighter
npx tsx scripts/color-tool.ts --hex 7C3AED --darken 10    # darker
npx tsx scripts/color-tool.ts --hex 7C3AED --gray         # desaturated
npx tsx scripts/color-tool.ts --hex 1F2937 --hex F9FAFB --contrast  # WCAG ratio
```

**Options:** `--hex <color>` (accepts `7C3AED` / `#7C3AED` / `7C3`; repeat for
`--contrast`), `--lighten <0-100>`, `--darken <0-100>` (HSL lightness points),
`--gray` (desaturate), `--contrast`, `--json`.

**Output:** derivation mode prints ONLY the resulting hex, e.g.
`npx tsx scripts/color-tool.ts --hex 7C3AED --darken 10` → `5F14E0`
(6-digit uppercase, no `#` — the pptxgenjs format). `--contrast` prints the
ratio + WCAG AA pass flags; add `--json` for structured output
(`contrast`, `passesAA`, `passesAALarge`).

## NPM Scripts

| Command             | Action                                                          |
| ------------------- | --------------------------------------------------------------- |
| `npm run dev`       | Dev server at `localhost:5173` (refresh browser to see changes) |
| `npm run generate`  | Build `output/presentation.pptx`                                |
| `npm run typecheck` | Type check, no emit                                             |
| `npm run lint`      | Lint with oxlint                                                |
| `npm run format`    | Format with oxfmt                                               |
