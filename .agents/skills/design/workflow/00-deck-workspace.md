# Workflow 00 — The `.deck/` Workspace (Canonical Format)

**Purpose:** `.deck/` is the per-deck working directory at the project root. It
holds the four planning documents that drive the build and act as the source of
truth for every later modification. This file defines the **required content
and format** of each document.

**⚠️ The `.deck/` directory currently holds filled EXAMPLE files (reference
data — what a finished result looks like). Every new deck MUST overwrite them
at their stages; their presence never means the work is done.**

## Files & lifecycle

| File                | Written by  | When                | Purpose                                          |
| ------------------- | ----------- | ------------------- | ------------------------------------------------ |
| `.deck/brief.md`    | 01-clarify  | after user confirms | Locked brief; source of truth for content        |
| `.deck/research.md` | 02-research | after research      | Fact cards `F-1…`; evidence backbone             |
| `.deck/outline.md`  | 03-outline  | after user confirms | Chapters, pages, speaker notes; compose contract |
| `.deck/spec.md`     | 04-spec     | after user confirms | Locked design tokens; mirrored to `src/ppt.tsx`  |

Rules:

- **Fixed filenames** — `brief.md`, `research.md`, `outline.md`, `spec.md`;
  no numeric prefixes, no version suffixes. Location: project-root `.deck/`.
- **A new deck overwrites the example files** — the four files currently in
  `.deck/` are examples; each stage must replace its file with the new deck's
  content. Never leave example content in a real deck's workspace.
- **Written once, kept in sync** — each file is created at its stage and
  updated whenever the deck changes; stale `.deck/` files are a defect.
- **Modification flow** — for any change request, read `.deck/` + the slide-top
  comments first, edit incrementally, and update the affected `.deck/` files.
  Never regenerate the deck from scratch or guess the original intent.

## Cross-reference rules (traceability)

The four files + slide-top comments form one traceability chain:

| Reference                                | Where it appears                            | Links to                    |
| ---------------------------------------- | ------------------------------------------- | --------------------------- |
| Fact card `F-N`                          | `research.md` card IDs                      | slide-top `source: F-N`     |
| Layout ID (`L1–L9`, registered variants) | `spec.md` §7 mapping, slide-top comment     | `layouts.md` locked set     |
| Slide role                               | `outline.md` page list                      | `narrative.md` roles table  |
| Palette / style                          | `spec.md` §2–§3 (+ `src/token/colors.ts`)   | `styles.md` / `palettes.md` |
| Runtime colors                           | `src/token/colors.ts` (mirrors spec §3)     | `spec.md` §3 role table     |
| Runtime typography                       | `src/token/typography.ts` (mirrors spec §4) | `spec.md` §4 type scale     |

If a slide-top comment cites a fact, that fact must exist in `research.md`.
If a page uses a layout, that layout must be in the locked set or registered
in `spec.md` §8. The runtime mirrors of §3/§4 (`src/token/colors.ts`,
`src/token/typography.ts`) have their own format & lifecycle spec:
`workflow/04b-token-files.md`.

## `brief.md` — required structure

```
# Deck Brief

## The 7 Questions
1. **Topic & core message** — <topic + the one thing to remember>
2. **Audience** — <who + what they care about>
3. **Purpose / context** — <scene + outcome>
4. **Duration** — <minutes> → derive page count (see outline)
5. **Style preference** — <chosen or "unspecified → propose X (rationale), awaiting confirmation">
6. **Materials** — <existing materials / gaps>
7. **Hard constraints** — <brand colors, must-cover, exclusions>

## Brief Restatement (Confirmed)
Topic:      <one line>
Audience:   <who + their concern>
Purpose:    <scene + outcome>
Duration:   <minutes> → target <N> slides
Style:      <style name / "let me propose one">
Materials:  <exists / missing>
Constraints:<non-negotiables>

> ⛔ Locked after confirmation; proceed to workflow/02-research.md.
```

Mandatory fields: all 7 answers + the confirmed restatement + the lock marker.
Style choices must name the style ID from `styles.md` (or explicitly say
"proposed, awaiting confirmation").

## `research.md` — required structure

```
# Research

## Content Sources   <optional — a note on search scope / source quality / branch rationale>

## Fact Cards
F-1 · FACT: <one sentence, specific, verifiable>
     SOURCE: <name + URL + date>
     USE: <section/slide it supports>
F-2 · …
```

Mandatory fields per card: `FACT` (one sentence), `SOURCE` (name + URL + date),
`USE` (which chapter/slide). 5–15 cards; numbering continuous `F-1, F-2, …`.
Group cards by chapter when the outline exists, by theme otherwise. Never
fabricate numbers — omit or mark unverified.

## `outline.md` — required structure

```
# Outline

## Narrative Arc
<arc name from narrative.md> — <one-line rationale>

## Chapters & Time Budget (total = confirmed duration)
| Ch | Name | Pages | Budget | Content |

## Page List (role + one-sentence core message)
01 <Role> — <core message sentence>   [role: <Role>, <density>]
…

## Speaker Notes (per page: Hook / Track / Action / Transition)
## Speaker Choreography
```

Mandatory: arc + rationale; chapter table with time budgets summing to the
confirmed duration; page list with role + one-sentence core message per page;
speaker notes with the four-part marker (Hook / Track / Action / Transition);
choreography notes (pauses, interactions, per-chapter time). The page list is
the compose contract — composition follows it page by page.

## `spec.md` — required structure

```
# Design Spec

## 1. Canvas & page count   <layout enum + size; pages derived from outline>
## 2. Style                 <style ID + one-line rationale>
## 3. Palette               <role table: Role | Hex | usage>
## 4. Typography            <font pair + size scale + line heights>
## 5. Background            <light/dark + contrast notes>
## 6. Layout constants      <margin, content area, header position, card geometry>
## 7. Layout mapping        <table: page | layout ID | note>
## 8. Design decision log   <registered variants, exceptions, rationale>
## 9. Mirror comment        <comment block for src/ppt.tsx top>
```

Mandatory: canvas enum + page count; one style ID from `styles.md`; palette
role table with hex values (no `#`); font pair from `typography.md`; background
decision; layout mapping to locked layouts (IDs `L1–L9` or registered variants
recorded in §8); the mirror comment block. §8 records every deviation — a
layout outside the locked set must be **registered here** before use.

## When to update which file

| Change requested                    | Update order                                                                      |
| ----------------------------------- | --------------------------------------------------------------------------------- |
| Topic / audience / duration changes | `brief.md` → redo `outline.md` (+ `spec.md` page count)                           |
| Add / remove / reorder pages        | `outline.md` → `spec.md` §7 → compose → slide comments                            |
| Change palette / fonts / background | `spec.md` first → `src/token/colors.ts` / `typography.ts` → propagate to slides   |
| Edit one slide's content            | read slide-top comment + `outline.md` entry → edit slide → sync both              |
| Change data / facts                 | `research.md` → affected slides (`source: F-N`) → `outline.md` if message changed |

## Anti-patterns

- ❌ Numeric prefixes (`01-brief.md`) or extra files that split one document.
- ❌ Skipping a `.deck/` write because the file already exists — the example
  files must be overwritten for every new deck.
- ❌ Re-writing `.deck/` from memory at modification time — it is the memory.
- ❌ A slide-top comment citing `F-N` or a layout that does not exist in `.deck/`.
- ❌ Deleting `.deck/` after delivery — modification requests are the norm.
