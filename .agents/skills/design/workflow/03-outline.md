# Workflow 03 — Outline: Chapters, Pages, Notes

## Contract

**Inputs:** confirmed brief and research in `completed` or `not-needed` state.
**Decision:** narrative arc, chapters, page roles/messages, timing, density
range, and preliminary visual intent.
**Output:** confirmed `.deck/outline.md` with complete speaker notes.
**Gate:** approve chapter/page structure before final notes and design spec;
may be waived only by recorded delegation.
**Validation:** time totals match duration; each page has one role/message;
every factual page has source refs.
**Resume:** read page order, core messages, source refs, visual intent, notes.

## 1. Derive page count

| Talk length | Starting range | Guidance                              |
| ----------- | -------------- | ------------------------------------- |
| 5 min       | 5–7            | Few or no dedicated divider pages     |
| 10 min      | 9–12           | About one minute per page             |
| 15 min      | 12–16          | Mix of quick and deeper pages         |
| 30 min      | 22–30          | Allow section resets and interactions |
| 45 min+     | 30–45          | Add breaks; avoid continuous density  |

Adjust for complexity and reading mode. Complex material generally needs more
speaking time per page, not smaller text.

## 2. Choose one narrative arc

Select one arc from `templates-themes/narrative.md` and state why it fits the
purpose and audience. Do not combine arcs without documenting the deliberate
exception.

Use 3–5 chapters for a substantial deck. Give each chapter an action-oriented
name and a clear handoff to the next.

### Section divider rule

- Decks with 12+ pages or a Sectioned arc normally use dedicated L2 divider
  pages.
- Short decks may use a title kicker, background change, or spoken transition
  instead.
- Record the chosen transition treatment and whether divider pages count toward
  the page total.

## 3. Define one page per idea

Every page gets:

- one role from `narrative.md`;
- one sentence that states the audience takeaway;
- density: Sparse, Medium, or Dense;
- preliminary visual intent: none, chart, table, photo, screenshot,
  illustration, diagram, or undecided;
- source refs: `F-N`, `user-material:<id>`, or `none`.

Use the density target appropriate to the deck:

- general/narrative: 25–40% sparse;
- executive/data-heavy: 15–25% sparse;
- custom: explain why.

These are ranges, not quotas. Lock the final target in `spec.md`.

## 4. Present the outline Gate

Present:

- narrative arc and rationale;
- chapters and time budgets;
- ordered page list with role and core message;
- density target and transition treatment;
- preliminary visual intent for pages where it affects structure.

In interactive mode, stop for approval. In delegated mode, record the authority
and assumptions. The Gate approves structure, not pixel-level layout.

## 5. Complete speaker notes after approval

Before composition, every page needs 3–6 concise lines covering:

- **Hook** — first framing sentence;
- **Track** — explanation not duplicated on-screen;
- **Action** — pause, point, ask, demo, or movement;
- **Transition** — connection to the next page.

When writing the final PPTX, keep the notes inline on the slide and use the
`text` prop so line breaks survive formatting. Use bracketed plain-text labels;
PowerPoint does not render Markdown, so the brackets are intentional text:

```tsx
<Notes
  text={`[Hook]
First framing sentence.

[Track]
Explanation that is not duplicated on-screen.

[Action]
Pause, point, ask, demo, or movement cue.

[Transition]
Connection to the next page.`}
/>
```

Do not place all four labels in one JSX child paragraph. A shared Notes wrapper
is optional and should not be introduced unless the project explicitly wants
that abstraction.

Also add chapter-level choreography and time checks. The sum of chapter budgets
must equal the confirmed duration.

## 6. Write `.deck/outline.md`

After approval/delegation and note completion, write the canonical schema from
`00-deck-workspace.md` with `Status: confirmed`. Composition must follow this
page contract; changes update the outline first.

## Anti-patterns

- Two core messages on one page.
- Forcing divider pages into a short deck.
- Using a fact without an `F-N` or user-material reference.
- Treating preliminary visual intent as final asset approval.
- Starting design before the outline Gate or recorded delegation.
- Leaving notes incomplete when composition begins.
