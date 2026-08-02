# Design QA Checklist

Use this checklist with `workflow/07-qa.md`. Mark every applicable item; record
`not-applicable` with a reason rather than silently skipping it.

## P0 — Build, geometry, and truth

- [ ] `npm run typecheck`, `npm run lint`, and `npm run generate` pass.
- [ ] Generated `.pptx` exists, is non-empty, and opens in the viewer.
- [ ] Every positioned visual element stays inside the 13.333 × 7.5 canvas (or
      the approved custom canvas).
- [ ] No text overflow, clipping, or unintended overlap after measurement.
- [ ] Every raster image matches its slot ratio; no stretching.
- [ ] All local asset paths exist.
- [ ] No placeholder text, unresolved template value, or missing slide import.
- [ ] Outline count, spec mapping count, and composed slide count agree.
- [ ] Slide numbers are continuous and unique.
- [ ] Every external factual claim/stat resolves to an `F-N` fact card in
      `.deck/research.md`.
- [ ] Every supplied claim resolves to `user-material:<id>`.
- [ ] No generated visual is presented as documentary evidence.

## P1 — Traceability and planning state

- [ ] All four `.deck/` files use valid status and authority fields.
- [ ] `.deck/` contains exactly `brief.md`, `research.md`, `outline.md`, and
      `spec.md` as planning files—no fifth planning document.
- [ ] `research.md` follows either the completed or not-needed schema.
- [ ] Every slide has the canonical comment fields: slide, role, layout, core,
      sources, visual, asset.
- [ ] Comment values agree with outline/spec and all IDs resolve.
- [ ] Registered layout variants exist in spec §8 before use.
- [ ] Final visual type, slot ratio, asset status, and provenance are recorded.
- [ ] Speaker notes use multiline `[Hook]`, `[Track]`, `[Action]`, and
      `[Transition]` sections without placeholders.

## P1 — Typography and alignment

- [ ] No more than two approved font families are used, excluding documented
      fallbacks.
- [ ] Font families/sizes come from `src/token/typography.ts`; controlled
      literals have a measurement/rationale comment.
- [ ] Weight uses supported `bold: boolean`; no numeric `fontWeight` token.
- [ ] Body copy is left-aligned; centering is limited to short hero/moment text.
- [ ] CJK leading/fallback is appropriate; mixed CJK/Latin text is not set to
      justified alignment.
- [ ] Cards and repeated blocks have equal geometry, gaps, and padding.
- [ ] Titles, margins, page numbers, and recurring accents align across slides.
- [ ] Target PowerPoint environment has been checked for font fallback when
      available.

## P1 — Color and accessibility

- [ ] Slide/component colors use `src/token/colors.ts`; no bare hex.
- [ ] Spec §3 palette values equal runtime color token values.
- [ ] Spec §4 font families and semantic sizes equal runtime typography token
      values.
- [ ] New variants have a source or `color-tool.ts` derivation recorded in spec
      §8.
- [ ] Body text contrast is at least 4.5:1; large text is at least 3:1.
- [ ] Fill-only accents are never used as text colors on unsafe backgrounds.
- [ ] Information is not communicated by color alone.
- [ ] Chart series, labels, credits, and muted text remain distinguishable.

## P1 — Content, density, and narrative

- [ ] Every slide has one role and one core message.
- [ ] On-screen content respects the approved density target in spec §6.
- [ ] Sparse-slide proportion is evaluated against the deck type, not a
      universal quota.
- [ ] Section transition treatment matches the outline; short decks do not waste
      pages on unnecessary dividers.
- [ ] Cover and closing echo intentionally.
- [ ] Every visual clarifies, proves, or orients; decorative filler is removed.

## P1 — Images, charts, and provenance

- [ ] User assets have approval/context; stock assets have license/credit data.
- [ ] Generated assets record provider, model/version, date, prompt reference,
      reviewer, and restrictions.
- [ ] Screenshots do not expose confidential or personal information.
- [ ] Charts show correct units, dates, scales, and source refs.
- [ ] Code-native charts/tables remain editable unless a documented exception
      justifies rasterization.
- [ ] Credits/captions are readable and use approved typography tokens.

## P2/P3 — Polish

- [ ] Page-to-page rhythm feels intentional during a full flip-through.
- [ ] Decorations, borders, legends, and repeated labels have been simplified.
- [ ] No element remains merely because there was empty space.
- [ ] Optional taste changes do not reopen settled decisions without benefit.

## Second pass

- [ ] Re-run all affected static/build/measurement checks after fixes.
- [ ] Review every slide again in order, not only changed slides.
- [ ] Read notes/transitions as a talk and verify chapter time totals.
- [ ] Confirm no open P0 or P1 item remains before delivery.
