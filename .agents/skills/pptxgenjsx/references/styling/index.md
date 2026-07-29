# Colors & Styling Interfaces

## Fill (`ShapeFillProps`)

```tsx
fill={{ color: "7C3AED" }}
fill={{ color: "7C3AED", transparency: 50 }}
fill={{ type: "none" }}
fill={{ color: "accent1" }}
```

**Color format:** Hex without `#` (`"FFFFFF"`) or theme color name (`"accent1"`, `"accent2"`, etc.). Transparency: 0–100.

---

## Line / Stroke (`ShapeLineProps`)

| Prop           | Type     | Description                                                                              |
| -------------- | -------- | ---------------------------------------------------------------------------------------- |
| `color`        | `Color`  | Hex or theme color                                                                       |
| `width`        | `number` | Line width in points                                                                     |
| `dashType`     | `string` | `"solid"\|"dash"\|"dashDot"\|"lgDash"\|"lgDashDot"\|"lgDashDotDot"\|"sysDash"\|"sysDot"` |
| `endArrowType` | `string` | `"none"\|"arrow"\|"diamond"\|"oval"\|"stealth"\|"triangle"`                              |

---

## Shadow (`ShadowProps`)

```tsx
shadow={{ type: "outer", blur: 8, offset: 2, color: "000000", opacity: 0.06 }}
```

| Prop      | Type                 | Default   | Description           |
| --------- | -------------------- | --------- | --------------------- |
| `type`    | `"outer" \| "inner"` | `"outer"` | Shadow direction      |
| `blur`    | `number`             | —         | Blur radius in points |
| `offset`  | `number`             | —         | Offset in points      |
| `color`   | `Color`              | —         | Shadow color          |
| `opacity` | `number`             | —         | 0–1                   |

---

## Hyperlink (`HyperlinkProps`)

```tsx
// External URL
hyperlink={{ url: "https://example.com", tooltip: "Visit site" }}

// Internal slide
hyperlink={{ slide: 3, tooltip: "Go to Summary" }}
```

---

## Border (`BorderProps`)

```tsx
// Uniform border
border={{ type: "solid", color: "E5E7EB", pt: 1 }}

// Individual sides: [top, right, bottom, left]
border={[
  { type: "solid", color: "000000", pt: 1 },  // top
  { type: "none" },                              // right
  { type: "solid", color: "000000", pt: 1 },    // bottom
  { type: "none" },                              // left
]}
```

---

## Text Base Props (`TextBaseProps`)

These props are available on components that contain text (like `<TableCell>`):

| Prop        | Type                                         | Description          |
| ----------- | -------------------------------------------- | -------------------- |
| `bold`      | `boolean`                                    | Bold text            |
| `italic`    | `boolean`                                    | Italic text          |
| `fontSize`  | `number`                                     | Font size in points  |
| `fontFace`  | `string`                                     | Font family          |
| `color`     | `Color`                                      | Hex or theme color   |
| `underline` | `{ style: string, color?: Color }`           | Underline            |
| `bullet`    | `boolean \| object`                          | Bullet/numbered list |
| `align`     | `HAlign`                                     | Horizontal alignment |
| `valign`    | `VAlign`                                     | Vertical alignment   |
| `margin`    | `number \| [number, number, number, number]` | Margin               |

---
