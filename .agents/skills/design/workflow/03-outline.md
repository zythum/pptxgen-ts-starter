# Workflow 03 — Outline: Chapters, Pages, Speaker Notes

**Goal:** turn the confirmed brief + research into a **page-level plan**: how to
split the topic into chapters, what each page says, and what the presenter says
while it is on screen.

**Gate ⛔:** the outline (chapter list + per-page core message) must be confirmed
by the user before design (`04`) and composition (`05`). Speaker notes can be
drafted later, but the page structure is frozen here.

## 1. Derive page count from duration

| Talk length | Target slides | Notes                           |
| ----------- | ------------- | ------------------------------- |
| 5 min       | 5–7           | 45–60 s/page, few dense pages   |
| 10 min      | 9–12          | ~1 min/page                     |
| 15 min      | 12–16         | ~1 min/page, some 1.5 min pages |
| 30 min      | 22–30         | mix of 1–1.5 min pages          |
| 45 min+     | 30–45         | add section dividers + breaks   |

Adjust by content richness: complex material gets _fewer_ pages with more time
each; a data-heavy deck can have quick KPI pages. Never hit 60+ pages in a
30-min talk.

## 2. Split into chapters (3–5 max)

Choose ONE narrative arc from `templates-themes/narrative.md` first. Then split
the topic into 3–5 chapters that follow the arc. Each chapter:

- has one verb (e.g. "Understand the problem", "See the proof", "Take the next step")
- opens with a **section divider** page
- ends with a mini-conclusion that hands off to the next chapter

## 3. Assign one page per idea

For every page, write its **core message in one sentence** — the sentence the
audience should remember from that page. Rules:

- One idea per page. If a page needs two core sentences, split it.
- Assign a **slide role** from `templates-themes/narrative.md` (Cover, Section,
  Statement, Explain, Evidence, Contrast, Process, Moment, Closing).
- A page with no role is a page to delete.
- Reserve ~1/3 of pages as intentionally sparse (statements, quotes, moments).

```
Outline format:
01 Cover        — <title>, <speaker>                        [role: Cover, sparse]
02 Section 01   — Chapter divider: <name>                   [role: Section]
03 Explain      — <core message sentence>                   [role: Explain]
04 Evidence     — <core message + which stat/case>          [role: Evidence, dense]
...
```

## 4. Speaker notes (the presentation script)

For each page, write 3–6 short lines of **Notes** content — what the presenter
says, not what is on the slide. Include:

- **Hook line** — the first sentence that frames the page.
- **Talk track** — what to say; the slide is the summary, the notes are the story.
- **Transition** — one line connecting to the previous/next page.
- **Presenter actions** — pointers: "point at the chart", "pause 2s after the
  stat", "ask the audience", "walk to the other side".

Example (`<Notes>` in pptxgenjsx):

```tsx
<Notes>
  Hook: "Before we look at the numbers, one question — how fast is the market growing?" Track: walk
  through the two KPIs; the 41% figure is the punchline — pause after it. Action: point at the right
  chart column while saying the number. Transition: "That growth is why the next section is about
  our response."
</Notes>
```

## 5. Presenter choreography

The outline should also note, once per chapter:

- Where to **pause** for questions or emphasis.
- Where to **interact** (poll, ask, demo) — put it on the notes of that page.
- Rough **time budget** per chapter (e.g. Ch1 3 min, Ch2 5 min, …) so the talk
  stays on time; total must equal the confirmed duration.

## Output & gate

Produce the outline + per-page notes. Present it to the user:

- Chapters with names + time budgets
- Page list with role + one-sentence core message
- Note the intended dense/sparse rhythm

**Stop and ask** for confirmation. Do not proceed to design until the page
structure is accepted.

After confirmation, save the full outline — chapters + time budgets, page list
with roles + one-sentence core messages, speaker notes, choreography — to
`.deck/outline.md` (fixed filename, project root). **If the file already
exists (the shipped example), overwrite it entirely with the new deck's
outline — an existing file does not mean this step is done.** Format and
mandatory fields: `workflow/00-deck-workspace.md` → `outline.md`. It is the
contract for composition (`05`) and the reference for any later page-level
modification.
