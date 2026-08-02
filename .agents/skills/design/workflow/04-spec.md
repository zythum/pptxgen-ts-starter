# Workflow 04 — Design Spec: Approve Before Mutation

## Contract

**Inputs:** confirmed outline, brief, research, and design knowledge base.
**Decision:** canvas, style, palette, type, background, density, layout set, and
visual constraints.
**Output:** approved `.deck/spec.md`, then synchronized runtime token files.
**Gate:** show a proposal before writing spec, tokens, or slides; may be waived
only by recorded delegation.
**Validation:** spec §3/§4 equals token values; required contrast combinations
pass; every page has an allowed layout/visual plan.
**Resume:** read confirmed spec and token mirrors; do not infer from examples.

## 1. Build a proposal in memory

Do not mutate project files yet. Prepare:

### Canvas and count

- Default: `LAYOUT_WIDE`, 13.333 × 7.5 in.
- Use `pptxgenjsx/references/deck.md` for other enum dimensions.
- Page count must match the confirmed outline.

### Style

Pick one style from `templates-themes/styles.md` based on purpose, audience, and
content type. Record the style system and one-sentence rationale. A hybrid style
is allowed only when the catalog explicitly defines its boundary.

### Palette

Pick one preset from `templates-themes/palettes.md`, or map user-supplied brand
colors into the required roles. Never invent hex values.

The proposal must include:

- `background`, `surface`, `primary`, `accent`, `text`, `muted`, `border`;
- optional semantic/variant roles actually needed;
- allowed foreground/background combinations;
- any `fill-only` accent restriction;
- `color-tool.ts` results for derived variants and contrast.

### Typography

Choose no more than two font families. Define semantic roles that cover the
selected layouts: display, statement, section, title, subtitle, body, caption,
stat, and code when used. State CJK/fallback and delivery-environment checks.

### Background and density

- Choose light/dark treatment; mixed backgrounds require a documented purpose.
- Lock the outline's sparse target range or an explained custom range.
- Background images remain per-page visual decisions, not a default.

### Layout and visual mapping

Map each page to a core layout from `layouts.md`. If no core layout fits,
propose a registered variant in spec §8 with parent, geometry, reason, and
affected pages. Include preliminary visual type and slot ratio in §7.

## 2. Present the Gate

Show the user:

- canvas and page count;
- style/system and rationale;
- palette roles, accent usage, and key contrast results;
- font pair, semantic size scale, fallback;
- background and density target;
- core layout set and any proposed variants;
- visual constraints that materially affect composition.

In interactive mode, stop for approval. In delegated mode, verify the recorded
scope covers all proposed decisions.

## 3. Write the approved spec

Only after Gate satisfaction:

1. overwrite the example `.deck/spec.md` using the schema in
   `00-deck-workspace.md`;
2. set `Status: confirmed` and the correct authority;
3. record all derivation commands, exceptions, and variants in §8;
4. add the concise mirror comment for `src/ppt.tsx` in §9.

The mirror comment summarizes the spec; runtime values live in token files, not
in the comment.

## 4. Mirror runtime tokens

After writing the approved spec, update:

- `src/token/colors.ts` from spec §3;
- `src/token/typography.ts` from spec §4.

Follow `04b-token-files.md`. Preserve existing semantic key names during an
incremental edit unless a deliberate migration updates every reference.

## 5. Validate before composition

- Compare every spec §3/§4 value with its token mirror.
- Run `color-tool.ts --contrast` for required text/background pairs.
- Confirm no page refers to an unknown layout or unregistered variant.
- Confirm visual-dependent pages have a preliminary type and slot ratio.

Only then begin stage 05.

## Anti-patterns

- Writing tokens before approval.
- Calling a proposal “locked” without status/authority.
- Choosing a palette because it looks attractive but fails required contrast.
- Adding an unregistered layout during composition.
- Changing token key names during a small edit and breaking unrelated slides.
