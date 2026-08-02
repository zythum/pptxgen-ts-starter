# Workflow 02 — Research & Enrich Content

## Contract

**Inputs:** confirmed brief and supplied materials.
**Decision:** `completed` external research or explicit `not-needed`.
**Output:** `.deck/research.md` in one valid branch.
**Gate:** none; follow user confidentiality/search constraints.
**Validation:** every external claim has a resolvable fact card; user materials
have stable IDs.
**Resume:** read status, reason, user-material IDs, and fact cards.

## 1. Choose the branch

### Research (`Status: completed`)

Use external research when the deck lacks evidence, benefits from current data,
or the user asks for enrichment.

Search for:

| Need         | Preferred target                                     |
| ------------ | ---------------------------------------------------- |
| Authority    | Official statistics, standards, original reports     |
| Proof        | Primary case studies and measured outcomes           |
| Context      | Market/trend/competitor data with geography and date |
| Alternatives | Explicit trade-offs and comparison criteria          |
| Freshness    | Recent sources for fast-moving topics                |

### No research (`Status: not-needed`)

Use this branch when:

- user materials fully support the deck;
- the task is layout-only;
- content is confidential and external search is inappropriate;
- the user prohibited external research.

Do not search private content or create filler fact cards to satisfy a quota.

## 2. Register supplied materials

Assign stable IDs even when no web research occurs:

```md
- user-material:q2-metrics — Q2 metrics spreadsheet supplied by the user
- user-material:brand-guide — Brand PDF supplied by the user
```

Slides cite these IDs when facts come from user materials.

## 3. Create external fact cards

```md
F-1 · FACT: <one specific, verifiable sentence>
SOURCE: <publisher>, <title>, <publication date>, <URL>, accessed <date>
USE: <chapter/page>
```

Rules:

1. Prefer primary sources; label secondary summaries honestly.
2. Cross-check decision-critical numbers with two independent sources when
   practical; keep both IDs.
3. Preserve year, geography, unit, denominator, and methodology caveats.
4. Quote briefly, attribute, and do not copy long passages.
5. For global Chinese decks, search relevant Chinese and English sources and
   state region/language limitations.
6. Never mark a third-party palette or article as “official” without an
   official source.

Use 5–15 cards as a working range, not a quota. Stop when every evidence-bearing
section has sufficient support.

## 4. Write `.deck/research.md`

Use the completed or not-needed schema in `00-deck-workspace.md`. Group fact
cards by theme until the outline exists, then by chapter. Keep IDs stable during
edits; add new IDs rather than renumbering cited cards.

## Anti-patterns

- Blank `research.md` with no status or reason.
- Researching confidential/internal facts on the public web.
- A slide citation that points only to `outline.md`.
- Missing publication/access dates or source ownership.
- Renumbering cards without updating all references.
