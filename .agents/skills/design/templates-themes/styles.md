# Styles — Route Style by Purpose & Audience

Pick ONE style per deck in `workflow/04-spec`. This file is the designer's
reference: how to choose, and what each style prescribes.

## Dual system (inspired by guizang-ppt-skill)

Before picking a named style, choose the **system** that matches the content:

| System                | Content type                                | Visual DNA                                                     |
| --------------------- | ------------------------------------------- | -------------------------------------------------------------- |
| **Information-first** | Facts, data, methods, analysis, reviews     | Grid, Swiss order, big numbers, restraint, one accent          |
| **Narrative-first**   | Stories, culture, opinions, people, moments | Editorial magazine feel, serif headlines, white space, imagery |

Information-first decks answer "what's true"; narrative-first decks answer
"why it matters". Pick one — mixing systems mid-deck looks incoherent.

## Style catalog

Each style lists: best for → palette → fonts → layout tendencies → notes.

### 1. Minimal Light (default, information)

- Best for: internal sharing, teaching, general purpose
- Palette: `Light Professional` (FAFAFA / 1F2937 / accent 7C3AED)
- Fonts: Inter / Inter
- Layouts: L1 Cover, L2 Section, L3 Statement, L6 Stats, L9 Closing
- Notes: the safe default; never wrong, never exciting

### 2. Dark Premium (information)

- Best for: product demos, tech talks, evening keynotes
- Palette: `Dark Premium` (18181B / accent 8B5CF6)
- Fonts: Inter / Inter, maybe Mono accent for code
- Layouts: L1 Cover, L3 Statement, L6 Stats, L8 Quote, L9 Closing
- Notes: use dark backgrounds sparingly; keep body text off accent

### 3. Consulting / Executive (information)

- Best for: board reviews, proposals, investor updates (McKinsey DNA)
- Palette: `Consulting` (FFFFFF / accent 2251FF — McKinsey Primary Blue)
- Fonts: Inter / Inter
- Layouts: L2 Section, L3 Statement, L4 Split, L5 Cards, L6 Stats, L9 Closing
- Notes: conclusion-first (Answer Pyramid), one insight per page,
  heavy on tables/numbers, no decoration

### 4. Editorial (narrative)

- Best for: culture, industry stories, opinion pieces
- Palette: `Editorial` (FDFCF3 / accent FFC500)
- Fonts: Playfair Display / Inter
- Layouts: L1 Cover, L3 Statement, L4 Split, L8 Quote, L9 Closing
- Notes: serif headlines, big quotes, generous white space, magazine rhythm

### 5. Vibrant Startup (narrative/info hybrid)

- Best for: product launches, startup pitches, community events
- Palette: `Vibrant` (FFFFFF / accent 7C3AED, primary 1E1B4B)
- Fonts: Inter / Inter
- Layouts: L1 Cover, L3 Statement, L5 Cards, L6 Stats, L8 Quote, L9 Closing
- Notes: energetic but keep one accent; restraint beats fireworks

### 6. Natural Warm (narrative)

- Best for: wellbeing, education, social, human stories
- Palette: `Natural` (FAFAF9 / accent 4D7C0F)
- Fonts: Source Sans 3 / Source Sans 3
- Layouts: L1 Cover, L3 Statement, L4 Split, L5 Cards, L8 Quote, L9 Closing
- Notes: rounded feel, warm neutrals, friendly tone

### 7. Scientific (information)

- Best for: research, academic, engineering reviews
- Palette: `Consulting` or `Minimal Light`
- Fonts: Inter / Source Serif 4 (body serif signals scholarship)
- Layouts: L2 Section, L4 Split, L6 Stats, L7 Timeline (+ tables/charts)
- Notes: dense is OK if structured; cite sources on-slide (caption)

### 8. Dev / Data (information)

- Best for: engineering talks, data analysis, tooling
- Palette: `Dark Premium` or `Minimal Light`
- Fonts: Inter / JetBrains Mono (code + tabular stats)
- Layouts: L1 Cover, L3 Statement, L6 Stats, L7 Timeline (+ code/charts)
- Notes: tabular numbers everywhere, code samples in mono, no clip-art

## Choosing table

| If the deck is…            | Choose                           |
| -------------------------- | -------------------------------- |
| For executives / investors | Consulting (3)                   |
| A product demo             | Dark Premium (2) or Vibrant (5)  |
| A teaching workshop        | Minimal Light (1) or Natural (6) |
| A story about people       | Editorial (4) or Natural (6)     |
| An engineering talk        | Dev / Data (8)                   |
| A research review          | Scientific (7)                   |
| A startup pitch            | Vibrant (5) or Consulting (3)    |
| Internal recap / review    | Minimal Light (1)                |

## Rules

1. **One style per deck.** Two styles on different slides = two decks.
2. Style constrains palette + fonts + layouts — see the linked docs in each
   catalog entry (`templates-themes/palettes.md`, `typography.md`, `layouts.md`).
3. If the user has brand constraints, adapt the nearest style's palette to the
   brand colors (keep roles, keep restraint).
4. Don't chase trendiness — clarity beats novelty on a projector.
