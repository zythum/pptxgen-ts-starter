# Deck — Root Element

Wraps all slides. Must be the **default export** of `src/ppt.tsx`. Maps to `new PptxGenJS()`.

`<Presentation>` is an alias for `<Deck>`.

## Props

| Prop      | Type                                  | Description                                          |
| --------- | ------------------------------------- | ---------------------------------------------------- |
| `title`   | `string`                              | Presentation title                                   |
| `author`  | `string`                              | Author name                                          |
| `layout`  | `string` or `{ name, width, height }` | Slide dimensions (built-in name or custom object)    |
| `layouts` | `PresLayout[]`                        | Multiple named layouts (see below)                   |

## Layout — Slide Dimensions

Controls the canvas size that all position/size props (`x`, `y`, `w`, `h`) are relative to.

### Built-in Layout Names

| Name              | Dimensions    | Aspect Ratio |
| ----------------- | ------------- | ------------ |
| `"LAYOUT_4x3"`    | 10" × 7.5"    | 4:3          |
| `"LAYOUT_16x9"`   | 10" × 5.625"  | 16:9         |
| `"LAYOUT_16x10"`  | 10" × 6.25"   | 16:10        |
| `"LAYOUT_WIDE"`   | 13.33" × 7.5" | 16:9 (wide)  |

**Default**: `"LAYOUT_WIDE"` (13.333 × 7.5).

### Custom Layout (Object)

Define arbitrary dimensions with `name`, `width`, `height` (in inches):

```tsx
<Deck layout={{ name: "A4", width: 10.83, height: 7.82 }}>
  ...
</Deck>
```

### Multiple Named Layouts

Use the `layouts` prop (array) to define multiple named layouts, then reference one via `layout`:

```tsx
<Deck layout="A4" layouts={[
  { name: "A4", width: 10.83, height: 7.82 },
  { name: "Letter", width: 10, height: 7.5 },
]}>
  ...
</Deck>
```

### Notes

- The layout affects all slides uniformly — there is no per-slide override.
- When using `<Group>`, percentage coordinates inside the group resolve against the group's own `w`/`h`, not the deck layout (see [group.md](group.md)).
- This project's starter template defaults to `"LAYOUT_WIDE"` (13.333 × 7.5).

## Usage

```tsx
import { Deck, Slide } from "@zythum02/pptxgenjsx";

export default function () {
  return (
    <Deck title="My Talk" author="You" layout="LAYOUT_WIDE">
      <Slide component={() => import("./slides/01-title")} />
      <Slide component={() => import("./slides/02-content")} />
    </Deck>
  );
}
```
