# Table Components

## `<Table>`

| Prop                   | Type                            | Default  | Description              |
| ---------------------- | ------------------------------- | -------- | ------------------------ |
| `x`                    | `number`                        | —        | Left offset              |
| `y`                    | `number`                        | —        | Top offset               |
| `w`                    | `number`                        | —        | Total width              |
| `h`                    | `number`                        | —        | Total height             |
| `colW`                 | `number \| number[]`            | equal    | Column widths            |
| `rowH`                 | `number \| number[]`            | equal    | Row heights              |
| `border`               | `BorderProps \| [4]BorderProps` | —        | Table border             |
| `fill`                 | `ShapeFillProps`                | —        | Default cell background  |
| `margin`               | `Margin`                        | `0`      | Cell margin (`>=1` pt, `<1` inches) |
| `autoPage`             | `boolean`                       | `false`  | Auto-paging for overflow |
| `autoPageRepeatHeader` | `boolean`                       | `false`  | Repeat header rows       |
| `autoPageHeaderRows`   | `number`                        | `1`      | Header rows to repeat    |
| `autoPageSlideStartY`  | `number`                        | (margin) | Y on paged slides        |
| `align`                | `HAlign`                        | `"left"` | Text alignment           |
| `valign`               | `VAlign`                        | `"top"`  | Vertical alignment       |

---

## `<TableCell>`

| Prop                                              | Type                            | Description          |
| ------------------------------------------------- | ------------------------------- | -------------------- |
| `colspan`                                         | `number`                        | Column span          |
| `rowspan`                                         | `number`                        | Row span             |
| `fill`                                            | `ShapeFillProps`                | Cell background      |
| `border`                                          | `BorderProps \| [4]BorderProps` | Cell border          |
| `margin`                                          | `Margin`                        | Cell margin (`>=1` pt, `<1` inches) |
| `align`                                           | `HAlign`                        | Horizontal alignment |
| `valign`                                          | `VAlign`                        | Vertical alignment   |
| `bold`, `fontSize`, `fontFace`, `color`, `italic` | —                               | Text formatting      |
| `hyperlink`                                       | `HyperlinkProps`                | Cell hyperlink       |

---

## `<TableRow>`

A wrapper component for each row. `<Table>` only accepts `<TableRow>` or `<Fragment>` as direct children — do not place `<TableCell>` directly inside `<Table>`.

---

## Example (with Alternating Rows + Totals)

```tsx
<Table
  x={0.8}
  y={1.6}
  w={11.733}
  h={4.5}
  colW={[3, 2.183, 2.183, 2.183, 2.184]}
  rowH={[0.55, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45]}
  border={{ type: "solid", color: "E2E8F0", pt: 1 }}
>
  {/* Header row */}
  <TableRow>
    {["Product", "Q1", "Q2", "Q3", "Q4"].map((h, i) => (
      <TableCell
        key={i}
        bold
        fontSize={12}
        color="FFFFFF"
        fill={{ color: "1E293B" }}
        align="center"
        valign="middle"
      >
        {h}
      </TableCell>
    ))}
  </TableRow>
  {/* Data rows (alternating background) */}
  {["Widget A", "Widget B", "Gadget X", "Gadget Y"].map((name, ri) => {
    const bgColor = ri % 2 === 0 ? "FFFFFF" : "F8FAFC";
    return (
      <TableRow key={ri}>
        <TableCell
          fontSize={11}
          color="334155"
          fill={{ color: "FAF5FF" }}
          align="left"
          valign="middle"
          bold
        >
          {name}
        </TableCell>
        {["$4,500", "$5,200", "$4,800", "$5,600"].map((v, ci) => (
          <TableCell
            key={ci}
            fontSize={11}
            color="334155"
            fill={{ color: bgColor }}
            align="center"
            valign="middle"
          >
            {v}
          </TableCell>
        ))}
      </TableRow>
    );
  })}
  {/* Total row */}
  <TableRow>
    {["Total", "$22,500", "$25,800", "$24,100", "$28,400"].map((v, i) => (
      <TableCell
        key={`total-${i}`}
        bold
        fontSize={12}
        color="1E293B"
        fill={{ color: "EDE9FE" }}
        align={i === 0 ? "left" : "center"}
        valign="middle"
      >
        {v}
      </TableCell>
    ))}
  </TableRow>
</Table>
```
