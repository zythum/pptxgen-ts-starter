// src/token/typography.ts — Single source of truth for this deck's typography.
// Mirrors .deck/spec.md §4. Pair with the design skill:
//   - Pick a scale from .agents/skills/design/templates-themes/typography.md,
//     then fill the keys below (semantic, self-explanatory names; `font.sans`
//     is the recommended default family — the demo deck relies on the render
//     engine's default font unless a family is declared and referenced here).
//   - Slides must use `typography.*` for fontFace / fontSize — no magic
//     numbers. `bold: true/false` is the only weight knob (pptxgenjs has no
//     numeric fontWeight) and is written directly.
//   - New sizes: update .deck/spec.md §4 first → propagate here → deck-wide.
//     Per-slide exceptions (after measurement) may inline a value + comment.
//   - Changes apply deck-wide from here; keep .deck/spec.md §4 in sync.
//
// Values below = font sizes actually used by the template demo deck
// (extracted from src/slides + components, unchanged). Naming follows the
// semantic scale in typography.md: display → hero → title → subtitle →
// heading → lead → body → small → table → caption → code → tiny.

export const typography = {
  font: {
    sans: "Inter", // headings / body (recommended default; demo deck relies on the render engine's default font)
    mono: "Courier New", // code blocks (03-text / 08-end)
  },
  size: {
    display: 36, // cover / closing main title (01 / 08)
    hero: 30, // section title (SectionHeader)
    title: 24, // in-slide title (03-text title)
    subtitle: 18, // subtitle / emphasized number (02 index, 03 label, 08)
    heading: 17, // card heading (04-layout Feature Card)
    lead: 16, // emphasized body / list items / in-slide subhead (02, 03, 05, 06, 07)
    body: 15, // body text (03 multi-line body, 02 notes)
    small: 14, // secondary body / card description (02, 04, 08)
    table: 13, // table data / footer notes (01, 06)
    caption: 12, // table details / figure captions (03, 06)
    code: 11, // code blocks (03, 08)
    tiny: 10, // page numbers (PageNumber)
  },
} as const;
