# Research

> # ⚠️ WARNING — EXAMPLE FILE, MUST OVERWRITE
>
> This is a **filled reference example** (a demo deck), NOT working data.
> Every NEW deck **must overwrite this file** at its stage:
> brief → 01-clarify · research → 02-research · outline → 03-outline · spec → 04-spec.
> A file existing here does NOT mean the work is done — it is still the example.
> Format spec: `workflow/00-deck-workspace.md`.

## Sources

This deck is a self-demonstration of the starter: all material comes from the
project itself (AGENTS.md / package.json / `src/`), following the **When NOT
to research** branch of `workflow/02-research.md` — the user already provided
all material, so no external web search was needed. The cards below are
extracted from project docs and code, for slide comments to cite.

## Fact Cards

```
F-1 · FACT: Render pipeline = @zythum02/pptxgenjsx (JSX components) → pptxgenjs ^4.0.1 outputs native .pptx
     SOURCE: AGENTS.md (Tech Stack) + package.json
     USE: architectural premise for all demo pages S3–S7

F-2 · FACT: TS config jsx: "react-jsx" + jsxImportSource: "@zythum02/pptxgenjsx"
     SOURCE: AGENTS.md (TS Config)
     USE: JSX code-block demo content on S3

F-3 · FACT: Dev server = vanilla Node HTTP via tsx, no file watching, refresh browser manually
     SOURCE: AGENTS.md (Dev Server)
     USE: S2 workflow strip + S8 commands

F-4 · FACT: Commands — npm run dev → localhost:5173; npm run generate → output/presentation.pptx;
     plus typecheck / lint / format
     SOURCE: AGENTS.md (NPM Scripts) + package.json
     USE: S1 footer, S8 command pills

F-5 · FACT: Canvas LAYOUT_WIDE = 13.333 × 7.5 in; whole deck uses absolute inches (x,y,w,h)
     SOURCE: pptxgenjsx/references/deck.md + AGENTS.md (Positioning)
     USE: coordinate system of every page

F-6 · FACT: Conventions — numbered files src/slides/NN-name.tsx; patterns reused 3+ times go to components/;
     images in src/media/images/ (referenced relative to src/ppt.tsx)
     SOURCE: AGENTS.md (Project Structure / Components)
     USE: S2 preview + S8 guidance

F-7 · FACT: Shared components SlideBackground / SectionHeader / Card / PageNumber (src/components/)
     SOURCE: src/components/*.tsx
     USE: content-page skeleton for S2–S7

F-8 · FACT: Measurement tool scripts/estimate-text.ts (Canvas measureText),
     image tool scripts/image-tool.ts (sharp: crop / resize / metadata)
     SOURCE: AGENTS.md (CLI Tools)
     USE: measurement loop in 05-compose / 07-qa

F-9 · FACT: All sample data is fictional (quarterly sales, market share), demoing component capabilities only
     SOURCE: inline data in src/slides/06-table.tsx / 07-chart.tsx
     USE: constraint reminder — must not be misread as real business data

F-10 · FACT: Browser PPTX viewer @silurus/ooxml is used to preview generated .pptx
      SOURCE: AGENTS.md (PPTX Viewer)
      USE: S2 workflow strip (preview step)
```
