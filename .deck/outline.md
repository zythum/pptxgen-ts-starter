# Outline

Status: confirmed
Updated: 2026-08-02
Decision authority: user-delegated

> **⚠️ EXAMPLE FILE — MUST OVERWRITE**
>
> This is a filled reference example, not active project data. Every new deck
> must replace it during stage 03. Canonical format:
> `.agents/skills/design/workflow/00-deck-workspace.md`.

## Narrative Arc

**A7. Sectioned** — a compact capability tour: opening → workflow orientation →
feature demonstrations → action. Because this is an eight-slide deck, chapters
use spoken/title transitions rather than dedicated section-divider pages.

## Density Target

General/tutorial target: **25–40% Sparse**. This deck has two Sparse pages
(S1/S8 = 25%), four Medium pages (S2–S5), and two Dense evidence pages
(S6/S7).

## Chapters & Time Budget

| Ch  | Name                   | Pages        |       Budget | Transition treatment                              |
| --- | ---------------------- | ------------ | -----------: | ------------------------------------------------- |
| 1   | Opening                | S1           |     0.75 min | Cover hands off verbally to the workflow          |
| 2   | Workflow orientation   | S2           |     1.00 min | Title-based transition; no divider page           |
| 3   | Feature demonstrations | S3–S7        |     5.25 min | Consecutive capability pages with verbal handoffs |
| 4   | Closing                | S8           |     1.00 min | Dark closing mirrors the cover                    |
|     | **Total**              | **8 slides** | **8.00 min** |                                                   |

## Page List

| Page | Role     | Core message                                                                                  | Density | Preliminary visual intent            | Source refs                                                                                |
| ---- | -------- | --------------------------------------------------------------------------------------------- | ------- | ------------------------------------ | ------------------------------------------------------------------------------------------ |
| 01   | Cover    | Native PPTX presentations can be authored with JSX and TypeScript                             | Sparse  | none; typography-led dark cover      | `user-material:agents-guide`, `user-material:package-manifest`                             |
| 02   | Explain  | The starter combines text, layout/card, and shape primitives in an edit-preview-generate loop | Medium  | code-native cards + process strip    | `user-material:agents-guide`, `user-material:source-code`                                  |
| 03   | Explain  | Text and TextRun provide independently formatted runs inside positioned text boxes            | Medium  | code-native rich text + code block   | `user-material:agents-guide`, `user-material:pptxgenjsx-docs`, `user-material:source-code` |
| 04   | Explain  | Reusable cards combine surfaces, borders, shadows, accents, and absolute-inch positioning     | Medium  | code-native 2×2 card grid            | `user-material:agents-guide`, `user-material:source-code`                                  |
| 05   | Explain  | Native shapes expose fill, transparency, stroke, dash, shadow, and corner controls            | Medium  | code-native shape gallery            | `user-material:pptxgenjsx-docs`, `user-material:source-code`                               |
| 06   | Evidence | An editable native table can render headers, banded rows, and totals from fictional data      | Dense   | code-native table                    | `user-material:source-code`, `user-material:pptxgenjsx-docs`                               |
| 07   | Evidence | Editable native charts can compare trends and part-to-whole shares from fictional data        | Dense   | code-native clustered bar + doughnut | `user-material:source-code`, `user-material:pptxgenjsx-docs`                               |
| 08   | Closing  | Fork, preview, and generate a native PPTX with three commands                                 | Sparse  | none; typography-led dark closing    | `user-material:agents-guide`, `user-material:package-manifest`                             |

## Speaker Notes

### 01 — Cover

- **Hook:** “Welcome—this entire presentation is generated from JSX and
  TypeScript.”
- **Track:** Explain that pptxgenjsx defines editable slide content and
  pptxgenjs writes the native `.pptx`; the deck itself is the demonstration.
- **Action:** Pause after “native PPTX”; use the next control or arrow key.
- **Transition:** “First, here is the workflow and the three building blocks
  this starter demonstrates.”

### 02 — Workflow orientation

- **Hook:** “The starter becomes simple when you see three primitives and one
  loop.”
- **Track:** Introduce text, layout/cards, and shapes, then follow edit → browser
  preview → generated `.pptx`.
- **Action:** Move across the three cards, then point to the bottom workflow
  strip from left to right.
- **Transition:** “We will start with the smallest content unit: a formatted
  text run.”

### 03 — Text elements

- **Hook:** “A text box can contain multiple runs, each with independent
  formatting.”
- **Track:** Contrast Text positioning/alignment with TextRun-level size, bold,
  italic, color, font, and line-break options.
- **Action:** Point from the rendered rich-text card to the matching code block.
- **Transition:** “Once text is measurable, cards give it a reusable visual
  structure.”

### 04 — Layout and cards

- **Hook:** “Cards are compositions, not a separate layout engine.”
- **Track:** Show how surfaces, borders, shadows, accent bars, and semantic
  tokens combine while every element keeps explicit inch coordinates.
- **Action:** Compare the four card treatments and call out the shared geometry.
- **Transition:** “The same native approach extends beyond containers to basic
  drawing primitives.”

### 05 — Shapes

- **Hook:** “The deck can draw its own visual language without image assets.”
- **Track:** Demonstrate Rect, Ellipse, and RoundRect fill, transparency, line,
  dash, shadow, and corner-radius controls.
- **Action:** Point to one fill, one stroked shape, and the rounded example;
  explain that the multiple hues are intentional demo coverage.
- **Transition:** “These primitives also support structured, data-driven
  components such as tables.”

### 06 — Table

- **Hook:** “This table remains native and editable in PowerPoint.”
- **Track:** Explain the header, alternating row fills, total row, and tokenized
  styling. State clearly that the quarterly values are fictional.
- **Action:** Point to the total row and the source/capability context rather
  than presenting the values as business results.
- **Transition:** “The same fictional data can also demonstrate editable chart
  components.”

### 07 — Charts

- **Hook:** “Choose chart forms by the question: compare a trend or show a
  share.”
- **Track:** Use the clustered bar chart for quarterly revenue/cost/profit and
  the doughnut for category share; both are config-driven and editable. State
  that all values are fictional.
- **Action:** Point to the Q4 bar cluster, then the largest doughnut segment.
- **Transition:** “With the components understood, only the three-command loop
  remains.”

### 08 — Closing

- **Hook:** “The fastest way to learn the starter is to change one slide.”
- **Track:** Summarize fork/clone → `npm install` → edit `src/slides/` → preview
  → `npm run generate`.
- **Action:** Invite the audience to fork the template and replace one sample
  page; pause for questions.
- **Transition:** End of deck / Q&A.

## Speaker Choreography

- Keep S1 under 45 seconds and reserve the extra time for the table/chart demo.
- On S2, optionally show the browser preview loop live; otherwise follow the
  bottom strip visually.
- On S6/S7, repeat “fictional demo data” before discussing values.
- Use verbal/title transitions instead of separate divider slides to preserve
  the eight-page pace.
- Dark S1/S8 mirror each other; S2–S7 remain light for code/data legibility.
