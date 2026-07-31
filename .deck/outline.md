# Outline

> # ⚠️ WARNING — EXAMPLE FILE, MUST OVERWRITE
>
> This is a **filled reference example** (a demo deck), NOT working data.
> Every NEW deck **must overwrite this file** at its stage:
> brief → 01-clarify · research → 02-research · outline → 03-outline · spec → 04-spec.
> A file existing here does NOT mean the work is done — it is still the example.
> Format spec: `workflow/00-deck-workspace.md`.

## Narrative Arc

**Sectioned (7)** — demo-style encyclopedia: Cover → feature chapters (one by one) → Closing.
A tool tutorial doesn't use Problem→Solution; it walks through capabilities feature by feature,
matching Sectioned's workshop scenario.

## Chapters & Time Budget (total ~8 min)

| Ch  | Name          | Pages | Budget    | Content                                             |
| --- | ------------- | ----- | --------- | --------------------------------------------------- |
| 1   | Opening       | S1    | 0.5–1 min | Hook: write PPT in JSX                              |
| 2   | Preview       | S2    | ~1 min    | Three blocks + edit → preview → generate loop       |
| 3   | Feature demos | S3–S7 | ~5 min    | Text / Layout / Shapes / Table / Chart, ~1 min each |
| 4   | Closing       | S8    | ~1 min    | CTA: fork + three commands                          |

## Page List (role + one-sentence core message)

```
01 Cover    — Getting started with pptxgen-ts-starter: native PPTX with JSX+TS
              [role: Cover, sparse, dark]
02 Agenda   — Three blocks (text / layout & cards / shapes) + edit → preview → generate loop
              [role: Section, medium]
03 Text     — Text + TextRun support per-run rich text: bold / italic / color / size / leading / breakLine
              [role: Explain, medium]
04 Layout   — Card containers (RoundRect: shadow / border / accent bar / tinted fill) + absolute inches = pixel-perfect layout
              [role: Explain, medium]
05 Shapes   — Native Rect / Oval / RoundRect shapes: fill / transparency / stroke / dash / rectRadius
              [role: Explain, medium]
06 Table    — Native table: header / banded rows / total row, data-driven rendering (fictional data)
              [role: Evidence, dense]
07 Chart    — Native charts: clustered bar (revenue/cost/profit) + doughnut (market share), config-driven (fictional data)
              [role: Evidence, dense]
08 Closing  — Fork the template: npm install → npm run dev → npm run generate
              [role: Closing, sparse, dark]
```

**Density rhythm**: sparse = S1, S2, S8 → 3/8 ≈ 37% ✓ (meets the sparse 25–40% rule);
dense is concentrated on the two data pages S6/S7; rhythm: sparse → medium → medium → medium → dense → dense → sparse.

## Speaker Notes (per page, Hook / Track / Action / Transition)

```
S1  Hook:   "Welcome! This is a sample presentation built with pptxgen-ts-starter."
    Track:  JSX defines slides → pptxgenjs renders .pptx; use arrow keys to navigate.
    Action: none (opening).
    Transition: "First, a quick preview of what this template can do—"

S2  Track:  Preview of the three blocks (text, layout & cards, shapes) + edit → preview → generate loop.
S3  Track:  Each TextRun formats independently (fontSize/bold/italic/color/breakLine);
            the Text component handles position, alignment, line spacing.
S4  Track:  Card = RoundRect + shadow/border/accent bar/tinted fill; everything is x,y,w,h absolute positioning.
S5  Track:  fill/transparency/stroke/dash on three native shapes; RoundRect has rectRadius.
S6  Track:  Header + banded rows + total row; 5 columns × 10 rows (fictional data).
S7  Track:  Bar chart quarterly revenue/cost/profit trend + doughnut market-share split (fictional data).
S8  Hook:   "Thanks for exploring the pptxgen-ts-starter template!"
    Track:  fork/clone → npm install → edit src/slides/ → preview in browser → generate .pptx.
    Action: invite to fork and edit one page.
```

(S2–S7 are demo pages; Track covers the essentials. For full four-part notes,
extend Action/Transition following the S1/S8 format.)

## Choreography

- **S2**: optionally demo the dev-server workflow live (or describe it).
- **S6/S7**: point to the total row and the Q4 peak (162K); emphasize the "natively editable" selling point.
- **S8**: pause at the end, leave room for questions.
- **Light/dark rhythm**: S1 dark → S2–S7 light → S8 dark — cover/closing mirror, deliberate (see `spec.md` §5).
