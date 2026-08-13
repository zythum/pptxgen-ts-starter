---
name: design
version: 1.4.0
description: >
  Content and design methodology for presentations built with
  pptxgen-ts-starter. Use for deck planning, research, narrative, speaker
  notes, style/layout/palette/typography decisions, visuals, and pre-delivery
  QA with structured layout audit and constrained repair. Technical line:
  code-generated .pptx via pptxgenjsx — never HTML.
metadata:
  requires:
    bins: ["npm", "rg"]
---

# design — Content & Design Methodology

Produce the **content** and **design** of a deck built with
`pptxgen-ts-starter`.

> **Technical line:** every deck is a code-generated, editable `.pptx` built
> with `pptxgenjsx` JSX + TypeScript — never deliver HTML, slide screenshots,
> or image-only slides as the presentation. Verified screenshots may be embedded
> as assets inside otherwise editable slides. The `pptxgenjsx` skill explains
> component APIs; this skill defines what to communicate, how to design it, and
> how to verify the result.

## Skill boundaries

| Concern                  | Where to look                                                |
| ------------------------ | ------------------------------------------------------------ |
| Component API and syntax | `.agents/skills/pptxgenjsx/`                                 |
| Text/image/color tools   | `scripts/estimate-text.ts`, `image-tool.ts`, `color-tool.ts` |
| Planning                 | `workflow/01-clarify.md` → `03-outline.md`                   |
| Design system            | `workflow/04-spec.md` + `04b-token-files.md`                 |
| Slide execution          | `workflow/05-compose.md` with `06-visuals.md` preflight      |
| Delivery review          | `workflow/07-qa.md`: layout audit, constrained repair, Gate  |
| Image content sidecars   | `references/asset-metadata.md`                               |
| Canonical QA checklist   | `references/qa/checklist.md`                                 |
| Design knowledge         | `templates-themes/`                                          |

## Structure

```text
design/
├── SKILL.md
├── workflow/
│   ├── 00-deck-workspace.md
│   ├── 01-clarify.md
│   ├── 02-research.md
│   ├── 03-outline.md
│   ├── 04-spec.md
│   ├── 04b-token-files.md
│   ├── 05-compose.md
│   ├── 06-visuals.md
│   └── 07-qa.md
├── references/
│   ├── asset-metadata.md
│   └── qa/checklist.md
└── templates-themes/
    ├── styles.md
    ├── palettes.md
    ├── typography.md
    ├── layouts.md
    ├── density.md
    └── narrative.md
```

## Choose an execution mode first

Do not force a full new-deck workflow onto every request.

| Mode                   | Use when                                          | Gate behavior                                                      |
| ---------------------- | ------------------------------------------------- | ------------------------------------------------------------------ |
| New deck · interactive | Requirements are incomplete or brand risk is high | Confirm brief, outline, and spec separately                        |
| New deck · delegated   | User explicitly delegates design decisions        | Record delegation and assumptions; gates may be combined or waived |
| Existing deck edit     | `.deck/` and slides already exist                 | Read `.deck/` + slide comments; reopen only affected gates         |
| Single-slide task      | One page is added or changed                      | Reuse confirmed spec; update affected outline/spec entries only    |
| Layout-only            | Content is supplied and must not change           | Mark research `not-needed`; preserve supplied meaning              |

A gate may be waived only by explicit user delegation recorded in
`.deck/brief.md`. Silence is not delegation.

## Workflow state machine

Each stage must be **handled**, but its decision may be `completed` or
`not-needed` where the stage contract allows it. Read
`workflow/00-deck-workspace.md` for canonical file schemas and status values.

| #   | Stage    | Required result                                           | Gate                |
| --- | -------- | --------------------------------------------------------- | ------------------- |
| 1   | Clarify  | Confirmed brief or recorded delegation                    | ⛔ unless delegated |
| 2   | Research | Fact cards, or explicit `not-needed` record               | —                   |
| 3   | Outline  | Confirmed chapters/pages/roles; then complete notes       | ⛔ unless delegated |
| 4   | Spec     | Proposal → approval → write spec and token mirrors        | ⛔ unless delegated |
| 5   | Compose  | Per-page visual preflight, locked layout, measured TSX    | —                   |
| 6   | Visuals  | Decision/assets/provenance used by stage 05               | coupled with 05     |
| 7   | QA       | P0/P1 clean; layout audit/repair and second pass complete | delivery gate       |

### The 05/06 coupling

The filenames stay numbered for stable references, but 05 and 06 are not a
waterfall where imagery is added after layout. For **each page**:

1. read its outline entry;
2. execute the decision tree in `06-visuals.md`;
3. lock visual type, source, slot ratio, and asset status;
4. choose the layout and coordinates in `05-compose.md`;
5. implement and measure the slide.

No visual-dependent coordinates are finalized before step 2.

## The `.deck/` workspace

The project-root `.deck/` directory has exactly four fixed files, with no
numeric prefixes or version suffixes:

| File                | Owner       | Status                      |
| ------------------- | ----------- | --------------------------- |
| `.deck/brief.md`    | 01 Clarify  | `confirmed`                 |
| `.deck/research.md` | 02 Research | `completed` or `not-needed` |
| `.deck/outline.md`  | 03 Outline  | `confirmed`                 |
| `.deck/spec.md`     | 04 Spec     | `confirmed`                 |

The shipped `.deck/` files are examples only. A new deck replaces their
content at the appropriate stage. Existing files never prove a stage is done;
check the status and content.

Maintain all four files for the life of the deck. For an edit, read them and
the slide-top comments first, then update incrementally. Never regenerate an
existing deck from assumptions.

## Golden rules

1. **Subject before style.** Define each page's message before its appearance.
2. **One slide, one idea.** Split competing core messages.
3. **Design to the canvas.** Default `LAYOUT_WIDE` is 13.333 × 7.5 in.
4. **Approval before mutation.** Do not write spec, tokens, or slide code before
   the applicable gate unless the user delegated that decision.
5. **Tokens are runtime truth.** Slides/components use `colors.*` and
   `typography.*`; no bare hex or unexplained magic type values.
6. **No invented hex.** Use a preset/source token or derive with
   `scripts/color-tool.ts`, then register a semantic token.
7. **Controlled layouts.** Prefer core layouts; register a justified variant
   before use.
8. **Visuals are structural.** Decide visual type and ratio before coordinates.
9. **Density is intentional.** Lock a target range in spec; do not use a
   universal sparse-slide quota.
10. **Critique, then remove one thing.** Render, inspect, simplify, re-check.

## Reading paths

- New deck: `workflow/00-deck-workspace.md`, then stages 01 → 07.
- One slide in an existing deck: first read all four `.deck/` files and the
  target slide comment; then use `workflow/05-compose.md`,
  `workflow/06-visuals.md`, `templates-themes/layouts.md`, and
  `templates-themes/typography.md`.
- New standalone slide without `.deck/`: run the minimum Clarify/Spec path or
  record explicit delegation before initializing the four planning files.
- Look and feel: `templates-themes/styles.md` →
  `templates-themes/palettes.md` + `templates-themes/typography.md`.
- Existing deck edit: `.deck/` + slide comments, then only affected workflow.
- Final review: `workflow/07-qa.md` + `references/qa/checklist.md`.
