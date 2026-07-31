# Palettes

Pick ONE palette per deck (in `workflow/04-spec`). All values are pptxgenjsx hex
(no `#`). Each palette defines: background, surface, primary, accent, text,
muted, border.

**After picking:** write the role values into `src/token/colors.ts` — that file
is the runtime single source of truth; slides reference `colors.*`, never bare
hex. New variants (hover, soft, borders) go through `color-tool.ts` and are
registered in `colors.ts` under semantic names.

> **Constraint rule:** do not invent hex colors. Every preset below is drawn
> from a **published design system or brand palette** (sources at bottom) and is
> contrast-checked. Custom colors only when the user supplies brand colors —
> then map them into these role slots.

## Light Professional — Tailwind neutral / violet

Neutral grays with a single violet accent. Safe default for business and
developer audiences. Source: Tailwind CSS default palette.

| Role       | Hex    | Token        |
| ---------- | ------ | ------------ |
| background | FAFAFA | `zinc-50`    |
| surface    | FFFFFF | white        |
| primary    | 1F2937 | `gray-800`   |
| accent     | 7C3AED | `violet-600` |
| text       | 1F2937 | `gray-800`   |
| muted      | 6B7280 | `gray-500`   |
| border     | E5E7EB | `gray-200`   |

## Dark Premium — Tailwind zinc / violet

Dark counterpart of Light Professional; zinc grays (warm-neutral, less blue
than `gray`) with a lighter violet accent. Source: Tailwind CSS default palette.

| Role       | Hex    | Token        |
| ---------- | ------ | ------------ |
| background | 18181B | `zinc-900`   |
| surface    | 27272A | `zinc-800`   |
| primary    | FAFAFA | `zinc-50`    |
| accent     | 8B5CF6 | `violet-500` |
| text       | E4E4E7 | `zinc-200`   |
| muted      | A1A1AA | `zinc-400`   |
| border     | 3F3F46 | `zinc-700`   |

## Consulting — McKinsey brand

Official McKinsey palette: Black Pearl navy against white, vivid Primary Blue
used sparsely for emphasis ("50 shades of blue" but high-contrast). Source:
McKinsey & Company brand colors.

| Role       | Hex    | Source                              |
| ---------- | ------ | ----------------------------------- |
| background | FFFFFF | white                               |
| surface    | F3F4F6 | Tailwind `gray-100` (neutral panel) |
| primary    | 051C2C | McKinsey **Black Pearl**            |
| accent     | 2251FF | McKinsey **Primary Blue**           |
| text       | 051C2C | McKinsey Black Pearl                |
| muted      | 6B7280 | Tailwind `gray-500`                 |
| border     | D1D5DB | Tailwind `gray-300`                 |

## Editorial — Monocle design tokens

The Monocle system: warm cream paper, one signal yellow as the only accent,
supporting navy/charcoal and warm grays. No drop shadows; thin rules only.
Source: Monocle design system tokens.

| Role       | Hex    | Token                      |
| ---------- | ------ | -------------------------- |
| background | FDFCF3 | **Newsprint Cream**        |
| surface    | FFFFFF | Broadsheet White           |
| primary    | 211D1C | Charcoal (warm near-black) |
| accent     | FFC500 | **Signal Yellow**          |
| text       | 211D1C | Charcoal                   |
| muted      | 6E6E6E | Caption Gray               |
| border     | D9D9D9 | Rule Gray                  |

Note: Monocle's own headlines are pure Folio Black (`000000`); here primary/text
use Charcoal to honor the "avoid pure black" rule — swap to `000000` if you want
the original look.

## Vibrant — Tailwind indigo / violet

Startup / product energy: deep indigo ink on a violet-tinted surface. Source:
Tailwind CSS default palette.

| Role       | Hex    | Token        |
| ---------- | ------ | ------------ |
| background | FFFFFF | white        |
| surface    | F5F3FF | `violet-50`  |
| primary    | 1E1B4B | `indigo-950` |
| accent     | 7C3AED | `violet-600` |
| text       | 312E81 | `indigo-900` |
| muted      | 6B7280 | `gray-500`   |
| border     | DDD6FE | `violet-200` |

## Natural — Tailwind stone / lime

Warm, organic: stone (warm gray with brown undertone) + olive-lime accent.
Source: Tailwind CSS default palette.

| Role       | Hex    | Token       |
| ---------- | ------ | ----------- |
| background | FAFAF9 | `stone-50`  |
| surface    | FFFFFF | white       |
| primary    | 1C1917 | `stone-900` |
| accent     | 4D7C0F | `lime-700`  |
| text       | 292524 | `stone-800` |
| muted      | 78716C | `stone-500` |
| border     | E7E5E4 | `stone-200` |

## Color roles (define all before writing slides)

| Role       | Purpose                                     | Typical count |
| ---------- | ------------------------------------------- | ------------- |
| Background | Full-canvas base                            | 1             |
| Surface    | Cards, panels (lighter/darker than bg)      | 1             |
| Primary    | Titles, key UI, brand                       | 1             |
| Accent     | Highlights, takeaway, CTA — use sparingly   | 1             |
| Text       | Body copy                                   | 1             |
| Muted text | Captions, secondary info                    | 1             |
| Border     | Structure lines, dividers                   | 1             |
| Semantic   | Success / warning / danger (charts, status) | 3 max         |

## Rules

1. **Hex without `#`** — `"7C3AED"` not `"#7C3AED"` (pptxgenjsx).
2. **60-30-10** — 60% background/surface, 30% text/primary, 10% accent.
   Accent > ~10% coverage = decoration, not communication.
3. **Avoid pure black/white** — off-black `1F2937`, off-white `FAFAFA`.
4. **Contrast (WCAG)**: body vs background ≥ 4.5:1; large text (≥ 18 pt) ≥ 3:1;
   never place body text on accent.
5. **Transparency for layering** — `fill: { color, transparency }` to dim
   decorative shapes; never use it to fake text contrast.
6. **One accent per deck** — two accents split attention.
7. **Semantic colors only for meaning** — green = good, red = bad.
8. **Dark vs light** — choose once per deck; mixing is a deliberate statement.
9. **Surface** = cards that sit on background; **border** = dividers/card
   outlines (1 pt; transparency allowed).

## Derived colors (use `color-tool.ts`, never hand-compute)

Deriving hex by hand is unreliable for LLMs — always compute with the CLI:

```
npx tsx scripts/color-tool.ts --hex 7C3AED --darken 10
npx tsx scripts/color-tool.ts --hex 7C3AED --lighten 15
npx tsx scripts/color-tool.ts --hex 7C3AED --gray
npx tsx scripts/color-tool.ts --hex 7C3AED --hex 1F2937 --contrast  # WCAG ratio
```

Standard derivations for each palette (computed with the tool):

| Palette            | accent.hover (darken 10) | surface.alt (surface lighten/darken) | accent.soft         | accent.border       |
| ------------------ | ------------------------ | ------------------------------------ | ------------------- | ------------------- |
| Light Professional | 5F14E0                   | F5F5F5 (FFFFFF darken 4)             | 7C3AED @ transp. 10 | 7C3AED @ transp. 30 |
| Dark Premium       | 692CF3                   | 333337 (27272A lighten 5)            | 8B5CF6 @ transp. 10 | 8B5CF6 @ transp. 30 |
| Consulting         | 0033EE                   | E7E9ED (F3F4F6 darken 4)             | 2251FF @ transp. 10 | 2251FF @ transp. 30 |
| Editorial          | CC9E00                   | F5F5F5 (FFFFFF darken 4)             | FFC500 @ transp. 10 | FFC500 @ transp. 30 |
| Vibrant            | 5F14E0                   | ECE9FF (F5F3FF darken 2)             | 7C3AED @ transp. 10 | 7C3AED @ transp. 30 |
| Natural            | 314F09                   | F5F5F5 (FFFFFF darken 4)             | 4D7C0F @ transp. 10 | 4D7C0F @ transp. 30 |

Usage:

- **accent.soft** — highlight / icon backgrounds (transparency, not a new hex)
- **accent.border** — card outlines (1 pt, transparency 30)
- **accent.hover** — one step darker for emphasis (also `primary.hover` on light decks)
- **surface.alt** — alternating rows / section panels

If a derivation you need is not in this table: compute it with `color-tool.ts`
and record the command + result in `spec.md` §8 — never write a hand-computed hex.

## Accessibility extras

- Don't rely on color alone: pair color with weight or shape.
- Muted text ≥ 3:1 against background even when de-emphasizing.
- Check chart series colors against each other, not just the background.

## Sources (all presets above trace to these)

| Source                | URL                                                                                                                                | Used for                              |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Tailwind CSS palette  | https://tailwindcss.com/docs/colors (hex: github.com/tailwindlabs/tailwindcss/blob/main/packages/tailwindcss/src/compat/colors.ts) | Light/Dark/Vibrant/Natural + neutrals |
| IBM Carbon tokens     | https://carbondesignsystem.com/elements/color/tokens/                                                                              | (alternative professional source)     |
| McKinsey brand colors | https://colorcodeguide.com/official/mckinsey                                                                                       | Consulting palette                    |
| Monocle design tokens | https://styles.refero.design/style/9165ecb1-f068-4093-8783-1f3c98898b8a                                                            | Editorial palette                     |
| WCAG contrast         | https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html                                                                  | contrast rules                        |

### When to extend

Do not invent colors. If a deck needs a hue not covered above:

1. Pull the exact token from a published system (Tailwind / Carbon / your brand
   kit) and **record source + token name** in `spec.md` §8.
2. Verify contrast against the chosen background (WCAG 4.5:1 body, 3:1 large).
3. Never blend two palettes into an unreferenced mix.
