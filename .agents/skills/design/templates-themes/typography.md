# Typography

Typography is proposed in stage 04, mirrored to
`src/token/typography.ts`, applied in stage 05, and verified in stage 07.

## 1. Font selection

Use at most two primary families per deck: one title family and one body family.
A mono family is the second family when code/data requires it, not a free third
font. Platform/CJK fallbacks may be documented without becoming a visual style.

`serif`, `sans-serif`, and `monospace` are classification or token roles only.
PPTX does not apply CSS generic families or fallback stacks: never pass values
such as `fontFace="sans-serif"` or `fontFace="Arial, sans-serif"`. Resolve every
font token to one exact installed family name.

Choose the delivery environment before the family:

| Environment          | Latin sans / serif / mono         | Safety note                                                           |
| -------------------- | --------------------------------- | --------------------------------------------------------------------- |
| PowerPoint + Keynote | Arial / Georgia / Courier New     | High compatibility, but font versions and metrics may still differ    |
| Modern PowerPoint    | Aptos / Aptos Serif / Aptos Mono  | Office cloud fonts; requires supported Office and is not Keynote-safe |
| Managed devices      | Exact approved font files         | Install the same family, faces, and version on every target           |
| Single platform      | Windows- or macOS-native families | Use only when the delivery OS is fixed                                |

### Latin categories

| Category   | High-compatibility choices              | Managed-install choices            |
| ---------- | --------------------------------------- | ---------------------------------- |
| Sans serif | Arial; Tahoma, Trebuchet MS, or Verdana | Inter or Source Sans 3             |
| Serif      | Georgia or Times New Roman              | Playfair Display or Source Serif 4 |
| Monospace  | Courier New                             | JetBrains Mono                     |

Use managed-install choices only after verifying the exact files on the
generation, editing, and presentation devices. Office cloud availability does
not make a font available to Keynote.

### Style pairings

| Pair        | Title            | Body                                          | Best for                     |
| ----------- | ---------------- | --------------------------------------------- | ---------------------------- |
| Neo-Grotesk | Inter            | Inter                                         | Minimal, consulting, general |
| Humanist    | Source Sans 3    | Source Sans 3                                 | Warm, educational            |
| Editorial   | Playfair Display | Inter                                         | Narrative/editorial          |
| Scientific  | Inter            | Source Serif 4                                | Research/academic            |
| Mono accent | Inter            | JetBrains Mono for code/data; Inter for prose | Dev/data                     |

These pairings require a managed installation; they are design options, not
zero-install defaults.

### CJK options

There is no dependable zero-install, same-family CJK intersection across
Windows and macOS. Prefer one exact managed family for cross-platform delivery;
otherwise use a platform-native family and verify each target separately.

| Use                | Family examples                                   | Portability note                                       |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------ |
| Managed CJK sans   | Noto Sans CJK SC or Source Han Sans SC            | Install the exact selected family/files everywhere     |
| Managed CJK serif  | Noto Serif CJK SC or Source Han Serif SC          | Two-family limit is reached when paired with sans      |
| Windows-native CJK | Microsoft YaHei; SimSun for serif                 | Windows-centric; not Keynote-safe                      |
| macOS-native CJK   | PingFang SC or Hiragino Sans GB; Songti SC serif  | macOS-centric; verify the family is enabled/downloaded |
| CJK code           | A verified CJK-capable mono, or split script runs | Do not assume a Latin mono contains CJK glyphs         |

Related Noto/Source Han packages can expose different family names. Never
invent or normalize a font name: record the exact family, face, file/version,
and target environment in spec §4.

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
