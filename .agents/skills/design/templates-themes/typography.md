# Typography

Locked in `workflow/04-spec`; applied per slide in `workflow/05-compose`.

## Font selection

- **Max 2 families per deck**: one for titles, one for body. Same family in
  different weights counts as one.
- Titles: bold or semibold, tight tracking.
- Body: regular, comfortable leading.
- Numbers: prefer tabular figures so columns of stats align.
- Chinese text: use a family with good CJK coverage (Noto Sans SC, Source Han
  Sans, PingFang SC) as primary or fallback; CJK glyphs render from the first
  family that covers them.

## Font pairs (quick reference)

| Pair        | Title                   | Body                    | Vibe                    |
| ----------- | ----------------------- | ----------------------- | ----------------------- |
| Neo-Grotesk | Inter (Bold)            | Inter (Regular)         | Default, neutral, safe  |
| Humanist    | Source Sans 3 (Bold)    | Source Sans 3 (Regular) | Warm, modern            |
| Editorial   | Playfair Display (Bold) | Inter                   | High-contrast, magazine |
| Scientific  | Inter (Semibold)        | Source Serif 4          | Academic, trustworthy   |
| Mono accent | Inter (Bold)            | JetBrains Mono          | Dev / data decks        |

### Chinese support

| Pair           | Title                      | Body                            |
| -------------- | -------------------------- | ------------------------------- |
| Sans (default) | Noto Sans SC (Bold)        | Noto Sans SC (Regular)          |
| Sans (Apple)   | PingFang SC (Semibold)     | PingFang SC (Regular)           |
| Serif accent   | Source Han Serif SC (Bold) | Noto Sans SC (Regular)          |
| Mono (dev)     | Noto Sans SC (Bold)        | JetBrains Mono / Noto Sans Mono |

## Size scale (projected, 13.333 × 7.5 in)

| Role               | Size     | Weight             | Use                       |
| ------------------ | -------- | ------------------ | ------------------------- |
| Hero / slide title | 32–44 pt | Bold               | Cover, section, statement |
| Slide title        | 24–30 pt | Bold/Semibold      | Most slides               |
| Section kicker     | 12–14 pt | Bold, letterspaced | Above titles              |
| Body               | 14–18 pt | Regular            | Content                   |
| Caption / footnote | 10–12 pt | Regular, muted     | Sources, notes            |
| Stat / KPI         | 40–60 pt | Bold, tabular      | Data slides               |

Rule of thumb: title ≈ 2× body size. If a slide has more than ~6 body lines,
cut content.

## Line height

- Body: leading ≈ 1.2–1.5× font size (`lineSpacing` / `lineSpacingMultiple`).
- CJK: 1.5× minimum, 1.6–1.8× comfortable.
- Titles: 1.0–1.1×.

## Line length

- Max ~55–65 characters per line (≈ 8–9 in at 16 pt). Longer lines defeat
  hierarchy. Multi-column layouts shorten lines automatically — prefer them for
  dense content.
- CJK: ~25–35 characters per line is comfortable.

## Practice rules

1. Left-align body; never justify mixed CJK/Latin text.
2. Center only short hero text (≤ 12 chars).
3. Italic only for quotes/book titles — not for emphasis on data.
4. Never letterspace CJK; reserve letter-spacing for Latin uppercase kickers.
5. Bold one key phrase per slide maximum — the takeaway.
6. Respect `breakLine: true` on the last `TextRun` of each line in pptxgenjsx.
7. Measure variable-length text with `scripts/estimate-text.ts` before fixing `h`.
8. Register custom fonts in `scripts/estimate-text.ts --font-file` when measuring.
9. Check real rendering in PowerPoint — font fallback differs between OS.
