# Workflow 05 — Compose: Visual Preflight, Layout, Typography, Code

## Contract

**Inputs:** confirmed outline/spec, synchronized tokens, research sources.
**Precondition:** execute the relevant decision path in `06-visuals.md` before
finalizing visual-dependent coordinates.
**Output:** measured `src/slides/NN-name.tsx`, updated spec/outline when a
decision changes, canonical slide comment.
**Gate:** none, but unapproved global design changes reopen stage 04.
**Validation:** source/layout/asset refs resolve; geometry fits; text is
measured; tokens are used.
**Resume:** read `.deck/` and the canonical comment before editing the page.

## Per-page order — do not reorder

1. Read the page row and notes from `outline.md`.
2. Resolve source refs and the core message.
3. Run the `06-visuals.md` decision tree: visual type, source, provenance,
   asset status, and intended slot ratio.
4. Select a core layout or register a justified variant in spec §8.
5. Lock slot geometry and update spec §7 if it changed.
6. Implement with pptxgenjsx and runtime tokens.
7. Measure text/images, inspect the rendered page, and simplify.

A chart/photo/screenshot/diagram page cannot skip step 3. Text-only is a valid
visual decision.

## 1. Select a layout

Use `templates-themes/layouts.md`:

- L1–L15 are core layouts.
- Prefer the role's mapped core layout.
- If none fits, first split or reframe the page.
- If a new geometry is still justified, register a variant in spec §8 before
  use: `ID`, parent layout, geometry, reason, affected slides.

Do not create an unnamed one-off layout in slide code.

## 2. Grid and coordinates

Default canvas: 13.333 × 7.5 in. Safe margin: 0.8 in. Content area:
11.733 × 5.9 in.

For the optional 12-column grid with 0.2 in gutters:

```text
column = (11.733 - 11 × 0.2) / 12 = 0.7944 in
span(n) = n × 0.7944 + (n - 1) × 0.2
```

Convenient locked widths remain full 11.733, half 5.7 with a 0.333 gap, and
third 3.71 with 0.3 gaps. Do not mix those convenience widths with the
12-column formula and call them exact grid spans.

Every positioned visual element gets explicit `x`, `y`, `w`, `h`. `TextRun`,
`Notes`, and other non-positioned child nodes do not.

## 3. Typography

Use semantic values from `src/token/typography.ts`; no copied layout literals.
Follow `templates-themes/typography.md` for line height, CJK handling, and
alignment. Use `bold: true/false` directly.

Measure variable text before fixing height. **Apply the width buffer** (see
`templates-themes/typography.md` §6) — pass `container_width × 0.95` as `-w`
to absorb cross-platform font-metric variance:

```bash
# Container is 5.7 in → measure at 5.7 × 0.95 ≈ 5.415
npx tsx scripts/estimate-text.ts -w 5.415 -f "16pt Inter" --leading 24 \
  "The actual sentence used on the slide"
```

Use 8 % for CJK text or 10 % when font substitution is likely. The slide code
still uses the full container width — only the `-w` measurement input is
narrowed.

If text does not fit: shorten/split first, then enlarge the box, then use a
smaller approved type role. Re-measure every changed text block.

## 4. Geometry and rhythm checks

- `x + w ≤ 13.333`; `y + h ≤ 7.5`.
- Measured text height plus margins fits its container.
- Neighboring boxes do not overlap.
- Cards share geometry, gaps, and padding.
- Images match slot ratio; crop/resize instead of stretching.
- Page density stays within the target locked in spec §6.
- Titles, margins, accents, and recurring components align across pages.

## 5. Implement

Create `src/slides/NN-name.tsx` using only pptxgenjsx components. The first
positioned layer is the full-canvas background component. Keep page-specific
coordinates visible in the slide file; extract only patterns used on 3+ slides.

Colors and typography come from token imports:

```ts
import { colors } from "../token/colors";
import { typography } from "../token/typography";
```

If a needed variant is absent, stop: derive/source it, register it in spec §8,
add the semantic token, then use it.

## 6. Canonical slide comment

Place one machine-readable line near the top of each slide file. Avoid `|` in
field values.

```ts
// slide: 03 | role: Evidence | layout: L10 | core: Growth is concentrated in one segment | sources: F-3,F-4 | visual: chart/bar | asset: none
```

Required fields:

- `slide`: two-digit number matching filename/order;
- `role`: outline role;
- `layout`: core or registered ID;
- `core`: one sentence;
- `sources`: comma list, user-material ID, or `none`;
- `visual`: `none`, `chart/bar`, `image/photo`, etc.;
- `asset`: relative path, asset ID, or `none`.

Update the comment whenever the implementation changes its intent.

## 7. Page completion condition

A page is complete only when:

- outline/spec/comment agree;
- all sources and assets resolve;
- visual provenance is recorded where required;
- text and image fit checks pass;
- rendered inspection finds no P0/P1 issue.

## Anti-patterns

- Deciding an image after coordinates are final.
- `L5 Split` (Split is L4).
- Unregistered layout geometry.
- Bare hex or magic reusable type sizes.
- A comment with stale source, visual, or layout fields.
