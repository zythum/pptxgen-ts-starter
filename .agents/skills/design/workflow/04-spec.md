# Workflow 04 — Design Spec: Canvas, Style, Palette, Fonts

**Goal:** lock the deck's visual system BEFORE composing any slide. Everything
in `templates-themes/` exists to make this step fast and consistent.

**Gate ⛔:** confirm the design spec (canvas, style, palette, fonts, background)
with the user before writing slide code. Changing tokens mid-deck is expensive.

## 1. Canvas & page count

- Default canvas: `LAYOUT_WIDE` = 13.333 × 7.5 in (see `pptxgenjsx/references/deck.md`
  for the layout enum). Use this unless the user has a different format.
- Page count comes from `03-outline` (duration × pace). Re-confirm it here —
  if the deck gained/lost content, adjust before designing.

## 2. Style

Pick ONE style from `templates-themes/styles.md`, routed by:

1. **Purpose** — pitch / review / teaching / sharing / recap
2. **Audience** — execs, clients, peers, public, investors
3. **Content type** — narrative-heavy (human stories) vs fact-heavy (data)

The style determines: palette family, font pair, background treatment, and
layout tendencies. Document the choice with a one-line rationale.

## 3. Palette

- Pick ONE palette from `templates-themes/palettes.md`. **Do not invent hex
  colors** unless the user requires brand colors — preset palettes are already
  contrast-checked and cohesive.
- If brand colors exist, map them into the role slots (background/surface/
  primary/accent/text/muted/border) and keep the roles, don't fight them.
- One accent color for the whole deck.
- **Write the chosen values into `src/token/colors.ts` and
  `src/token/typography.ts`** (the runtime single source of truth). Slides
  reference `colors.*` / `typography.*`; deriving color variants happens via
  `scripts/color-tool.ts` and the results are added to `colors.ts` with
  semantic names — never as bare hex in slide files.
  Structure, naming, lifecycle and boundary rules of these two files:
  `workflow/04b-token-files.md`.

## 4. Typography

- Pick ONE font pair from `templates-themes/typography.md` (title + body,
  ≤ 2 families). CJK-heavy decks: pick a CJK-safe pair.
- Set the size scale: hero 32–44 / slide title 24–30 / body 14–18 /
  caption 10–12 (adjust to canvas).

## 5. Background

- Every slide starts with `<SlideBackground color="light" />` (or `"dark"`).
  Choose once per deck; mixing light/dark is a deliberate style statement.
- Dark backgrounds: keep text ≥ 4.5:1 contrast; keep accent bright.
- Background images are a `06-visuals` decision — never default to them.

## 6. Lock the spec

Save the locked spec to `.deck/spec.md` (fixed filename, project root) — the
single source of truth for the deck's visual system. Format and mandatory
fields (§1–§9): `workflow/00-deck-workspace.md` → `spec.md`. When
colors/fonts change later, edit this file first, then propagate to every
slide. Keep `src/token/colors.ts` and `src/token/typography.ts` in sync with
spec §3 / §4 (same role values and type scale).

Mirror the tokens as a comment block at the top of `src/ppt.tsx` so every slide
follows the same values (format: see `04b-token-files.md` → lifecycle):

```tsx
{
  /* Design spec
  Canvas: 13.333 × 7.5 (LAYOUT_WIDE)
  Style:  Consulting (exec review)
  Palette: consulting — accent 2251FF
  Fonts:  Inter (title) / Inter (body)
  Background: light (FAFAFA)
  Layout set: Cover, Section, Explain-split, Evidence-data, Closing
*/
}
```

## 7. Confirm

Present the spec to the user:

- Canvas + page count
- Style name + one-line rationale
- Palette name + accent hex
- Font pair
- Background (light/dark)

**Stop and ask** for approval. Only after approval, start composing slides.
