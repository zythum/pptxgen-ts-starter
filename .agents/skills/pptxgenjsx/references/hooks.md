# Context Hooks

Context hooks provide runtime information about the current rendering environment. They work because the renderer sets up a context store via `AsyncLocalStorage` — so they can be called from any component rendered as a child of `<Slide>` or `<Group>`.

## `useSlideContext`

Exposes the current slide's index, total count, and section title.

```tsx
import { useSlideContext } from "@zythum02/pptxgenjsx";

function SlideNumber() {
  const { index, total, sectionTitle } = useSlideContext();

  return (
    <Text x={1} y={6.5} w={10} h={0.5} fontSize={10} color="999999">
      {index} of {total}
      {sectionTitle ? ` · ${sectionTitle}` : ""}
    </Text>
  );
}
```

### Returns

| Prop           | Type                  | Description                                    |
| -------------- | --------------------- | ---------------------------------------------- |
| `index`        | `number`              | Current slide index (1-based)                  |
| `total`        | `number`              | Total number of slides                         |
| `sectionTitle` | `string \| undefined` | Current section title, if inside a `<Section>` |

## `useDeckContext`

Exposes the deck's slide dimensions.

```tsx
import { useDeckContext } from "@zythum02/pptxgenjsx";

function FullBleedBackground() {
  const { width, height } = useDeckContext();
  return <Rect x={0} y={0} w={width} h={height} fill={{ color: "18181B" }} />;
}
```

### Returns

| Prop     | Type     | Description            |
| -------- | -------- | ---------------------- |
| `width`  | `number` | Slide width in inches  |
| `height` | `number` | Slide height in inches |

## `useGroupContext`

Exposes the current group's absolute offset and virtual canvas dimensions. When called outside a `<Group>`, falls back to deck dimensions with zero offset.

```tsx
import { useGroupContext } from "@zythum02/pptxgenjsx";

function ProgressBar({ pct }: { pct: number }) {
  const { width, height, offsetX, offsetY } = useGroupContext();
  return <Rect x={0} y={0} w={width * pct} h={0.4} fill={{ color: "4CAF50" }} />;
}
```

### Returns

| Prop      | Type     | Description                            |
| --------- | -------- | -------------------------------------- |
| `width`   | `number` | Virtual canvas width in inches         |
| `height`  | `number` | Virtual canvas height in inches        |
| `offsetX` | `number` | Group's absolute X offset on the slide |
| `offsetY` | `number` | Group's absolute Y offset on the slide |

## Percentage Coordinates

`x`, `y`, `w`, `h` values can be specified as percentage strings (e.g. `"50%"`, `"100%"`), which are resolved relative to the enclosing context:

- **Inside a `<Group>`**: resolved against the group's `w` (for x/w) or `h` (for y/h).
- **Directly inside a `<Slide>`**: resolved against the slide's dimensions from the deck layout.

```tsx
// Percentage coords on a slide — resolves against 13.333×7.5
<Text x="10%" y="50%" w="80%" h="10%">
  <TextRun options={{ fontSize: 18 }}>Centered text</TextRun>
</Text>

// Percentage coords inside a Group — resolves against group's 10×5
<Group x={1} y={1} w={10} h={5}>
  <Rect x="25%" y="25%" w="50%" h="50%" fill={{ color: "4ECDC4" }} />
</Group>
```

This works for all positioning props: `x`, `y`, `w`, `h` on all shape/text/image components, and `x1`, `y1`, `x2`, `y2` on `LineBetween`.
