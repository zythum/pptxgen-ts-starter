# Units & Colors

## Units

### Length Units (Position & Size)

All position and size props (`x`, `y`, `w`, `h` on shapes, text, images, groups, etc.) use **inches** as the default unit.

```tsx
<Rect x={1.5} y={2.0} w={4} h={3} />
```

Percentage strings are also supported — resolved against the enclosing context (slide or group):

```tsx
// Resolves against slide width (13.333")
<Text x="10%" y="50%" w="80%" h="10%" />
```

### Font Size

`fontSize` on `<TextRun>` is in **points (pt)**:

```tsx
<TextRun options={{ fontSize: 44, bold: true }}>Title</TextRun>
```

### Line Spacing

`lineSpacing` on `<Text>` is in **points (pt)**:

```tsx
<Text x={1} y={1} w={10} h={3} lineSpacing={28}>
```

### Margins & Padding

| Prop     | Component     | Unit   |
| -------- | ------------- | ------ |
| `margin` | `<Text>`      | inches |
| `inset`  | `<Text>`      | inches |
| `margin` | `<TableCell>` | inches |

### Stroke / Line Width

`line.width` (shapes) and `border.pt` (borders) are in **points (pt)**:

```tsx
<LineBetween x1={0} y1={1} x2={10} y2={1} line={{ color: "E5E7EB", width: 2 }} />
<TableCell border={{ type: "solid", color: "E5E7EB", pt: 1 }} />
```

### Shadow

`blur` and `offset` on shadow are in **points (pt)**:

```tsx
shadow={{ type: "outer", blur: 8, offset: 2, color: "000000", opacity: 0.06 }}
```

### Rotation

`rotate` is in **degrees**:

```tsx
<Rect x={1} y={1} w={3} h={1} rotate={45} />
```

### Corner Radius

`rectRadius` on `<RoundRect>` is a **ratio (0.0–1.0)**, not a length:

```tsx
<RoundRect x={1} y={1} w={3} h={2} rectRadius={0.3} />
```

---

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
