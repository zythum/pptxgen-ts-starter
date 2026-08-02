# Palettes — Semantic Roles and Verified Pairings

Pick one palette in stage 04 and mirror its approved roles to
`src/token/colors.ts`. Slides/components use tokens only. Hex values below have
no `#`, matching pptxgenjsx.

## 1. Required roles

| Role         | Purpose                        |
| ------------ | ------------------------------ |
| `background` | Full-canvas base               |
| `surface`    | Cards/panels                   |
| `primary`    | Titles/key structure           |
| `accent`     | Sparse emphasis/graphic signal |
| `text`       | Body copy                      |
| `muted`      | Secondary copy/captions        |
| `border`     | Dividers/card outlines         |

Optional `accentText`, semantic statuses, chart series, and variants are added
only when used and documented. An accent may be **fill-only** if it is unsafe as
text.

## 2. Presets

### Light Professional — Tailwind neutral/violet

| Role       | Hex    | Source token |
| ---------- | ------ | ------------ |
| background | FAFAFA | zinc-50      |
| surface    | FFFFFF | white        |
| primary    | 1F2937 | gray-800     |
| accent     | 7C3AED | violet-600   |
| text       | 1F2937 | gray-800     |
| muted      | 6B7280 | gray-500     |
| border     | E5E7EB | gray-200     |

Accent use: text or graphic on background passes AA.

### Dark Premium — Tailwind zinc/violet

| Role       | Hex    | Source token |
| ---------- | ------ | ------------ |
| background | 18181B | zinc-900     |
| surface    | 27272A | zinc-800     |
| primary    | FAFAFA | zinc-50      |
| accent     | 8B5CF6 | violet-500   |
| text       | E4E4E7 | zinc-200     |
| muted      | A1A1AA | zinc-400     |
| border     | 3F3F46 | zinc-700     |

Accent use: graphic or large text on background; measured ratio is 4.18:1, so
do not use it for normal body text.

### Consulting — brand-inspired blue reference

| Role       | Hex    | Source                               |
| ---------- | ------ | ------------------------------------ |
| background | FFFFFF | white                                |
| surface    | F3F4F6 | Tailwind gray-100                    |
| primary    | 051C2C | third-party McKinsey color reference |
| accent     | 2251FF | third-party McKinsey color reference |
| text       | 051C2C | same reference                       |
| muted      | 6B7280 | Tailwind gray-500                    |
| border     | D1D5DB | Tailwind gray-300                    |

Treat this as brand-inspired unless an official client/brand source confirms the
values. Accent text on white passes AA.

### Editorial — warm paper/signal yellow reference

| Role       | Hex    | Source                              |
| ---------- | ------ | ----------------------------------- |
| background | FDFCF3 | third-party Monocle-style reference |
| surface    | FFFFFF | reference white                     |
| primary    | 211D1C | reference charcoal                  |
| accent     | FFC500 | reference signal yellow             |
| text       | 211D1C | reference charcoal                  |
| muted      | 6E6E6E | reference caption gray              |
| border     | D9D9D9 | reference rule gray                 |

**Accent restriction:** `FFC500` on `FDFCF3` is 1.54:1 and is **fill/graphic
only**. Never use it as kicker/body text on cream or white. Use `primary` as the
text emphasis (`accentText` may alias `primary` if a separate semantic key is
needed).

### Vibrant — Tailwind indigo/violet

| Role       | Hex    | Source token |
| ---------- | ------ | ------------ |
| background | FFFFFF | white        |
| surface    | F5F3FF | violet-50    |
| primary    | 1E1B4B | indigo-950   |
| accent     | 7C3AED | violet-600   |
| text       | 312E81 | indigo-900   |
| muted      | 6B7280 | gray-500     |
| border     | DDD6FE | violet-200   |

Accent text on white passes AA. Keep one violet signal; do not add unrelated
accent hues.

### Natural — Tailwind stone/lime

| Role       | Hex    | Source token |
| ---------- | ------ | ------------ |
| background | FAFAF9 | stone-50     |
| surface    | FFFFFF | white        |
| primary    | 1C1917 | stone-900    |
| accent     | 4D7C0F | lime-700     |
| text       | 292524 | stone-800    |
| muted      | 78716C | stone-500    |
| border     | E7E5E4 | stone-200    |

Accent text on background passes AA.

## 3. Verified foreground/background matrix

Ratios below were computed with `scripts/color-tool.ts --contrast`.

| Palette    | Pair              | Ratio | Normal text AA | Rule                     |
| ---------- | ----------------- | ----: | -------------- | ------------------------ |
| Light      | text/background   | 14.06 | Pass           | body/title               |
| Light      | muted/background  |  4.63 | Pass           | secondary text           |
| Light      | accent/background |  5.46 | Pass           | sparse emphasis          |
| Dark       | text/background   | 13.96 | Pass           | body/title               |
| Dark       | muted/background  |  6.91 | Pass           | secondary text           |
| Dark       | accent/background |  4.18 | Fail           | large text/graphics only |
| Consulting | text/background   | 17.37 | Pass           | body/title               |
| Consulting | muted/background  |  4.83 | Pass           | secondary text           |
| Consulting | accent/background |  5.69 | Pass           | sparse emphasis          |
| Editorial  | text/background   | 16.22 | Pass           | body/title               |
| Editorial  | muted/background  |  4.95 | Pass           | secondary text           |
| Editorial  | accent/background |  1.54 | Fail           | fill/graphic only        |
| Vibrant    | text/background   | 11.42 | Pass           | body/title               |
| Vibrant    | muted/background  |  4.83 | Pass           | secondary text           |
| Vibrant    | accent/background |  5.70 | Pass           | sparse emphasis          |
| Natural    | text/background   | 14.52 | Pass           | body/title               |
| Natural    | muted/background  |  4.59 | Pass           | secondary text           |
| Natural    | accent/background |  4.78 | Pass           | sparse emphasis          |

This matrix covers the listed background only. Re-test text on surfaces,
images, overlays, or changed brand colors.

## 4. Usage rules

1. Use 60-30-10 as a rough visual balance, not a measured quota.
2. One accent per deck; semantic red/green may appear only for meaning.
3. Prefer near-white/near-black for large areas, but pure white is valid when
   the approved palette calls for it.
4. Body contrast ≥ 4.5:1; large text ≥ 3:1.
5. Do not rely on color alone; pair with labels, shape, or weight.
6. Transparency can soften fills/borders, not rescue unreadable text.
7. Check chart series against each other and the background.
8. Record allowed pairings and fill-only restrictions in spec §3.

## 5. Derived colors

Never hand-compute a new hex. Use the tool and record command/result in spec §8:

```bash
npx tsx scripts/color-tool.ts --hex 7C3AED --darken 10
npx tsx scripts/color-tool.ts --hex 7C3AED --lighten 15
npx tsx scripts/color-tool.ts --hex 7C3AED --gray
npx tsx scripts/color-tool.ts --hex 7C3AED --hex FAFAFA --contrast --json
```

Verified preset derivations:

| Palette            | accentHover          | surfaceAlt                   |
| ------------------ | -------------------- | ---------------------------- |
| Light Professional | 5F14E0 (`darken 10`) | F5F5F5 (white `darken 4`)    |
| Dark Premium       | 692CF3 (`darken 10`) | 333337 (surface `lighten 5`) |
| Consulting         | 0033EE (`darken 10`) | E7E9ED (surface `darken 4`)  |
| Editorial          | CC9E00 (`darken 10`) | F5F5F5 (white `darken 4`)    |
| Vibrant            | 5F14E0 (`darken 10`) | ECE9FF (surface `darken 2`)  |
| Natural            | 314F09 (`darken 10`) | F5F5F5 (white `darken 4`)    |

For soft fills/borders, prefer the approved accent token with element
`transparency`; transparency is not a hex token.

## 6. Extending a palette

1. Use exact values from a user brand kit or published design system.
2. Record source type: `official`, `design-system`, or `third-party-reference`.
3. Verify all intended foreground/background pairs.
4. Add only semantic roles actually used.
5. Never blend presets into an unsourced palette.

## Sources

| Source                   | Type                       | URL                                                                     | Use                                                   |
| ------------------------ | -------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------- |
| Tailwind CSS colors      | design-system              | https://tailwindcss.com/docs/colors                                     | Light, Dark, Vibrant, Natural, neutrals               |
| McKinsey color reference | third-party-reference      | https://colorcodeguide.com/official/mckinsey                            | Consulting inspiration; not treated as official proof |
| Monocle style reference  | third-party-reference      | https://styles.refero.design/style/9165ecb1-f068-4093-8783-1f3c98898b8a | Editorial inspiration                                 |
| WCAG contrast minimum    | official standard guidance | https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html       | Thresholds                                            |
