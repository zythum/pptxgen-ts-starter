# Raw — Escape Hatch

For pptxgenjs features not covered by a dedicated component. Provides direct access to the `pptx` instance and `slide` object.

## Props

| Prop     | Type                                                                               | Description                              |
| -------- | ---------------------------------------------------------------------------------- | ---------------------------------------- |
| `render` | `(args: { pptx: PptxGenJS, slide: Slide, node: PptxNode }) => void \| Promise<void>` | Function called during rendering         |

## Usage

```tsx
import { Slide, Rect, Raw, Text, TextRun } from "@zythum02/pptxgenjsx";

export async function CustomSlide() {
  return (
    <Slide>
      <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: "FFFFFF" }} />

      <Raw
        render={({ pptx, slide, node }) => {
          // Direct access to slide.addShape(), slide.addText(), etc.
          slide.addShape("rect", {
            x: 1,
            y: 1,
            w: 5,
            h: 3,
            fill: { color: "FF0000" },
          });

          // Or create a new shape from pptxgenjs
          slide.addText("Custom text via Raw", {
            x: 1,
            y: 4.5,
            w: 8,
            h: 1,
            fontSize: 18,
            color: "333333",
          });
        }}
      />

      <Text x={1} y={6} w={8} h={0.5}>
        <TextRun options={{ fontSize: 14, color: "666666" }}>
          Normal JSX component still works alongside Raw
        </TextRun>
      </Text>
    </Slide>
  );
}
```

## When to Use

- pptxgenjs features not yet exposed as a JSX component
- Complex shape manipulation requiring raw API calls
- Dynamic rendering logic that's awkward in JSX

> **Prefer dedicated components whenever possible.** Use `Raw` only as a fallback for edge cases.
