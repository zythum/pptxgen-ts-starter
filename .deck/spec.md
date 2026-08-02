# Design Spec

Status: confirmed
Updated: 2026-08-02
Decision authority: user-delegated

> **⚠️ EXAMPLE FILE — MUST OVERWRITE**
>
> This is a filled reference example, not active project data. Every new deck
> must replace it after the stage-04 approval condition is satisfied. Canonical
> format: `.agents/skills/design/workflow/00-deck-workspace.md`.

## 1. Canvas & page count

- Layout: `LAYOUT_WIDE`, 13.333 × 7.5 in.
- Page count: 8, matching `.deck/outline.md` and `src/ppt.tsx`.
- Safe margin: 0.8 in → content area 11.733 × 5.9 in.
- Content-page body begins at y=2.0 below the shared SectionHeader.

## 2. Style

- **Style:** `S8. Dev / Data`.
- **System:** information-first.
- **Rationale:** developer tutorial with code, editable tables/charts, explicit
  coordinates, and no decorative external imagery.
- **Secondary treatment boundary:** dark narrative treatment is limited to the
  Cover and Closing roles; all feature/evidence pages remain light.

## 3. Palette

### Core role mapping to runtime tokens

| Design role              | Runtime token           | Hex    | Usage                                   |
| ------------------------ | ----------------------- | ------ | --------------------------------------- |
| light background/surface | `colors.white`          | FFFFFF | S2–S7 canvas and white cards            |
| dark background          | `colors.darkBackground` | 18181B | S1/S8 canvas                            |
| dark surface             | `colors.darkSurface`    | 27272A | command pill/code surface               |
| primary/text             | `colors.ink`            | 1F2937 | light-page titles and main copy         |
| secondary text           | `colors.textSecondary`  | 4B5563 | secondary body copy                     |
| muted on light           | `colors.muted`          | 6B7280 | captions/secondary copy on white        |
| muted on dark            | `colors.mutedLight`     | 9CA3AF | small page numbers/footer text on dark  |
| accent                   | `colors.accent`         | 7C3AED | lines, highlights, primary chart series |
| accent on dark           | `colors.accentLight`    | A78BFA | subtitle/callout text on dark           |
| soft accent surface      | `colors.accentSoft`     | F3F0FF | highlighted cards                       |
| border                   | `colors.border`         | E5E7EB | cards/dividers                          |
| light border/grid        | `colors.borderLight`    | E2E8F0 | table/chart structure                   |

### Additional runtime token mirror

| Runtime token                                                 | Hex                                        | Demo use                    |
| ------------------------------------------------------------- | ------------------------------------------ | --------------------------- |
| `black`                                                       | 000000                                     | card shadow                 |
| `backgroundLight`                                             | FAFAFA                                     | agenda workflow strip       |
| `success`                                                     | 10B981                                     | positive chart series       |
| `dangerText` / `dangerSoft`                                   | DC2626 / FEF2F2                            | danger card treatment       |
| `blue600` / `blue500` / `blueSoft`                            | 2563EB / 3B82F6 / EFF6FF                   | info card/chart series      |
| `violet500` / `violet900` / `violetSoft`                      | 8B5CF6 / 5B21B6 / EDE9FE                   | shape/table demo            |
| `green200` / `green300` / `green600`                          | 6EE7B7 / 34D399 / 059669                   | shape demo                  |
| `amber200` / `amber400` / `amber500` / `amber600`             | FDE68A / FBBF24 / F59E0B / D97706          | shape/chart demo            |
| `slate800` / `slate700` / `slate600` / `slate400` / `slate50` | 1E293B / 334155 / 475569 / 94A3B8 / F8FAFC | table/chart labels and rows |
| `codeText` / `codeTag`                                        | E2E8F0 / F87171                            | code block syntax styling   |

All values above mirror `src/token/colors.ts`; this migration introduces no new
hex values. Multi-hue tokens are a registered capability-demo exception, not a
recommended business-deck palette.

### Approved foreground/background pairs

| Foreground / background          |   Ratio | Rule                               |
| -------------------------------- | ------: | ---------------------------------- |
| `ink` / `white`                  | 14.68:1 | body/title text                    |
| `muted` / `white`                |  4.83:1 | secondary text                     |
| `accent` / `white`               |  5.70:1 | text or graphic emphasis           |
| `white` / `darkBackground`       | 17.72:1 | dark-page title                    |
| `accentLight` / `darkBackground` |  6.51:1 | dark-page subtitle                 |
| `mutedLight` / `darkBackground`  |  6.98:1 | small dark-page page number/footer |
| `accent` / `darkBackground`      |  3.11:1 | large text/graphics only           |

Do not use `colors.muted` for 10pt text on dark pages; its measured ratio is
3.66:1 and fails normal-text AA.

## 4. Typography

### Runtime font mirror

| Token                  | Value       | Use                                                                            |
| ---------------------- | ----------- | ------------------------------------------------------------------------------ |
| `typography.font.sans` | Inter       | approved sans family; most legacy demo runs currently rely on renderer default |
| `typography.font.mono` | Courier New | code and command text                                                          |

### Runtime size mirror

| Token      |  Pt | Use                          |
| ---------- | --: | ---------------------------- |
| `display`  |  36 | cover/closing title          |
| `hero`     |  30 | shared SectionHeader         |
| `title`    |  24 | in-slide title/code emphasis |
| `subtitle` |  18 | card title/dark subtitle     |
| `heading`  |  17 | feature-card heading         |
| `lead`     |  16 | lead/body emphasis           |
| `body`     |  15 | main body                    |
| `small`    |  14 | secondary body               |
| `table`    |  13 | table cells/cover footer     |
| `caption`  |  12 | captions/details             |
| `code`     |  11 | code blocks                  |
| `tiny`     |  10 | page numbers                 |

- Weight uses `bold: boolean`; no numeric weight tokens.
- Body leading ranges from 24–32 pt where the demo intentionally shows spacing.
- Chart API label sizes use measured local literals (10/11 pt) as component
  options; they are documented demo exceptions rather than reusable text roles.

## 5. Background & accessibility

- S1/S8: `colors.darkBackground`; S2–S7: `colors.white`.
- Dark cover/closing are a deliberate role-bound treatment, not arbitrary
  slide-by-slide switching.
- Small dark-page page numbers use `colors.mutedLight`; titles/subtitles use
  `white` and `accentLight`.
- All visuals are code-native; there are no background images or external
  raster assets.
- Fictional data is labeled in notes and source mapping; it must not be
  presented as a business claim.

## 6. Layout constants & density target

- SlideBackground: first root-level slide element at x=0, y=0,
  `w="100%"`, `h="100%"`; percentage dimensions resolve against the current
  slide context. Do not place it inside a Group unless a Group-local background
  is intentional.
- Margin: 0.8 in; content width: 11.733 in.
- Shared SectionHeader: x=0.8, title y=0.6, underline y=1.4.
- Content pages: body y=2.0 to approximately 6.8.
- Cards: 0.3 in internal padding; consistent rows/columns within each page.
- PageNumber: compact 1.2 × 0.3 in box, right inset 0.8, bottom footer
  inset 0.3; coordinates derive from the current slide/Group width and height;
  type uses `typography.size.tiny`.
- Density target: general/tutorial, 25–40% Sparse; actual = 2/8 = 25%.
- Cover/closing mirror; content pages align title, margin, and page-number
  positions.

## 7. Page layout + visual mapping

| Page | Role     | Layout                | Visual type                | Slot ratio            | Sources                                                                                    | Asset status |
| ---- | -------- | --------------------- | -------------------------- | --------------------- | ------------------------------------------------------------------------------------------ | ------------ |
| S1   | Cover    | L1                    | none                       | n/a                   | `user-material:agents-guide`, `user-material:package-manifest`                             | not-needed   |
| S2   | Explain  | `V-L5-workflow-strip` | code-native cards/process  | n/a — vector groups   | `user-material:agents-guide`, `user-material:source-code`                                  | not-needed   |
| S3   | Explain  | L4                    | code-native rich text/code | n/a — vector/text     | `user-material:agents-guide`, `user-material:pptxgenjsx-docs`, `user-material:source-code` | not-needed   |
| S4   | Explain  | `V-L5-cards-4`        | code-native cards          | n/a — vector groups   | `user-material:agents-guide`, `user-material:source-code`                                  | not-needed   |
| S5   | Explain  | `V-L4-shape-gallery`  | code-native shape gallery  | n/a — vector groups   | `user-material:pptxgenjsx-docs`, `user-material:source-code`                               | not-needed   |
| S6   | Evidence | L11                   | code-native table          | n/a — editable table  | `user-material:source-code`, `user-material:pptxgenjsx-docs`                               | not-needed   |
| S7   | Evidence | L4                    | code-native bar + doughnut | n/a — editable charts | `user-material:source-code`, `user-material:pptxgenjsx-docs`                               | not-needed   |
| S8   | Closing  | L9                    | none                       | n/a                   | `user-material:agents-guide`, `user-material:package-manifest`                             | not-needed   |

## 8. Decision log & registered variants

### Registered layout variants

| Variant ID            | Parent     | Geometry                                                                          | Reason                                                                        | Slides |
| --------------------- | ---------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------ |
| `V-L5-workflow-strip` | L5 Cards-3 | three 3.6×2.2 cards in an 11.733-wide group plus a full-width process strip below | Preserve three capability cards while teaching the edit-preview-generate loop | S2     |
| `V-L5-cards-4`        | L5 Cards-3 | 2×2 grid; left width 5.6, right width 5.733, 0.4 gap, two 2.2-high rows           | Demonstrate four reusable card treatments without shrinking body type         | S4     |
| `V-L4-shape-gallery`  | L4 Split   | 8.1-wide left gallery plus 3.2-wide right column in the standard content zone     | Demonstrate several native shape properties on one capability page            | S5     |

### Demo exceptions

- Multi-hue shape/chart tokens are allowed only because S5/S7 demonstrate
  rendering capabilities; one-accent guidance remains the default for real
  business decks.
- Most prose retains the legacy renderer-default font behavior even though
  `typography.font.sans` records Inter. A new production deck should apply its
  approved family explicitly and verify delivery fallback.
- S6/S7 data is fictional and source-linked to repository code, not external
  research.
- This migration changes documentation/comments and the dark page-number token;
  it does not redesign slide geometry.

## 9. Mirror comment for `src/ppt.tsx`

```tsx
/* Design spec mirror — .deck/spec.md
   Status: confirmed (reference example, user-delegated)
   Canvas: LAYOUT_WIDE 13.333 × 7.5 — 8 slides
   Style: S8 Dev / Data — information-first
   Palette: white/light content + 18181B cover/closing; accent 7C3AED
   Fonts: Inter token / Courier New mono; legacy prose uses renderer default
   Density: tutorial 25–40% Sparse; actual 25%
   Layouts: L1, V-L5-workflow-strip, L4, V-L5-cards-4,
            V-L4-shape-gallery, L11, L4, L9
   Visuals: code-native only; no external assets
*/
```
