# Group — Coordinate-Transform Container

A logical container that offsets all child elements relative to the group's position. Child coordinates are relative to the group's virtual canvas.

## Props

| Prop | Type    | Description                                |
| ---- | ------- | ------------------------------------------ |
| `x`  | `Coord` | Left offset of the group (inches or `"%"`) |
| `y`  | `Coord` | Top offset                                 |
| `w`  | `Coord` | Virtual canvas width                       |
| `h`  | `Coord` | Virtual canvas height                      |

## How It Works

1. The group establishes a **virtual canvas** at its `(x, y)` position on the slide, with dimensions `w` × `h`.
2. All child `x`, `y`, `w`, `h` values are resolved against this virtual canvas.
3. Percentage strings (`"50%"`) are resolved against the group's `w` (for x/w) or `h` (for y/h), then offset by the group's absolute position.
4. Groups can be **nested** — each level accumulates its offset.

```tsx
<Group x={1} y={1} w={10} h={5}>
  {/* (0, 0) inside group → (1, 1) on slide */}
  <Rect x={0} y={0} w={10} h={5} fill={{ color: "F0F0F0" }} />

  {/* "50%" inside group → resolved to 5" from group origin → (6, 3.5) on slide */}
  <Text x="50%" y="50%" w={4} h={1}>
    <TextRun options={{ fontSize: 18 }}>Centered in group</TextRun>
  </Text>
</Group>
```

## Nested Groups

Each nested group offsets its children by its own cumulative position:

```tsx
<Group x={0.5} y={0.5} w={12} h={6}>
  <Rect x={0} y={0} w={12} h={6} fill={{ color: "F8FAFC" }} />

  <Group x={1} y={1} w={10} h={4}>
    {/* This rect appears at (1.5, 1.5) on the slide */}
    <Rect x={0} y={0} w={10} h={4} fill={{ color: "EDE9FE" }} />

    <Text x={0.5} y={0.5} w={9} h={0.8}>
      <TextRun options={{ fontSize: 20, color: "5B21B6" }}>Nested content</TextRun>
    </Text>
  </Group>
</Group>
```

## Context Hook Inside Groups

Children can call `useGroupContext()` to get the group's virtual canvas dimensions:

```tsx
import { useGroupContext } from "@zythum02/pptxgenjsx";

function ProgressBar({ pct }: { pct: number }) {
  const { width } = useGroupContext();
  return <Rect x={0} y={0} w={width * pct} h={0.4} fill={{ color: "4CAF50" }} />;
}

// Usage inside a Group:
<Group x={1} y={6} w={11} h={0.5}>
  <ProgressBar pct={0.7} />
</Group>;
```

> When called outside a `<Group>`, `useGroupContext()` falls back to deck dimensions with zero offset.

## Example: Card Layout

```tsx
<Slide>
  <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: "0F172A" }} />

  <Group x={0.8} y={0.8} w={5.5} h={3}>
    <Rect
      x={0}
      y={0}
      w={5.5}
      h={3}
      fill={{ color: "1E293B" }}
      shadow={{ type: "outer", blur: 12, offset: 4, color: "000000", opacity: 0.3 }}
    />
    <Text x={0.5} y={0.5} w={4.5} h={0.6}>
      <TextRun options={{ fontSize: 22, bold: true, color: "FFFFFF" }}>Revenue</TextRun>
    </Text>
    <Text x={0.5} y={1.5} w={4.5} h={1}>
      <TextRun options={{ fontSize: 36, bold: true, color: "10B981" }}>$1.2M</TextRun>
    </Text>
  </Group>
</Slide>
```
