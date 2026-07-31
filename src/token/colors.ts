// src/token/colors.ts — Single source of truth for this deck's colors.
// Mirrors .deck/spec.md §3. Pair with the design skill:
//   - Pick a palette from .agents/skills/design/templates-themes/palettes.md,
//     then fill the role keys below (semantic, self-explanatory names;
//     background / surface / text / muted / accent / border are the
//     recommended skeleton — add/remove keys as needed).
//   - Slides must reference `colors.*` only — no raw hex in slide files.
//   - New variants: derive them via
//       npx tsx scripts/color-tool.ts --hex <base> --darken 10
//     then add under a semantic name. Never hand-compute or invent hex.
//   - Changes apply deck-wide from here; keep .deck/spec.md §3 in sync.
//
// Values below = every color actually used by the template demo deck
// (extracted from src/slides + components, unchanged). Naming mixes roles
// (ink / muted / accent…) with Tailwind hue scales (violet500 / amber200…).

export const colors = {
  // Shared roles
  white: "FFFFFF",
  black: "000000",
  backgroundLight: "FAFAFA",
  darkBackground: "18181B", // dark slide background (Dark Premium · zinc-900)
  darkSurface: "27272A", // dark slide surface (Dark Premium · zinc-800)
  ink: "1F2937", // body text / dark headings
  textSecondary: "4B5563", // secondary body text
  muted: "6B7280", // minor info / footer
  mutedLight: "9CA3AF", // page numbers / small captions
  accent: "7C3AED", // brand purple (accent)
  accentLight: "A78BFA", // light purple (subheads / code titles)
  accentSoft: "F3F0FF", // light purple fill (card backgrounds)
  border: "E5E7EB", // card borders
  borderLight: "E2E8F0", // table lines / grid lines
  // Semantic colors
  success: "10B981",
  dangerText: "DC2626",
  dangerSoft: "FEF2F2",
  blue600: "2563EB",
  blue500: "3B82F6",
  blueSoft: "EFF6FF",
  // Hue ladder (05-shapes demo)
  violet500: "8B5CF6",
  violet900: "5B21B6",
  green200: "6EE7B7",
  green300: "34D399",
  green600: "059669",
  amber200: "FDE68A",
  amber400: "FBBF24",
  amber500: "F59E0B",
  amber600: "D97706",
  // Tables / charts
  slate800: "1E293B", // table headers / chart labels
  slate50: "F8FAFC", // alternating table rows
  slate700: "334155", // table data text
  slate400: "94A3B8", // chart axis labels
  slate600: "475569", // chart category axis
  violetSoft: "EDE9FE", // totals row fill
  // Code blocks (03-text)
  codeText: "E2E8F0",
  codeTag: "F87171",
} as const;
