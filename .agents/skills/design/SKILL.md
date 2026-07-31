---
name: design
description: >
  Content & design methodology for presentations built with pptxgen-ts-starter.
  Use when planning deck content (clarify, research, outline, speaker notes),
  choosing style/layout/palette/typography, deciding visuals, or running
  pre-delivery quality checks. Technical line: code-generated .pptx via
  pptxgenjsx — never HTML.
metadata:
  requires:
    bins: ["tsx", "npm"]
---

# design — Content & Design Methodology

How to produce the **content** and **design** of a deck built with `pptxgen-ts-starter`.

> **Technical line (unchanged):** every deck is **code-generated `.pptx` via
> `pptxgenjsx` JSX + TypeScript** — NOT HTML, NOT screenshots, NOT image slides.
> The `pptxgenjsx` skill tells you HOW to write components; this skill tells you
> WHAT to write and WHY it looks right.

## Skill boundaries

| Concern                      | Where to look                                                |
| ---------------------------- | ------------------------------------------------------------ |
| Component API, syntax        | `.agents/skills/pptxgenjsx/` (deck, slide, text, …)          |
| Text / image / color tooling | `scripts/estimate-text.ts`, `image-tool.ts`, `color-tool.ts` |
| **Content planning**         | `workflow/01-clarify → 02-research → 03-outline`             |
| **Design decisions**         | `workflow/04-spec → 05-compose → 06-visuals → 07-qa`         |
| **Design knowledge base**    | `templates-themes/` (styles, palettes, typography, …)        |

## Two modules

```
design/
├── SKILL.md                  # Entry — scope, workflow overview, golden rules
├── workflow/                 # HOW to make a deck, step by step
│   ├── 00-deck-workspace.md  #   `.deck/` format: brief/research/outline/spec templates
│   ├── 01-clarify.md         #   Confirm requirements with the user (⛔ gate)
│   ├── 02-research.md        #   Enrich content from web search
│   ├── 03-outline.md         #   Chapters → per-slide content → speaker notes (⛔ gate)
│   ├── 04-spec.md            #   Canvas / duration / pages / style / palette / fonts (⛔ gate)
│   ├── 04b-token-files.md    #   `src/token/colors.ts` + `typography.ts` format & lifecycle
│   ├── 05-compose.md         #   Per-slide layout + typography
│   ├── 06-visuals.md         #   Visual decision: chart / stock / AI-generated image
│   └── 07-qa.md              #   Checks + second-pass review (P0–P3)
└── templates-themes/         # WHAT looks good — the designer's library
    ├── styles.md             #   Style routing by purpose & audience (dual systems)
    ├── palettes.md           #   Color roles, 60-30-10, preset palettes
    ├── typography.md         #   Size scale, line height, CJK rules
    ├── layouts.md            #   Locked layout library with coordinates
    ├── density.md            #   Text budgets, deck rhythm, white space
    └── narrative.md          #   Deck arcs + slide roles
```

## Workflow overview

Every deck passes these stages **in order**. Stages marked ⛔ require explicit
user confirmation before moving on — never assume, never skip.

| #   | Stage    | Goal                                        | Output                                               | Gate |
| --- | -------- | ------------------------------------------- | ---------------------------------------------------- | ---- |
| 1   | Clarify  | Know the topic, audience, purpose, duration | `.deck/brief.md`                                     | ⛔   |
| 2   | Research | Fill content gaps from the web              | `.deck/research.md`                                  |      |
| 3   | Outline  | Chapters → pages → speaker notes            | `.deck/outline.md`                                   | ⛔   |
| 4   | Spec     | Lock canvas, style, palette, fonts          | `.deck/spec.md` + `src/token/` (colors + typography) | ⛔   |
| 5   | Compose  | Translate pages into layout + typography    | `src/slides/*.tsx`                                   |      |
| 6   | Visuals  | Decide charts / stock / generated images    | Visual plan + assets                                 |      |
| 7   | QA       | Verify + second-pass review                 | Clean deck                                           |      |

## The `.deck/` workspace

Every deck is planned in the project-root `.deck/` directory with **fixed
filenames** (no numeric prefixes):

| File                | Written by  | Contains                                        |
| ------------------- | ----------- | ----------------------------------------------- |
| `.deck/brief.md`    | 01-clarify  | Confirmed brief (7 answers + restatement)       |
| `.deck/research.md` | 02-research | Fact cards `F-1, F-2, …` with sources           |
| `.deck/outline.md`  | 03-outline  | Chapters, per-page core messages, speaker notes |
| `.deck/spec.md`     | 04-spec     | Locked design spec (canvas/style/palette/fonts) |

**Format guidance:** the required content and template of each file is defined
in `workflow/00-deck-workspace.md` — the guidance lives in the skill.

**⚠️ The example files currently in `.deck/` are reference data ONLY. They are
NOT working documents.** For every new deck, **overwrite all four files** at
their stages (01 → `brief.md`, 02 → `research.md`, 03 → `outline.md`,
04 → `spec.md`). A file already existing in `.deck/` never means that stage is
done — writing each file is a mandatory deliverable of its stage, not a
"create if missing" step.

**Maintain `.deck/` for the whole build** — write each file at its stage and
keep it in sync when things change. **For any modification request, read
`.deck/` + the slide-top comments first and edit incrementally — never
regenerate from scratch or guess the original intent.**

## Golden rules

1. **Start from the subject, not from style.** Know what each slide says before
   choosing how it looks.
2. **One slide, one idea.** Two main points on one slide = split the slide.
3. **Design to the canvas.** Default 13.333 × 7.5 in (LAYOUT_WIDE); overflow is a defect.
4. **Lock tokens first.** Palette + fonts + layout set, then every slide follows.
   Palette values live in `src/token/colors.ts`; type scale in
   `src/token/typography.ts` (runtime single source of truth, format &
   lifecycle: `workflow/04b-token-files.md`) — slides reference
   `colors.*` / `typography.*`, never bare hex or magic numbers.
5. **Constraints are features.** One accent, ≤ 2 font families, locked layouts.
6. **Density must breathe.** Alternate dense (data) and sparse (statement/quote).
7. **Confirm, don't assume.** At ⛔ gates, stop and ask the user.
8. **Critique, then remove one thing.** Render, look, delete the least necessary.

## How to read this skill

- **Making a deck for the first time:** walk `workflow/01` → `07` in order.
- **Designing one slide:** read `templates-themes/layouts.md` + `typography.md`.
- **Choosing a look:** read `templates-themes/styles.md` → pick palette + fonts.
- **Measuring:** always use `scripts/estimate-text.ts` (text),
  `scripts/image-tool.ts` (images), and `scripts/color-tool.ts` (derived
  colors / WCAG contrast) before fixing values.
- **Modifying an existing deck:** read `.deck/` (brief/research/outline/spec)
  - the slide-top comments first, then edit incrementally.
