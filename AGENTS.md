# pptxgen-ts-starter — Agent Guide

This file is for AI coding assistants (Cursor, Claude Code, Copilot, etc.) working on this project.

## Project Identity

A starter template for building `.pptx` presentations using **JSX + TypeScript + pptxgenjs**. Slides are defined as JSX components and compiled into PowerPoint files.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| JSX Components | `@zythum02/pptxgenjsx` ^0.1.1 (provides `<Slide>`, `<Text>`, `<Rect>`, `<RoundRect>`, etc.) |
| Rendering Engine | `pptxgenjs` ^4.0.1 |
| Dev Server | Vanilla Node HTTP server via `tsx` |
| PPTX Viewer (browser) | `@silurus/ooxml` |
| Build/Run | `tsx` — runs TypeScript directly, no compilation step needed |
| TS Config | `jsx: "react-jsx"`, `jsxImportSource: "@zythum02/pptxgenjsx"` |

## Architecture Rules

### 1. Slide Components

- Each slide is a **named function export** (e.g. `export function TitleSlide()`, `export function DataSlide()`).
- One file per slide, numbered by presentation order: `01-title.tsx`, `02-data.tsx`, `03-end.tsx`.
- Import all slides in `src/ppt.tsx` and compose them inside `<Deck>`.
- Every slide **must start with a full-size background shape** covering the entire canvas (13.333×7.5 inches).

### 2. Positioning

- **All positions are absolute** — there is no flexbox or grid. Every element has explicit `x`, `y`, `w`, `h` in inches.
- Design with inches, not pixels. Standard canvas is **13.333×7.5** (WIDE).

### 3. Shapes

| Element | When to Use |
|---------|-------------|
| `<Rect>` | Pure rectangles: background fills, decorative lines, accent bars |
| `<RoundRect>` | Only when **visibly rounded** corners are needed (cards, badges, buttons) |
| `<Ellipse>` | Circles and ovals |

> **Critical rule**: Never use `<RoundRect rectRadius={0} />` as a substitute for `<Rect>`. If it's a pure rectangle, use `<Rect>`.

### 4. Colors

- Hex strings **omit the `#` prefix**: `"1E1E2E"`, `"7C3AED"`, `"FFFFFF"`.
- Transparency is `fill: { color: "1E1E2E", transparency: 50 }` (0–100).

### 5. Text

- `<Text>` positions the block. Props: `x, y, w, h, align`, `valign`, `lineSpacing`.
- `<TextRun>` is the formatted segment. Each `TextRun` carries its own `options`: `fontSize`, `bold`, `italic`, `color`, `fontFace`, `breakLine`.
- Use `breakLine: true` on the last `TextRun` of a line (like `<br>` in HTML).

### 6. Images

- Place image files in `src/media/images/`.
- Reference with relative path in `<Image path="media/images/filename.png">`.
- Path is resolved relative to the entry file `src/ppt.tsx`.

### 7. Speaker Notes

- `<Notes>Your notes here</Notes>` — placed as a child of `<Slide>`.

### 8. Entry Point

- `src/ppt.tsx` has a **default export** (not named) that returns a `<Deck>` wrapping all slides.
- Keep the entry point clean — it should only import slides and compose the deck.

## Skill: pptxgenjsx

Detailed API reference is available in the agent skill at `.agents/skills/pptxgenjsx/`:

| Reference File | Covers |
|----------------|--------|
| [SKILL.md](.agents/skills/pptxgenjsx/SKILL.md) | Overview, import, core concepts, workflow checklist, file index |
| [components/slide.md](.agents/skills/pptxgenjsx/references/components/slide.md) | `<Deck>`, `<Slide>`, `<Notes>`, minimal slide template |
| [components/text.md](.agents/skills/pptxgenjsx/references/components/text.md) | `<Text>` block container, `<TextRun>` inline segment with all options |
| [components/shapes.md](.agents/skills/pptxgenjsx/references/components/shapes.md) | All shape components (`Rect`, `RoundRect`, `Ellipse`, `Arc`, `CustomGeometry`, etc.), `<Shape>` generic + 180-name `SHAPE_NAME` list |
| [components/chart.md](.agents/skills/pptxgenjsx/references/components/chart.md) | `<Chart>` — 9 chart types, data format, axis/bar/line/pie/label/3D options, Multi-Chart |
| [components/table.md](.agents/skills/pptxgenjsx/references/components/table.md) | `<Table>` + `<TableCell>` — borders, colspan/rowspan, alignment, auto-paging |
| [components/media.md](.agents/skills/pptxgenjsx/references/components/media.md) | `<Image>` (path/data/base64, sizing, rounding, rotation), `<Media>` (audio/video/YouTube) |
| [styling/index.md](.agents/skills/pptxgenjsx/references/styling/index.md) | Shared style interfaces: `ShapeFillProps`, `ShapeLineProps`, `ShadowProps`, `BorderProps`, `HyperlinkProps`, `TextBaseProps` |

## Workflow (for the agent)

When asked to add/edit slides:

1. Create a new file in `src/slides/` following the numbering convention.
2. Define a named export function returning `<Slide>` with a full-size background.
3. Import and add the slide to `src/ppt.tsx`.
4. Run `npm run dev` to verify in browser, or `npm run generate` to produce `.pptx`.

## Common Mistakes to Avoid

- ❌ `RoundRect` with `rectRadius={0}` — use `Rect` instead
- ❌ Hex color with `#` prefix — use `"FFFFFF"` not `"#FFFFFF"`
- ❌ HTML elements like `<div>`, `<span>`, `<p>`, `<section>` — they do not exist in `JSX.IntrinsicElements` and will cause TypeScript errors. Only imported components (`<Slide>`, `<Text>`, `<Rect>`, etc.) are valid
- ❌ Named export in `src/ppt.tsx` — it must be a default export
- ❌ Missing full-size background on a slide
- ❌ Modifying `scripts/dev-server.ts` or `scripts/generate.ts` unless there's a bug — they are infrastructure, not content

## NPM Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at localhost:5173 |
| `npm run generate` | Build output/presentation.pptx |
| `npm run generate -- -o my-deck.pptx src/ppt.tsx` | Custom output path |
