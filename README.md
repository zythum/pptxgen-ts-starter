# pptxgen-ts-starter

A starter template for creating PowerPoint presentations using **JSX** + **TypeScript** with [pptxgenjs](https://github.com/gitbrent/PptxGenJS). Build slides declaratively, preview instantly in the browser, and generate professional `.pptx` files.

## Features

- JSX syntax — write slides with React-style components (`<Slide>`, `<Text>`, `<Rect>`, `<Image>`)
- TypeScript — full type safety
- Dev server — real-time preview in browser
- Export — generate `.pptx` files with a single command
- Rich component set — shapes, charts, tables, images, rich text, speaker notes

## GitHub Template

This is a template repo. Click the green **Use this template** button to get started.

## Clone to local

If you prefer to do it manually with a cleaner git history:

```bash
git clone https://github.com/your-username/pptxgen-ts-starter.git
cd pptxgen-ts-starter
npm install
```

## Checklist

When you use this template, update the following:

- Remove `.git` directory and run `git init` to clean up the history
- Change the `name` field in `package.json`
- Clean up the `README.md` file
- Replace slide files in `src/slides/` with your own content

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
