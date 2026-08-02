# Typography

Typography is proposed in stage 04, mirrored to
`src/token/typography.ts`, applied in stage 05, and verified in stage 07.

## 1. Font selection

Use at most two primary families per deck: one title family and one body family.
A mono family is the second family when code/data requires it, not a free third
font. Platform/CJK fallbacks may be documented without becoming a visual style.

| Pair        | Title            | Body                                          | Best for                     |
| ----------- | ---------------- | --------------------------------------------- | ---------------------------- |
| Neo-Grotesk | Inter            | Inter                                         | Minimal, consulting, general |
| Humanist    | Source Sans 3    | Source Sans 3                                 | Warm, educational            |
| Editorial   | Playfair Display | Inter                                         | Narrative/editorial          |
| Scientific  | Inter            | Source Serif 4                                | Research/academic            |
| Mono accent | Inter            | JetBrains Mono for code/data; Inter for prose | Dev/data                     |

### CJK options

| Pair             | Title               | Body                         | Portability note                        |
| ---------------- | ------------------- | ---------------------------- | --------------------------------------- |
| CJK Sans         | Noto Sans SC        | Noto Sans SC                 | Verify/install exact files              |
| Apple CJK        | PingFang SC         | PingFang SC                  | macOS-centric; define delivery fallback |
| CJK Serif accent | Source Han Serif SC | Noto Sans SC                 | Two-family limit reached                |
| CJK Dev          | Noto Sans SC        | Noto Sans Mono for code only | Check Latin/CJK baseline                |

Never invent a font name. Record exact family/face and target environment in
spec §4.

## 2. Weight capability

pptxgenjsx/pptxgenjs uses `bold: boolean`, not numeric `fontWeight` tokens.
Use `bold: true` for emphasis. “Semibold” is only a valid specification when an
explicit installed font face reliably resolves to that weight; otherwise write
the actual supported behavior.

## 3. Semantic size ranges for 13.333 × 7.5 in

| Token role  |    Range | Typical use             |
| ----------- | -------: | ----------------------- |
| `display`   | 40–44 pt | Cover/closing title     |
| `statement` | 36–44 pt | Hero claim/quote        |
| `section`   | 32–38 pt | Section divider         |
| `title`     | 24–30 pt | Standard slide title    |
| `subtitle`  | 18–22 pt | Lead/callout            |
| `body`      | 14–18 pt | Main copy               |
| `caption`   | 10–12 pt | Source/credit/footnote  |
| `stat`      | 40–60 pt | KPI value               |
| `code`      | 11–14 pt | Code/table-like content |

Pick one exact value per used role in spec §4 and token files. Do not copy
literal sizes from layout examples. Add a new semantic role only when an
existing name would misrepresent its purpose.

Rule of thumb: a standard title is about 1.6–2× body size. If body copy exceeds
about six lines, reduce content before type size.

## 4. Line height and length

- Body: about 1.2–1.5× font size.
- CJK body: at least 1.5×; 1.6–1.8× is often comfortable.
- Display/title: about 1.0–1.15×.
- Latin body line: roughly 55–65 characters maximum.
- CJK body line: roughly 25–35 characters.

Use actual text and font with `estimate-text.ts`; these are starting ranges, not
proof of fit.

## 5. Alignment and emphasis

1. Left-align body copy; do not justify mixed CJK/Latin text.
2. Center only short hero/moment text that fits one or two lines.
3. Do not letterspace CJK; reserve tracking for short Latin uppercase kickers.
4. Use italic mainly for quotes/titles when the font supports it.
5. Limit emphasis to the core phrase; too many bold fragments erase hierarchy.
6. Use `breakLine: true` only where separate `TextRun` lines require it.
7. Use tabular figures when the chosen font/face supports them.

## 6. Measurement and portability

Before fixing a variable text box:

```bash
npx tsx scripts/estimate-text.ts -w 5.7 -f "16pt Inter" --leading 24 \
  "Actual slide text"
```

Register exact font files with `--font-file` when necessary. Measurement is a
layout estimate; final PowerPoint rendering may differ by platform and font
fallback.

Before delivery:

- verify the font in the generation environment;
- define CJK/platform fallback in spec;
- inspect the generated deck in the target PowerPoint environment when
  available;
- remeasure any text changed after QA.
