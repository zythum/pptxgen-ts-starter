# Text

## `<Text>` — Block Container

Positions and styles a text block on the slide. All children must be `<TextRun>` components.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `x` | `Coord` (`number \|`${number}%``) | — | Left offset (inches or %) |
| `y` | `Coord` | — | Top offset |
| `w` | `Coord` | — | Width |
| `h` | `Coord` | — | Height |
| `align` | `HAlign` | `"left"` | `"left"\|"center"\|"right"\|"justify"` |
| `valign` | `VAlign` | `"top"` | `"top"\|"middle"\|"bottom"` |
| `lineSpacing` | `number` | — | Line spacing in points |
| `fill` | `FillProps` | — | Background fill |
| `border` | `BorderProps` | — | Border |
| `shadow` | `ShadowProps` | — | Shadow |
| `rtl` | `boolean` | — | Right-to-left layout |
| `rotate` | `number` | — | Rotation in degrees |
| `autoFit` | `boolean` | — | Shrink text to fit |
| `shrinkText` | `boolean` | — | Shrink overflow text |
| `wrap` | `boolean` | `true` | Word wrap |
| `margin` | `number \| number[]` | — | Margin: single value or `[top, right, bottom, left]` |
| `inset` | `number` | — | Internal padding in inches |

---

## `<TextRun>` — Inline Formatted Segment

A single formatted run of text inside a `<Text>` block. Each `<TextRun>` carries its own formatting options via the `options` prop.

### Options

| Option | Type | Description |
|--------|------|-------------|
| `fontSize` | `number` | Font size in points |
| `fontFace` | `string` | Font family, e.g. `"Arial"` |
| `bold` | `boolean` | Bold |
| `italic` | `boolean` | Italic |
| `color` | `Color` | Hex (no `#`) or theme color |
| `transparency` | `number` | 0–100 |
| `highlight` | `HexColor` | Highlight color |
| `breakLine` | `boolean` | Line-break after this segment (like `<br>`) |
| `align` | `HAlign` | Horizontal alignment override |
| `valign` | `VAlign` | Vertical alignment override |
| `lang` | `string` | Language code, e.g. `"en-US"` |
| `textDirection` | `string` | `"horz"\|"vert"\|"vert270"\|"wordArtVert"` |
| `tabStops` | `Array<{ position: number, alignment?: "l"\|"r"\|"ctr"\|"dec" }>` | Tab stops |
| `softBreakBefore` | `boolean` | Soft line-break before content (Shift+Enter) |

#### Underline

```tsx
{ underline: { style: "none" | "single" | "double", color?: Color } }
```

#### Bullet / Numbered

```tsx
// Simple bullet
{ bullet: true }

// Custom bullet character
{ bullet: { type: "bullet", characterCode: "25BA" } }

// Numbered list
{ bullet: { type: "number", numberType: "arabicPeriod", numberStartAt: 1 } }
```

| `numberType` | Output |
|-------------|--------|
| `"arabicPeriod"` | 1. |
| `"arabicParenR"` | 1) |
| `"romanLcParenR"` | i) |
| `"alphaUcPeriod"` | A. |
| `"alphaLcParenBoth"` | (a) |

---

## Examples

### Basic: Title with Subtitle

```tsx
<Text x={1.5} y={3.0} w={10.333} h={1.5} align="center" valign="middle">
  <TextRun text="Bold title" options={{ fontSize: 36, bold: true, color: "FFFFFF" }} />
  <TextRun text=" and normal subtitle" options={{ fontSize: 18, color: "A78BFA", breakLine: true }} />
</Text>
```

### Bullet List

```tsx
<Text x={1.5} y={2.5} w={10} h={3} valign="top" lineSpacing={28}>
  <TextRun text="First item" options={{ bullet: true, fontSize: 16, color: "333333" }} />
  <TextRun text="Second item" options={{ bullet: true, fontSize: 16, color: "333333" }} />
  <TextRun text="Third item" options={{ bullet: true, fontSize: 16, color: "333333" }} />
</Text>
```
