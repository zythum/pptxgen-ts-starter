# pptxgen-ts-starter

A starter template for creating PowerPoint presentations using **JSX** + **TypeScript** with [pptxgenjs](https://github.com/gitbrent/PptxGenJS). Build slides declaratively, preview instantly in the browser, and generate professional `.pptx` files.

## Features

- JSX syntax — write slides with React-style components (`<Slide>`, `<Text>`, `<Rect>`, `<Image>`)
- TypeScript — full type safety
- Dev server — real-time preview in browser
- Export — generate `.pptx` files with a single command
- Rich component set — shapes, charts, tables, images, rich text, speaker notes

## Quick Start

### 1. Use this template (recommended)

Click the **Use this template** button on GitHub — it creates a fresh repository under your account with no shared history.

### 2. Create with tiged

If you prefer working locally without creating a GitHub repository first:

```bash
npx tiged zythum/pptxgen-ts-starter my-presentation
cd my-presentation
npm install
```

### 3. Clone manually (last resort)

```bash
git clone https://github.com/zythum/pptxgen-ts-starter.git
cd pptxgen-ts-starter
npm install
```

## Checklist

Start customizing:

- Change the `name` field in `package.json`
- Replace slide files in `src/slides/` with your own content
- Clean up this `README.md`

## Usage

The starter contains the following npm scripts:

| Command             | Action                                                          |
| ------------------- | --------------------------------------------------------------- |
| `npm run dev`       | Dev server at `localhost:5173` (refresh browser to see changes) |
| `npm run generate`  | Build `output/presentation.pptx`                                |
| `npm run typecheck` | Type check, no emit                                             |
| `npm run lint`      | Lint with oxlint                                                |
| `npm run format`    | Format with oxfmt                                               |

### CLI Tools

Two utility scripts help verify slide layout before generating the final `.pptx`:

- **`scripts/estimate-text.ts`** — measure rendered text height to prevent overflow
- **`scripts/image-tool.ts`** — query image metadata, crop, or resize images

See [AGENTS.md](AGENTS.md#cli-tools) for full usage details and examples.

## Project Structure

```
pptxgen-ts-starter/
├── scripts/
│   ├── dev-server.ts      # dev server with browser preview
│   └── generate.ts        # CLI .pptx builder
├── src/
│   ├── ppt.tsx            # deck entry — compose slides here
│   ├── slides/            # individual slide components
│   ├── components/        # shared UI: SlideBackground, SectionHeader, Card
│   └── media/images/      # place your images here
├── web/
│   └── index.html         # browser-based PPTX viewer
├── .agents/
│   └── skills/pptxgenjsx/ # component API reference
├── output/                # generated .pptx files
├── AGENTS.md              # detailed slide authoring guide
├── package.json
├── tsconfig.json
└── .gitignore
```

## Agent Guide

For detailed authoring instructions — conventions, workflow, common mistakes, and component API — see [AGENTS.md](AGENTS.md). This is the primary reference for both human contributors and AI coding assistants.

## Acknowledgment

If you found it useful, I would be grateful if you could leave a star on the repository.

Thank you.
