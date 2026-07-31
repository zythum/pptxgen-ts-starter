# Workflow 02 — Research & Enrich Content

**Goal:** make the deck substantive, not generic. Use web search to fill content
gaps: facts, data, cases, examples, and fresh context that the user did not
provide in the brief.

**When to research:** the brief lacks data/evidence; the topic benefits from
current numbers, case studies, or comparisons; the user explicitly asked to
"enrich" or "make it more substantial".

**When NOT to research:** the user provided all material and asked for layout
only; the content is internal/confidential (never leak or seek public sources
for private info).

## What to search for

| Need         | Search for                                      |
| ------------ | ----------------------------------------------- |
| Authority    | Industry reports, official stats, named experts |
| Proof        | Case studies, before/after results, benchmarks  |
| Context      | Market size, trends, competitor landscape       |
| Freshness    | Last 12 months if topic is fast-moving          |
| Alternatives | Comparisons, options, trade-offs                |

## Extract into fact cards

For each useful finding, write a compact card. **Never fabricate numbers** — if
you cannot verify a figure, omit it or mark it unverified.

```
F-1 · FACT: <one sentence, specific>
     SOURCE: <name + URL + date>
     USE: <which section/slide it could support>
```

Keep 5–15 cards. More than that is noise; less than 3 means research was thin.

## Quality rules

1. **Prefer primary sources** (official reports, original papers) over
   second-hand summaries.
2. **Cross-check key numbers** across ≥ 2 sources before putting them on a slide.
3. **Prefer recent data**; if using old data, keep the year visible.
4. **Respect copyright & confidentiality** — quote briefly, attribute, never
   copy long passages into a deck.
5. **Chinese decks**: search both Chinese and English sources when the topic is
   global; note the source language/region for numbers.

## Output — `.deck/research.md`

Save the 5–15 fact cards to `.deck/research.md` (fixed filename, project
root), numbered `F-1, F-2, …` as in the example above. Format and mandatory
fields: `workflow/00-deck-workspace.md` → `research.md`. Slide-top comments
reference these IDs (`source: F-3`), so every page can be traced back to its
evidence.

Group the cards by chapter (from `03-outline`), or by theme if the outline does
not exist yet. Pass the file to the outline stage — it becomes the evidence
backbone of each section. Keep it updated if facts change later.

## Anti-patterns

- ❌ Dumping a wall of search results onto slides.
- ❌ Using an unverified number because it "sounds right".
- ❌ Copying text verbatim from a webpage.
- ❌ Researching forever — stop once every chapter has 1–2 solid supports.
