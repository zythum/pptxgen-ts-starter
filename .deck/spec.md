# Design Spec

> # ⚠️ WARNING — EXAMPLE FILE, MUST OVERWRITE
>
> This is a **filled reference example** (a demo deck), NOT working data.
> Every NEW deck **must overwrite this file** at its stage:
> brief → 01-clarify · research → 02-research · outline → 03-outline · spec → 04-spec.
> A file existing here does NOT mean the work is done — it is still the example.
> Format spec: `workflow/00-deck-workspace.md`.

## 1. Canvas & page count

- `LAYOUT_WIDE` 13.333 × 7.5 in; **8 pages** (derived from ~8 min in `outline.md`)
- Safe margin 0.8 → content area **11.733 × 5.9 in**; content starts at y=2.0 (below SectionHeader)

## 2. Style

- **Dev / Data (8)** — developer audience + tool demo (`templates-themes/styles.md` catalog)
- Rationale: engineering talk; code/commands in mono (Courier New); no decorative imagery
- **Dual-background statement**: light content pages + dark cover/closing, the light/dark switch is a deliberate rhythm (§5)

## 3. Palette — primary: Light Professional; dark pages: borrow from Dark Premium

**Content pages (Light Professional; actual background pure white FFFFFF)**

| Role       | Hex             | Usage                                                                |
| ---------- | --------------- | -------------------------------------------------------------------- |
| background | FFFFFF          | Content-page background (SlideBackground light)                      |
| surface    | F3F0FF          | Light-purple cards (agenda / rich-text cards)                        |
| primary    | 1F2937          | Titles, card titles, body                                            |
| accent     | 7C3AED          | **The deck's single accent**: divider/underline/title/chart series 1 |
| text       | 6B7280          | Secondary text, footer                                               |
| faint      | 9CA3AF          | De-emphasized (captions, page numbers)                               |
| border     | E5E7EB / E2E8F0 | Card borders / table gridlines                                       |

**Dark pages (S1/S8, borrowed from Dark Premium)**

| Role        | Hex    | Usage                    |
| ----------- | ------ | ------------------------ |
| background  | 18181B | Cover/closing background |
| surface     | 27272A | Command pill             |
| primary     | FFFFFF | Main title               |
| accent-soft | A78BFA | Subtitle on dark         |
| muted       | 6B7280 | Footer on dark           |
| code-green  | 6EE7B7 | Command text (mono)      |

**Semantic colors (demo pages/charts only, ≤3 with explicit meaning)**:
`10B981` green=success · `DC2626` red=warning · `F59E0B` orange=attention · `3B82F6` blue=info

> Design decision log: S5 shape-demo page intentionally uses multiple colors
> (purple/green/orange gradient set) to show fill/stroke/transparency —
> a "demo deck" exception; business decks use one accent per palettes rules.

## 4. Typography

- Fonts: body **default** (no explicit fontFace); code/commands in **Courier New** (S3 code block, S8 pill)
- Actual scale: hero 36 / section title 30 / card title 16–18 / body 14–16 / caption 10–13 / code 11
- Line spacing: body 24–32 (24 in cards, 32 in the rich-text demo)

## 5. Background

- Dual background: light (FFFFFF) S2–S7 + dark (18181B) S1/S8
- Contrast: white on 18181B ≈ 13:1 ✓; A78BFA subtitle ≈ 7:1 ✓; footer 6B7280 decorative only (small, de-emphasized)

## 6. Layout constants (consistent across content pages)

- Uniform margin **0.8**; content width **11.733**
- SectionHeader: title (0.8, 0.6) 30pt bold `1F2937` + purple underline (0.8, 1.4) 2.0 × 0.05 `7C3AED`
- Content area starts at y=2.0; card height 4.8 (to 6.8); PageNumber bottom-right 10pt
- Cards: rectRadius **0.15**, inner padding 0.3, card gap 0.4 (agenda cards x=0/4.0/8.0; S4 cards x=0/6.0)
- Cross-page consistency: same title y, same margin 0.8, unified card geometry

## 7. Layout mapping (locked layouts from layouts.md)

| Page | Layout                       | Notes                                                                        |
| ---- | ---------------------------- | ---------------------------------------------------------------------------- |
| S1   | **L1 Cover** (dark variant)  | Centered hero + double divider + footer command                              |
| S2   | **L5 Cards-3 variant**       | 3 cards + bottom workflow strip (RoundRect + two-line text)                  |
| S3   | **L4 Split**                 | Left rich-text card + right code block (18181B background)                   |
| S4   | **L5 variant Cards-4 (2×2)** | 2×2 card grid, registered variant (see §8)                                   |
| S5   | **L4 variant Gallery**       | Left 8.1-wide double group (Rect/Oval) + right 3.2 narrow column (RoundRect) |
| S6   | **Data-Table** (full width)  | Header / banded rows / total row, registered variant (see §8)                |
| S7   | **L4 Split**                 | Left bar + right doughnut                                                    |
| S8   | **L9 Closing** (dark)        | Mirrors L1 ✓ (same palette, double divider, centered)                        |

## 8. Design decision log

- **Registered variants**: `Cards-4` (S4, 2×2 grid) and `Data-Table` (S6, full-width table page)
  are outside the 9 base layouts in layouts.md — registered here as this deck's
  locked variants per the lock rule; all further pages still choose from
  "locked set + this log", never invent on the fly.
- **S5 multi-color**: demo exception (see §3 decision log); not for business decks.
- **Fonts not locked**: a real deck should pick a pair from typography.md (e.g. Inter / JetBrains Mono);
  this demo deck keeps defaults + Courier New.
- **Palette naming**: Light Professional + Dark Premium are catalog names; the
  hex values (`7C3AED` etc.) are the facts.

## 9. Mirror comment (per 04 spec, on top of `src/ppt.tsx`)

```tsx
/* Design spec
   Canvas: 13.333 × 7.5 (LAYOUT_WIDE) — 8 slides
   Style:  Dev / Data (8) — developer demo
   Palette: Light Professional (bg FFFFFF, accent 7C3AED) + Dark covers 18181B
   Fonts:  default / Courier New (code)
   Background: light content, dark cover + closing (deliberate contrast)
   Layout set: L1, L5×2, L4×3, Cards-4, Data-Table, L9 */
```
