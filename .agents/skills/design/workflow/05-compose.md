# Workflow 05 — Compose: Per-Slide Layout & Typography

**Goal:** translate each outline page into a concrete layout (blocks with
`x/y/w/h`) + typography (sizes, weights, alignment), then implement with
pptxgenjsx. This is where design knowledge meets code.

## 1. Choose a locked layout

Every page maps its **role** (from `03-outline`) to a layout in
`templates-themes/layouts.md`. **Do not invent new layouts** — pick from the
locked set L1–L9 (Cover, Section, Statement, Split, Cards-3, Stats, Timeline,
Quote, Closing).

| Role      | Preferred layout        |
| --------- | ----------------------- |
| Cover     | L1 Cover                |
| Section   | L2 Section              |
| Statement | L3 Statement / L6 Stats |
| Explain   | L4 Split / L5 Cards     |
| Evidence  | L6 Stats / data chart   |
| Contrast  | L4 Split / L5 Cards     |
| Process   | L7 Timeline             |
| Moment    | L8 Quote                |
| Closing   | L9 Closing              |

## 2. Grid & coordinates

Canvas 13.333 × 7.5 in, safe margin 0.8 in → content area 11.733 × 5.9 in.
Use the 12-column mental grid (column ≈ 0.978 in, gutter 0.2 in):

| Column set | Width     | Use                        |
| ---------- | --------- | -------------------------- |
| Full       | 11.733 in | titles, statements, quotes |
| Half       | 5.7 in    | split layouts              |
| Third      | 3.7 in    | cards-3, stats-3           |
| Two-thirds | 7.7 in    | text + visual combos       |

Every element gets explicit `x`, `y`, `w`, `h` in inches.

## 3. Typography per block

Follow `templates-themes/typography.md`:

- Slide title: 24–30 pt bold, top-left (x 0.8, y 0.8 area)
- Body: 14–18 pt, left-aligned, leading 1.2–1.5× (CJK 1.6–1.8×)
- One bold takeaway phrase per slide (the core message)
- `breakLine: true` on the last `TextRun` of each line (pptxgenjsx)

## 4. Measure before fixing `h`

Variable-length text must be measured with `scripts/estimate-text.ts` BEFORE
choosing container height:

```
npx tsx scripts/estimate-text.ts -w 5.7 -f "16pt Inter" --leading 24 \
  "The actual sentence that will appear here…"
```

If measured height > planned `h`: **shorten the text first** (cut filler words,
split into two slides). Only if the meaning requires the length, increase `h`
and re-check neighbors.

## 5. Check overlap & rhythm per slide

- Sum `y + h` of each text block and confirm ≤ next block's `y` (no overlap).
- Elements must not exceed canvas (x + w ≤ 13.333, y + h ≤ 7.5).
- Cards in a row: identical `x`, `y`, `w`, `h`, equal gaps, same internal padding.
- Respect the density budget from `templates-themes/density.md` (≤ ~50 words,
  one KPI per stat card, etc.).

## 6. Consistency across pages

- Same margin (0.8 in) on every slide.
- Same title position (e.g. always y 0.8) so pages feel aligned when flipping.
- Section titles use the same component/position (`SectionHeader`).
- Cover and closing mirror each other (palette + composition).
- Same accent usage (bar under titles, highlight color) on every page.

## 7. Implement

Write the slide in `src/slides/NN-name.tsx` using `pptxgenjsx` components
(see `.agents/skills/pptxgenjsx/` for props). Pull the page's core message from
`.deck/outline.md` and the tokens from `.deck/spec.md` + `src/token/`
(`colors.ts` + `typography.ts`).
Keep positioning visible in the slide file — do not hide coordinates behind
abstractions (project convention).

**Colors & type always via tokens:** every color in the slide is `colors.*`
imported from `src/token/colors.ts` (`import { colors } from "../token/colors"`);
every `fontFace` / `fontSize` is `typography.*` from `src/token/typography.ts`
— no bare hex, no magic numbers. If a needed color variant isn't in
`colors.ts`, compute it
with `scripts/color-tool.ts`, add it to `colors.ts` under a semantic name,
then use it.

## 8. Slide-top comments (design intent)

At the top of every slide file, record the design intent in one comment line —
the second half of the `.deck/` traceability contract:

```tsx
// Slide 3 · L5 Split · palettes/consulting · core: complete the transformation in three steps · source: F-3
export default async function () {
```

Format: `// Slide <N> · <Layout ID> · <palette or style> · core: <one-sentence
message> · source: <fact card ID if any>`. IDs cited here must exist in `.deck/`
(see `workflow/00-deck-workspace.md` → cross-reference rules). Later
modification requests read this line plus `.deck/` first, so the original
intent is never guessed.
