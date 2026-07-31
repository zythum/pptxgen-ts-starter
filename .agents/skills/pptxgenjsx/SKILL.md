---
name: pptxgenjsx
description: >
  Creates and edits PowerPoint slides using JSX components from @zythum02/pptxgenjsx.
  Use when generating or modifying .pptx files, writing slide components, composing
  presentations, or working with pptxgen-ts-starter.
metadata:
  requires:
    bins: ["tsx", "npm"]
---

# pptxgenjsx — JSX Components for PowerPoint

Build `.pptx` presentations using JSX + TypeScript + [PptxGenJS](https://github.com/gitbrent/PptxGenJS) v4.

> **This is NOT React** — the JSX transform produces `PptxNode` objects, not DOM elements. No React dependency required.

## Import

```tsx
import { Deck, Slide, Text, TextRun, Rect, ... } from "@zythum02/pptxgenjsx";
```

TSConfig: `jsx: "react-jsx"`, `jsxImportSource: "@zythum02/pptxgenjsx"`.

See individual reference files for per-component imports and exact props.

## Core Concepts

| Rule             | Detail                                                             |
| ---------------- | ------------------------------------------------------------------ |
| **Canvas**       | 13.333 × 7.5 in (WIDE) by default, configured on `<Deck>`          |
| **Positioning**  | Absolute inches — every element needs `x`, `y`, `w`, `h`           |
| **Colors**       | Hex **without `#`** (`"FFFFFF"`) or theme color name (`"accent1"`) |
| **Async**        | Slide components can be `async` — auto-detected and resolved       |
| **Return types** | **Never annotate** — let TypeScript infer from JSX                 |
| **Entry point**  | `src/ppt.tsx` — `export default function ()` returning `Deck`      |

## Quick Start

```tsx
// src/ppt.tsx — default export
import { Deck, Slide } from "@zythum02/pptxgenjsx";

export default function () {
  return (
    <Deck title="My Talk" author="You" layout="LAYOUT_WIDE">
      <Slide component={() => import("./slides/01-title")} />
    </Deck>
  );
}
```

```tsx
// src/slides/01-title.tsx — default async export
// NOTE: No <Slide> wrapper — <Slide component={...}> in src/ppt.tsx already provides
// the <Slide> context. Use <>...</> (Fragment) instead.
import { Rect, Text, TextRun, Notes } from "@zythum02/pptxgenjsx";

export default async function () {
  return (
    <>
      <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: "18181B" }} />
      <Text x={1.5} y={2.5} w={10.333} h={1.5} align="center" valign="middle">
        <TextRun options={{ fontSize: 44, bold: true, color: "FFFFFF" }}>
          Hello, PowerPoint!
        </TextRun>
      </Text>
      <Notes>Welcome everyone!</Notes>
    </>
  );
}
```

## Workflow: Adding a New Slide

```
- [ ] Step 1: Create src/slides/NN-name.tsx — `export default async function ()`
- [ ] Step 2: Compose content using <Text>, <TextRun>, <Rect>, <Chart>, <Table>, etc.
- [ ] Step 3: Import slide in src/ppt.tsx and add to <Deck>
- [ ] Step 4: Run quality checks — `npm run typecheck && npm run lint && npm run format`
```

## NPM Scripts

| Command             | Action                           |
| ------------------- | -------------------------------- |
| `npm run dev`       | Dev server at localhost:5173     |
| `npm run generate`  | Build `output/presentation.pptx` |
| `npm run typecheck` | Type check with tsc (no emit)    |
| `npm run lint`      | Lint with oxlint                 |
| `npm run format`    | Format with oxfmt                |

## API Reference

```
references/
├── deck.md        # Deck / Presentation — root element, title, author, layout
├── slide.md       # Slide, Notes, Section, Master, Placeholder, Fragment, lazy loading, async
├── text.md        # Text, TextRun (all options incl. bullet/numbered lists)
├── shapes.md      # 24+ shape components, CustomGeometry, Shape + 180-name list
├── chart.md       # Chart (9 types), typed chart components, Multi-Chart
├── table.md       # Table, TableCell, TableRow (borders, colspan, auto-paging)
├── media.md       # Image (path/data/base64), Media (audio/video/online)
├── group.md       # Group — coordinate transformation, nesting, useGroupContext
├── raw.md         # Raw escape hatch for direct pptxgenjs access
├── hooks.md       # Context hooks + percentage coordinates
└── styling.md     # Units, Fill/Line/Shadow/Border/Hyperlink props, Text base props
```

## Common Mistakes

| ❌ Mistake                                 | ✅ Correct                                           |
| ------------------------------------------ | ---------------------------------------------------- |
| `<RoundRect rectRadius={0}>`               | `<Rect>`                                             |
| `color="#FFFFFF"`                          | `color="FFFFFF"` (no `#`)                            |
| `<div>`, `<span>`, `<p>`                   | `<Text>` + `<TextRun>`                               |
| Named export in `src/ppt.tsx`              | `export default function ()`                         |
| Missing full-size background               | Add `<SlideBackground />` or `<Rect>` as first child |
| Forgetting `breakLine: true`               | Set on last `TextRun` of each line                   |
| Pixels instead of inches                   | Use inches for all position props                    |
| `function Foo(): Promise<PptxNode>`        | `async function Foo()` — no return type annotation   |
| `type` instead of `mediaType` on `<Media>` | Use `mediaType="video"` / `mediaType="audio"`        |
| HTML elements inside JSX                   | Only imported components are valid JSX children      |
