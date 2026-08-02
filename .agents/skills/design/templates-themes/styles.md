# Styles — Route by Purpose, Audience, and Content

Pick one style in `workflow/04-spec.md`. A style constrains palette, typography,
layout tendencies, density, and visual treatment; it is not decoration applied
after composition.

## 1. Choose a system

| System            | Best for                                   | Visual behavior                                           |
| ----------------- | ------------------------------------------ | --------------------------------------------------------- |
| Information-first | Facts, data, methods, reviews, decisions   | Grid, conclusion-first titles, charts/tables, restraint   |
| Narrative-first   | Stories, culture, people, opinion, moments | Editorial pacing, imagery, serif option, more white space |

Choose the dominant system. A named hybrid is allowed only when its boundary is
explicit—for example, information-first product proof with narrative-first
cover/closing. Do not alternate systems arbitrarily page by page.

## 2. Style catalog

### S1. Minimal Light — information-first default

- Best for: internal sharing, teaching, general-purpose decks
- Palette: Light Professional
- Type: Neo-Grotesk
- Typical layouts: L1, L2, L3, L4, L5, L6, L9, L10, L11
- Density: general 25–35% sparse
- Visuals: diagrams and simple charts before decorative imagery

### S2. Dark Premium — information-first

- Best for: product demos, technical keynotes, evening presentations
- Palette: Dark Premium
- Type: Neo-Grotesk; mono only for code/data
- Typical layouts: L1, L3, L6, L8, L9, L10, L12
- Density: 20–30% sparse
- Visuals: screenshots, product media, luminous chart accents
- Constraint: `accent` on dark background is large-text/graphic use unless the
  measured pairing passes body-text contrast

### S3. Consulting / Executive — information-first

- Best for: board reviews, proposals, investor/operating updates
- Palette: Consulting
- Type: Neo-Grotesk
- Typical layouts: L2, L3, L4, L5, L6, L10, L11, L13, L14
- Density: 15–25% sparse
- Visuals: conclusion-first charts, tables, matrices, process diagrams
- Constraint: no decorative images without decision value

### S4. Editorial — narrative-first

- Best for: culture, industry stories, opinion, people-led narratives
- Palette: Editorial
- Type: Editorial pair
- Typical layouts: L1, L2, L3, L4, L8, L9, L15
- Density: 30–40% sparse
- Visuals: strong photography/illustration with credits and provenance
- Constraint: signal yellow is fill/graphic accent, not text on cream/white

### S5. Vibrant Startup — controlled hybrid

- Best for: launches, startup pitches, community events
- Dominant system: information-first for proof/product pages
- Narrative allowance: cover, section, moment, and closing only
- Palette: Vibrant
- Type: Neo-Grotesk
- Typical layouts: L1, L3, L5, L6, L9, L10, L12, L13
- Density: 20–35% sparse
- Constraint: one violet accent; no gradient/firework proliferation

### S6. Natural Warm — narrative-first

- Best for: wellbeing, education, social impact, human stories
- Palette: Natural
- Type: Humanist or CJK Sans
- Typical layouts: L1, L3, L4, L5, L8, L9, L13, L15
- Density: 30–40% sparse
- Visuals: warm photography, simple diagrams, restrained rounded surfaces

### S7. Scientific — information-first

- Best for: research, academic, engineering reviews
- Palette: Consulting or Light Professional
- Type: Scientific pair
- Typical layouts: L2, L4, L6, L7, L10, L11, L14
- Density: 15–25% sparse
- Visuals: charts, tables, methods diagrams; on-slide source captions
- Constraint: density is acceptable only with hierarchy and legible type

### S8. Dev / Data — information-first

- Best for: engineering talks, tooling, data analysis
- Palette: Dark Premium or Light Professional
- Type: Mono accent pair
- Typical layouts: L1, L3, L6, L7, L9, L10, L11, L12, L14
- Density: 15–30% sparse
- Visuals: editable charts, code, architecture, verified screenshots
- Constraint: mono is for code/tabular data, not long prose

## 3. Routing table

| Situation                 | First choice       | Alternative        |
| ------------------------- | ------------------ | ------------------ |
| Executive decision/review | S3 Consulting      | S1 Minimal Light   |
| Product demo              | S2 Dark Premium    | S5 Vibrant Startup |
| Teaching workshop         | S1 Minimal Light   | S6 Natural Warm    |
| People/culture story      | S4 Editorial       | S6 Natural Warm    |
| Engineering/data talk     | S8 Dev / Data      | S7 Scientific      |
| Research review           | S7 Scientific      | S3 Consulting      |
| Startup pitch             | S5 Vibrant Startup | S3 Consulting      |
| General internal recap    | S1 Minimal Light   | S3 Consulting      |

## 4. Rules

1. Record one style ID and dominant system in spec §2.
2. Use its recommended palette/type/layouts as defaults, not immutable brand
   law; user constraints override after approval.
3. A hybrid must name which page roles may use the secondary system.
4. Adapt to brand colors by preserving semantic roles and contrast, not by
   mixing unrelated presets.
5. Register any layout outside the selected style tendency only when the page
   role/content justifies it.
6. Clarity on a projector outranks trendiness.
