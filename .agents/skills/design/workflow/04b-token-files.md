# Workflow 04b — Runtime Token Files

`src/token/colors.ts` and `src/token/typography.ts` are the runtime mirrors of
approved `.deck/spec.md` §3 and §4. Slides/components import them; the spec is
the decision authority for later changes.

## Contract

**Inputs:** approved spec only.
**Output:** two `as const` token objects synchronized with spec.
**Hard rules:** no invented hex, no bare slide hex, no numeric font weights.
**Incremental rule:** preserve existing semantic keys unless an explicit
migration updates all references.
**Validation:** spec/token equality plus grep/typecheck/generate in stage 07.

## 1. Color token minimum

For a new deck, use this stable role interface:

```ts
export const colors = {
  background: "FAFAFA",
  surface: "FFFFFF",
  primary: "1F2937",
  accent: "7C3AED",
  text: "1F2937",
  muted: "6B7280",
  border: "E5E7EB",
} as const;
```

These values are the Light Professional preset, not arbitrary examples. Replace
them with the approved palette.

Optional roles are added only when used and must be semantic:

```ts
export const colors = {
  // required roles ...
  accentText: "1F2937", // when accent is fill-only and unsafe as text
  accentHover: "5F14E0", // derived with color-tool.ts
  surfaceAlt: "F5F5F5", // derived/source value recorded in spec §8
  success: "059669", // Tailwind emerald-600; approve and record before use
  warning: "D97706", // Tailwind amber-600; approve and record before use
  danger: "DC2626", // Tailwind red-600; approve and record before use
  chartSeries2: "2563EB", // Tailwind blue-600; approve and record before use
} as const;
```

Do not add white/black, dark/light duplicates, hue ramps, or semantic colors
unless the current deck uses them.

### Existing decks

An existing deck may use keys such as `ink`, `backgroundLight`, or
`textSecondary`. Preserve them for a small edit and map them explicitly in spec
§3. A role-key migration is a separate change: update the spec, token file, all
imports/usages, then run full QA.

## 2. Color derivation

- Preset/source colors come from `palettes.md`, a user brand kit, or another
  documented published system.
- New variants must be computed, never guessed:

```bash
npx tsx scripts/color-tool.ts --hex 7C3AED --darken 10
npx tsx scripts/color-tool.ts --hex 1F2937 --hex FAFAFA --contrast --json
```

Record command, result, source role, and use in spec §8 before adding the token.
Transparency is an element option, not a new hex token.

## 3. Typography token minimum

The scale must cover the approved layouts rather than forcing literals:

```ts
export const typography = {
  font: {
    sans: "Inter",
    mono: "JetBrains Mono",
  },
  size: {
    display: 44,
    statement: 40,
    section: 36,
    title: 28,
    subtitle: 18,
    body: 16,
    caption: 11,
    stat: 48,
    code: 12,
  },
} as const;
```

Remove unused font/size keys. Add an approved semantic role instead of reusing a
misleading key. A measured one-off exception may use a literal value only after
updating spec §4 or documenting why it is intentionally local.

### Weight capability

Do not create numeric weight tokens. pptxgenjsx/pptxgenjs exposes
`bold: boolean`; use it directly. “Semibold” is valid only if an explicitly
named installed font face produces that weight reliably; otherwise use
`bold: true` and document the actual rendering choice.

## 4. Font portability

For each family in the spec:

1. verify it exists in the generation/measurement environment;
2. register the exact font file with `estimate-text.ts --font-file` when needed;
3. define a CJK or platform-safe fallback strategy;
4. check the final deck in the target PowerPoint environment because fonts are
   not assumed to travel with the file.

## 5. Lifecycle

| Event               | Required order                                                 |
| ------------------- | -------------------------------------------------------------- |
| Create              | spec approval → write spec → write tokens → validate → compose |
| Palette/font change | proposal → approval → spec → tokens → full render QA           |
| New color variant   | color-tool → spec §8 → semantic token → use                    |
| New size            | measure → spec §4 → semantic token → use                       |
| Existing key rename | spec migration log → replace all refs → typecheck/grep         |
| Remove              | prove no refs → remove token → validate                        |

## 6. Boundary rules

| Dimension        | Rule                                          | Nature                  |
| ---------------- | --------------------------------------------- | ----------------------- |
| Hex values       | sourced preset/brand or color-tool derivation | hard                    |
| Color refs       | slides/components use `colors.*` only         | hard                    |
| Font family/size | use `typography.*` by default                 | hard for reusable roles |
| One-off size     | literal + measurement/rationale comment       | controlled exception    |
| Weight           | `bold: boolean`, no numeric token             | capability boundary     |

## Anti-patterns

- Editing token files while spec still shows the old decision.
- Copying a hex from a layout example into a slide.
- Adding unused ramps “for later”.
- Calling a yellow fill accent an accessible text color without contrast proof.
- Assuming a font available on the author's Mac exists on the delivery device.
