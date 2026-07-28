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

The starter contains the following scripts:

- `npm run dev` — starts dev server at `localhost:5173` with browser preview
- `npm run generate` — generates `output/presentation.pptx`
- `npm run generate -- -o my-deck.pptx src/ppt.tsx` — build with custom output path

## Project Structure

```
pptxgen-ts-starter/
├── scripts/
│   ├── dev-server.ts      # dev server with browser preview
│   └── generate.ts        # CLI .pptx builder
├── src/
│   ├── ppt.tsx            # deck entry — compose slides here
│   ├── slides/            # individual slide components
│   └── media/images/      # place your images here
├── web/
│   └── index.html         # browser-based PPTX viewer
├── output/                # generated .pptx files
├── package.json
├── tsconfig.json
└── .gitignore
```

## Acknowledgment

If you found it useful, I would be grateful if you could leave a star on the repository.

Thank you.
