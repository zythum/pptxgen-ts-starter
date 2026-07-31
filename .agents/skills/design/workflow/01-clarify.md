# Workflow 01 — Clarify Requirements

**Goal:** before writing any content or code, confirm WHAT the deck is about,
FOR WHOM, and WITH WHICH constraints. A deck built on guesses fails late; a deck
built on a confirmed brief fails early and cheaply.

**Gate ⛔:** do not start research, outline, or design until the user has
confirmed the brief (explicitly or by approving your restatement).

## The 7 questions

Ask in order. Skip only what the user already answered.

| #   | Question                                                                              | Why it matters                                            |
| --- | ------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| 1   | **Topic & core message** — what is it about, what should the audience remember?       | Defines every page's one-idea.                            |
| 2   | **Audience** — who is in the room (execs, clients, peers, students, public)?          | Sets tone, vocabulary, evidence depth.                    |
| 3   | **Purpose / scene** — pitch, review, teaching, sharing, recap?                        | Sets narrative structure and density.                     |
| 4   | **Duration** — how long is the talk?                                                  | Derives page count and depth per page.                    |
| 5   | **Style preference** — any brand style, reference deck, or aesthetic direction?       | Avoids rework; or pick from `templates-themes/styles.md`. |
| 6   | **Materials** — existing data, images, documents, or must-have content?               | Avoids re-searching what the user already has.            |
| 7   | **Hard constraints** — brand colors, template, confidential items, required sections? | Non-negotiable; violating them is fatal.                  |

## Restate, then confirm

After the answers, write a **brief** back to the user in 3–5 lines:

```
Topic:      <one line, the core message>
Audience:   <who, and what they care about>
Purpose:    <scene + outcome>
Duration:   <minutes> → target <N> slides
Style:      <style name / "let me propose one">
Materials:  <what exists / what is missing>
Constraints:<brand colors, must-cover items, exclusions>
```

Then **stop and ask**: "Is this brief correct? Anything to change?" — do not
proceed until confirmed.

## Output — `.deck/brief.md`

After the user confirms, save the confirmed brief verbatim (the 7 answers +
the restatement) to `.deck/brief.md` — fixed filename, project root. **If the
file already exists (the shipped example), overwrite it entirely with the new
deck's brief — an existing file does not mean this step is done.** Format
and mandatory fields: `workflow/00-deck-workspace.md` → `brief.md`. It is the
source of truth for content planning and for every later modification: when
the user asks to change the deck, re-read this file first.

## Handling unclear answers

- If the user has no style preference, propose **one** style from
  `templates-themes/styles.md` with a one-line rationale, and confirm it in the brief.
- If duration is unknown, ask for a rough range; fall back to ~1 min/slide.
- If materials are missing, note that research (`02`) will fill the gap.
- Never invent brand colors or required sections; ask instead.

## Anti-patterns

- ❌ Starting layout work before the brief is confirmed.
- ❌ Silently choosing a style the user later rejects.
- ❌ Assuming "make it look professional" = any default template.
- ❌ Skipping the audience question — it changes everything downstream.
