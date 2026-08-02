# Workflow 00 — The `.deck/` Workspace (Canonical Format)

**Purpose:** define the four planning files that drive a deck and preserve its
intent for later edits. The shipped files are examples, not active project
state.

## Fixed files and lifecycle

| File                | Written by  | Valid status              | Purpose                                         |
| ------------------- | ----------- | ------------------------- | ----------------------------------------------- |
| `.deck/brief.md`    | 01 Clarify  | `confirmed`               | Content authority and delegation record         |
| `.deck/research.md` | 02 Research | `completed`, `not-needed` | Evidence or explicit no-research decision       |
| `.deck/outline.md`  | 03 Outline  | `confirmed`               | Page contract, notes, preliminary visual intent |
| `.deck/spec.md`     | 04 Spec     | `confirmed`               | Approved design system, layout/visual mapping   |

Rules:

- Keep exactly these four filenames; no numeric prefixes, versions, or fifth
  planning file.
- Replace shipped examples for every new deck.
- Update affected files whenever content or design changes; stale planning
  files are a defect.
- On an existing-deck request, read all four files and relevant slide-top
  comments before editing. Reopen only affected gates.
- `confirmed` means either explicit user approval or explicit delegated
  authority documented in `brief.md`; it never means silent assumption.

## Common metadata header

Each file begins with:

```md
Status: confirmed | completed | not-needed
Updated: YYYY-MM-DD
Decision authority: user-confirmed | user-delegated | workflow-decision
```

Use only status values permitted by that file's table above.

## Traceability chain

| Identifier           | Defined in                      | Referenced by                         |
| -------------------- | ------------------------------- | ------------------------------------- |
| `F-N` external fact  | `research.md`                   | outline source refs + slide `sources` |
| `user-material:<id>` | `research.md` user materials    | outline source refs + slide `sources` |
| Slide role           | `outline.md`                    | spec mapping + slide `role`           |
| Layout ID            | `layouts.md` or spec §8 variant | spec mapping + slide `layout`         |
| Visual decision      | outline page row + spec §7      | slide `visual` and `asset`            |
| Palette/type roles   | spec §3/§4                      | runtime token files                   |

A slide may cite multiple comma-separated sources. Every source ID must resolve;
external claims never point only to `outline.md`.

Canonical slide comment:

```ts
// slide: 03 | role: Evidence | layout: L10 | core: Growth is concentrated in one segment | sources: F-3,F-4 | visual: chart/bar | asset: none
```

Use `sources: none` only for original framing, transitions, or non-factual
statements. Use `asset: none` for code-native charts/tables and text-only pages.

## `brief.md` schema

```md
# Deck Brief

Status: confirmed
Updated: YYYY-MM-DD
Decision authority: user-confirmed | user-delegated

## Execution Mode

<new-interactive | new-delegated | existing-edit | single-slide | layout-only>

## The 7 Questions

1. **Topic & core message** — ...
2. **Audience** — ...
3. **Purpose / context** — ...
4. **Duration** — ... → target N slides
5. **Style preference** — ...
6. **Materials** — ...
7. **Hard constraints** — ...

## Delegation & Assumptions

<what the user delegated; assumptions approved or none>

## Brief Restatement

...
```

Mandatory: all known answers; explicit unknowns; mode; authority; restatement.
If delegated, record the exact scope. Do not invent brand constraints.

## `research.md` schema

### Completed branch

```md
# Research

Status: completed
Updated: YYYY-MM-DD
Decision authority: workflow-decision
External search performed: yes

## User Materials

- user-material:brief-data — <description/location>

## Fact Cards

F-1 · FACT: <specific, verifiable sentence>
SOURCE: <publisher, title, publication date, URL, accessed date>
USE: <chapter/page>
```

Each completed fact card requires `FACT`, `SOURCE`, and `USE`. Prefer 5–15
cards, but stop when each evidence-bearing section is supported; quality beats
a quota.

### Not-needed branch

```md
# Research

Status: not-needed
Updated: YYYY-MM-DD
Decision authority: workflow-decision
External search performed: no
Reason: <materials complete | layout-only | confidential | user prohibited search>

## User Materials

- user-material:<id> — <description/location>

## Fact Cards

None.
```

A `not-needed` file is a valid completed stage. Never search confidential
content merely to satisfy a count.

## `outline.md` schema

```md
# Outline

Status: confirmed
Updated: YYYY-MM-DD
Decision authority: user-confirmed | user-delegated

## Narrative Arc

<arc + rationale>

## Density Target

<general/narrative 25–40% sparse | executive/data-heavy 15–25% | custom>

## Chapters & Time Budget

| Ch | Name | Pages | Budget | Transition treatment |

## Page List

| Page | Role | Core message | Density | Preliminary visual intent | Source refs |

## Speaker Notes

### 01 — <name>

- Hook:
- Track:
- Action:
- Transition:

## Speaker Choreography

...
```

The outline gate approves chapters, page order, roles, messages, timing, and
preliminary visual intent. After approval, complete all four notes fields before
composition. Short decks may use non-page transitions instead of section
slides; record that choice.

## `spec.md` schema

```md
# Design Spec

Status: confirmed
Updated: YYYY-MM-DD
Decision authority: user-confirmed | user-delegated

## 1. Canvas & page count

## 2. Style

## 3. Palette

## 4. Typography

## 5. Background & accessibility

## 6. Layout constants & density target

## 7. Page layout + visual mapping

## 8. Decision log & registered variants

## 9. Mirror comment for src/ppt.tsx
```

Mandatory:

- canvas enum, dimensions, approved page count;
- style ID and rationale;
- palette role table, allowed foreground/background combinations, and any
  fill-only accent restriction;
- font families, semantic type scale, line-height rules, and delivery fallback;
- background, layout constants, approved density target;
- page mapping with role, layout, visual type, slot ratio, source/asset status;
- every exception and registered layout variant in §8;
- concise mirror comment for `src/ppt.tsx`.

`spec.md` is written only after approval. Then mirror §3/§4 into
`src/token/colors.ts` and `src/token/typography.ts` according to
`04b-token-files.md`.

## Change propagation

| Change                  | Update order                                        |
| ----------------------- | --------------------------------------------------- |
| Topic/audience/duration | brief → outline → spec page count → affected slides |
| Add/remove/reorder page | outline → spec §7 → ppt composition → comments      |
| Palette/font/background | spec proposal + approval → token files → render QA  |
| One slide's content     | outline entry → slide/comment → sources if factual  |
| Data/fact               | research → outline refs → slide/comment             |
| Visual/asset            | outline intent → spec §7/§8 → asset → slide/comment |
| New layout              | spec §8 registration → spec §7 → slide/comment      |

## Anti-patterns

- Numeric `.deck/` filenames or extra planning files.
- Treating shipped examples or file existence as completion.
- Writing `confirmed` without approval or recorded delegation.
- Leaving `research.md` blank instead of using the `not-needed` schema.
- Citing an unresolved fact, asset, or layout ID.
- Updating code while `.deck/` documents retain the old decision.
