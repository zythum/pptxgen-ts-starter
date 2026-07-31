# Workflow 04b — Token Files: `src/token/colors.ts` + `src/token/typography.ts`

**Purpose:** define the required structure, naming, lifecycle, and boundary
rules of the two runtime token files. They are the **runtime single source of
truth** that slides actually import — the code mirror of `.deck/spec.md` §3
(palette) and §4 (typography). Write them once at spec-lock time, then keep
them in sync with the spec for the life of the deck.

Relationship:

```
templates-themes/palettes.md  ─┐
templates-themes/typography.md ┘→ pick palette / scale
        ↓
.deck/spec.md (§3 palette, §4 type scale)   ← locked spec (source of truth for edits)
        ↓
src/token/colors.ts + typography.ts         ← runtime mirror (read by code)
        ↓
slides reference colors.* / typography.*    ← never write bare values
```

## 1. `colors.ts` — required structure

```
// Head comment: this file = single source of truth + usage rules
// (create / update / variants / no bare hex)
export const colors = {
  // Common roles (recommended skeleton; keys may vary but must be semantic)
  white:            "FFFFFF",
  black:            "000000",
  backgroundLight:  "FAFAFA",
  darkBackground:   "18181B",
  darkSurface:      "27272A",
  ink:              "1F2937",   // body text
  textSecondary:    "4B5563",
  muted:            "6B7280",
  mutedLight:       "9CA3AF",
  accent:           "7C3AED",   // accent (one per deck)
  accentLight:      "A78BFA",
  accentSoft:       "F3F0FF",
  border:           "E5E7EB",
  borderLight:      "E2E8F0",
  // semantic colors / hue ramps / chart colors (add or remove as needed)
  success:          "10B981",
  dangerText:       "DC2626",
  blue600:          "2563EB",
  …
} as const;
```

Mandatory: `as const`; every key semantic and self-explanatory; no bare hex in
slide files; role keys (background/ink/accent/border…) always present.

## 2. `typography.ts` — required structure

```
export const typography = {
  font: {
    sans: "Inter",          // headings / body (≤2 families)
    serif: "Source Serif 4", // decorative quotes (drop if unused)
    mono: "JetBrains Mono", // code / numbers
  },
  size: {
    display: 36,  // cover main title
    hero: 30,     // section heading
    title: 24,    // slide title
    subtitle: 18,
    body: 14,
    caption: 12,
    tiny: 10,
  },
} as const;
```

Mandatory: `font` group (family names, actual installed/Google fonts — no
invented font names); `size` group (semantic keys following the scale in
`templates-themes/typography.md`); no magic numbers in slide files.

**Font weights are NOT tokenized** — pptxgenjs supports only `bold: boolean`
(no numeric `fontWeight`). Write `bold: true/false` directly in slides; do not
add a `weight` token group.

## 3. Naming conventions

| ❌ Bad               | ✅ Good                               | Why                          |
| -------------------- | ------------------------------------- | ---------------------------- |
| `purple`, `brand`    | `accent`, `accentLight`, `accentSoft` | role semantics, not hue names |
| `color1`, `color2`   | `ink`, `muted`, `border`              | self-explanatory             |
| `h24`, `f18`         | `size.title`, `size.subtitle`         | express purpose, not values  |
| `darkBg1`, `darkBg2` | `darkBackground`, `darkSurface`       | hierarchy semantics          |

Derived variants: name = base role + modifier (`accent.hover` →
`accentHover`, `surface.alt` → `surfaceAlt`). Never use Tailwind-style
numeric suffixes for roles that are not a color ramp.

## 4. Lifecycle

| Event              | Action                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| **Create**         | after 04-spec confirmation, mirror spec §3/§4 values into both token files, then start 05-compose |
| **Change palette/fonts** | update `.deck/spec.md` first → then token files → entire deck picks it up                |
| **New color variant** | run `scripts/color-tool.ts` (e.g. `--darken 10`) for an exact hex → add a semantic key to `colors.ts` → record the derivation in spec §8 |
| **New size**       | update spec §4 → propagate to `typography.ts`; measured one-off exceptions: literal value + comment in the slide |
| **Remove**         | delete keys with no references; keep files to values the deck actually uses                       |

## 5. Boundary rules (hard vs soft)

| Dimension    | Rule                                                                             | Nature                                   |
| ------------ | -------------------------------------------------------------------------------- | ---------------------------------------- |
| Color values | never hand-compute or invent hex; presets from `palettes.md`, variants from `color-tool.ts` | **hard constraint**            |
| Color refs   | slides use `colors.*` only; bare hex is a defect                                 | **hard constraint**                      |
| Font sizes   | default `typography.*`; measured one-off tweaks may use literals + comment       | **soft constraint** (consistency, not safety) |
| Font weights | write `bold: boolean` directly                                                   | capability boundary, not a token concern |

## 6. QA linkage

- 07-qa checks: `rg` for bare hex in `src/slides/` + `src/components/` (must be
  clean); `rg` for magic font sizes outside `typography.ts`.
- 04b files themselves are not generated by scripts — they are hand-written
  mirrors of the spec. If they drift from `.deck/spec.md` §3/§4, fix the spec
  first, then the token files.

## Anti-patterns

- ❌ Inventing hex values or font names — no source, no token.
- ❌ Adding a `weight` token group (pptxgenjs has no `fontWeight`).
- ❌ Putting a color ramp in `colors.ts` that no slide uses.
- ❌ Editing token files while `.deck/spec.md` says something else — spec is
  the source of truth for modifications; token files are its mirror.
- ❌ Replacing `colors.*` with hex to "save time" during a slide edit.
