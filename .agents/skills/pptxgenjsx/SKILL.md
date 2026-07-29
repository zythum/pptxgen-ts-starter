---
name: pptxgenjsx
description: >
  Creates and edits PowerPoint slides using JSX components from @zythum02/pptxgenjsx.
  Use when generating or modifying .pptx files, writing slide components, composing
  presentations, or working with pptxgen-ts-starter. Covers Deck, Slide, Text, TextRun,
  Notes, all shapes (Rect, RoundRect, Ellipse, Arc, CustomGeometry, etc.), Chart,
  Table, Image, Media, positioning, colors, and project conventions.
metadata:
  requires:
    bins: ["tsx", "npm"]
---

# pptxgenjsx — JSX Components for PowerPoint

Build `.pptx` presentations using JSX + TypeScript + [PptxGenJS](https://github.com/gitbrent/PptxGenJS) v4.

## Import

```tsx
import {
  Deck,
  Slide,
  Text,
  TextRun,
  Notes,
  Rect,
  RoundRect,
  Ellipse,
  LineBetween,
  Arc,
  BlockArc,
  CustomGeometry,
  Shape,
  Chart,
  Table,
  TableCell,
  Image,
  Media,
} from "@zythum02/pptxgenjsx";
```

TSConfig: `jsx: "react-jsx"`, `jsxImportSource: "@zythum02/pptxgenjsx"`.

## Core Concepts

| Rule            | Detail                                                                         |
| --------------- | ------------------------------------------------------------------------------ |
| **Canvas**      | 13.333 × 7.5 inches (WIDE)                                                     |
| **Positioning** | Absolute inches — every element needs `x`, `y`, `w`, `h`                       |
| **Colors**      | Hex without `#` (`"FFFFFF"`) or theme color (`"accent1"`)                      |
| **Background**  | Every slide starts with `<Rect x={0} y={0} w={13.333} h={7.5}>`                |
| **Async**       | Slide components are `async`: `export async function Foo(): Promise<PptxNode>` |
| **Entry Point** | `src/ppt.tsx` — `export default function()` returning `<Deck>...`              |

## Quick Start

```tsx
export default function () {
  return (
    <Deck title="My Talk" author="You" layout={{ name: "WIDE", width: 13.333, height: 7.5 }}>
      <TitleSlide />
    </Deck>
  );
}

// A single slide (in src/slides/01-title.tsx)
export async function TitleSlide(): Promise<PptxNode> {
  return (
    <Slide>
      <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: "1E1E2E" }} />
      <Text x={1.5} y={2.5} w={10.333} h={1.5} align="center" valign="middle">
        <TextRun text="Hello, World!" options={{ fontSize: 44, bold: true, color: "FFFFFF" }} />
      </Text>
      <Notes>Welcome everyone!</Notes>
    </Slide>
  );
}
```

## NPM Scripts

| Command                                        | Action                           |
| ---------------------------------------------- | -------------------------------- |
| `npm run dev`                                  | Dev server at localhost:5173     |
| `npm run generate`                             | Build `output/presentation.pptx` |
| `npm run generate -- -o file.pptx src/ppt.tsx` | Custom output                    |

## Workflow: Adding a New Slide

Copy this checklist and track progress:

```
- [ ] Step 1: Create src/slides/NN-name.tsx with async function returning <Slide>
- [ ] Step 2: Add full-size background <Rect>
- [ ] Step 3: Compose content using <Text>, <Rect>, <Chart>, <Table>, etc.
- [ ] Step 4: Import slide in src/ppt.tsx and add to <Deck>
- [ ] Step 5: Run `npm run dev` to preview
```

## API Reference

```
references/
├── components/
│   ├── slide.md     # Deck, Slide, Notes, minimal slide template
│   ├── text.md      # Text, TextRun (all options incl. bullet/numbered lists)
│   ├── shapes.md    # Rect, RoundRect, Ellipse, Arc, Line, CustomGeometry, Shape + full SHAPE_NAME list
│   ├── chart.md     # Chart (9 types, Multi-Chart)
│   ├── table.md     # Table, TableCell (borders, colspan, auto-paging)
│   └── media.md     # Image, Media (audio/video/online)
└── styling/
    └── index.md     # FillProps, LineProps, ShadowProps, BorderProps, HyperlinkProps
```

Each file includes inline code examples.

| File                                                    | Contents                                                                                                                              |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [components/slide.md](references/components/slide.md)   | `<Deck>`, `<Slide>`, `<Notes>`, minimal slide template                                                                                |
| [components/text.md](references/components/text.md)     | `<Text>`, `<TextRun>` (all options incl. bullet/numbered lists)                                                                       |
| [components/shapes.md](references/components/shapes.md) | All 24+ dedicated shape components, `<CustomGeometry>` (SVG conversion), `<Shape>` generic + full 180-name list, process flow example |
| [components/chart.md](references/components/chart.md)   | `<Chart>` — data format, axis/bar/line/pie/label/3D options, Multi-Chart mixed types                                                  |
| [components/table.md](references/components/table.md)   | `<Table>` + `<TableCell>` — borders, colspan/rowspan, alignment, auto-paging, alternating rows example                                |
| [components/media.md](references/components/media.md)   | `<Image>` (path/data/base64, sizing, rounding, rotation), `<Media>` (audio/video/YouTube)                                             |
| [styling/index.md](references/styling/index.md)         | Shared style interfaces: `ShapeFillProps`, `ShapeLineProps`, `ShadowProps`, `BorderProps`, `HyperlinkProps`, `TextBaseProps`          |

## Common Mistakes

| ❌ Mistake                           | ✅ Correct                                           |
| ------------------------------------ | ---------------------------------------------------- |
| `<RoundRect rectRadius={0}>`         | `<Rect>` instead                                     |
| `color="#FFFFFF"`                    | `color="FFFFFF"` (no `#`)                            |
| `<div>`, `<span>`, `<p>`             | `<Text>` + `<TextRun>`                               |
| Named export in `src/ppt.tsx`        | `export default function()`                          |
| Missing full-size background         | Add `<Rect x={0} y={0} w={13.333} h={7.5}>`          |
| Forgetting `breakLine: true`         | Set on last `TextRun` of each line                   |
| Pixels instead of inches             | Use inches for all position props                    |
| Forgetting `async` on slide function | `export async function MySlide(): Promise<PptxNode>` |
