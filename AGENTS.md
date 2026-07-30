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
└── media/images/            # Image assets — paths relative to src/ppt.tsx
scripts/
├── dev-server.ts            # Dev server — do not modify
└── generate.ts              # .pptx builder — do not modify
web/index.html               # Browser PPTX viewer
.agents/skills/pptxgenjsx/   # Component API reference (loaded on demand)
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
- Transparency: `fill: { color: "1E1E2E", transparency: 50 }` (0–100).

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
- **Don't modify** `scripts/*.ts` — infrastructure, not content.

## Workflow: Add or Edit a Slide

1. Create `src/slides/NN-name.tsx` — async function returning `<Slide>` with `<SlideBackground>`.
2. Compose content using `<Text>`, `<TextRun>`, `<Rect>`, `<Chart>`, `<Table>`, etc.
3. Import the slide in `src/ppt.tsx` and add it inside `<Deck>`.
4. `npm run dev` → **refresh browser** to preview, or `npm run generate` for `.pptx`.

### Slide Template

```tsx
import { Slide, Text, TextRun, Notes } from "@zythum02/pptxgenjsx";
import { SlideBackground } from "../components/SlideBackground";
import { SectionHeader } from "../components/SectionHeader";

export default async function () {
  return (
    <Slide>
      <SlideBackground color="light" />
      <SectionHeader title="My Section" />

      <Text x={0.8} y={2.0} w={6} h={0.8} align="left" valign="middle">
        <TextRun text="Content goes here" options={{ fontSize: 18, color: "1F2937" }} />
      </Text>

      <Notes>Speaker notes.</Notes>
    </Slide>
  );
}
```

## Common Mistakes

| ❌ Wrong                      | ✅ Correct                                             |
| ----------------------------- | ------------------------------------------------------ |
| `color="#FFFFFF"`             | `color="FFFFFF"` (no `#`)                              |
| `<RoundRect rectRadius={0}>`  | `<Rect>`                                               |
| `<div>`, `<span>`, `<p>`      | `<Text>` + `<TextRun>`                                 |
| Named export in `src/ppt.tsx` | `export default function ()`                           |
| Missing full-size background  | `<SlideBackground />` as first child                   |
| `function Foo(): PptxNode`    | `async function Foo()` — no return type                |
| Modifying `scripts/*.ts`      | Content belongs in `src/slides/` and `src/components/` |
| Forgetting `breakLine: true`  | Set on the last `<TextRun>` of each line               |

## Skills

- [pptxgenjsx](.agents/skills/pptxgenjsx/SKILL.md) - Component API reference

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

## NPM Scripts

| Command             | Action                                                          |
| ------------------- | --------------------------------------------------------------- |
| `npm run dev`       | Dev server at `localhost:5173` (refresh browser to see changes) |
| `npm run generate`  | Build `output/presentation.pptx`                                |
| `npm run typecheck` | Type check, no emit                                             |
| `npm run lint`      | Lint with oxlint                                                |
| `npm run format`    | Format with oxfmt                                               |
