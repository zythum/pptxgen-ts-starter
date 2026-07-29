# Slide

## Slide — A Single Slide

Children are positioned absolutely. Maps to `pptx.addSlide()`.

### Props

| Prop           | Type               | Description                                                                             |
| -------------- | ------------------ | --------------------------------------------------------------------------------------- |
| `background`   | `BackgroundProps`  | Background color or image (`{ color: "FFFFFF" }`, `{ path: "..." }`, `{ data: "..." }`) |
| `color`        | `HexColor`         | Default text color for the slide                                                        |
| `hidden`       | `boolean`          | Whether the slide is hidden in the presentation                                         |
| `slideNumber`  | `SlideNumberProps` | Slide number formatting options                                                         |
| `masterName`   | `string`           | Master slide name (layout) to apply                                                     |
| `sectionTitle` | `string`           | Section this slide belongs to                                                           |
| `component`    | `() => Promise`    | Lazy-load a slide module (see [Lazy Slide Loading](#lazy-slide-loading))                |

### Minimal Slide Template

```tsx
import { Slide, Rect, Text, TextRun, Notes } from "@zythum02/pptxgenjsx";

export async function MySlide() {
  return (
    <Slide>
      {/* Full-size background — mandatory */}
      <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: "FFFFFF" }} />

      <Text x={0.8} y={0.6} w={8} h={0.8} align="left" valign="middle">
        <TextRun options={{ fontSize: 24, bold: true, color: "1E293B" }}>
          Slide Title
        </TextRun>
      </Text>

      <Notes>Notes go here.</Notes>
    </Slide>
  );
}
```

Then import in `src/ppt.tsx`:

```tsx
import { MySlide } from "./slides/NN-myslide";

export default function () {
  return (
    <Deck>
      <MySlide />
    </Deck>
  );
}
```

---

## Fragment — Group Children Without a Wrapper

Groups multiple children without producing a wrapper element. Useful when a component returns multiple siblings.

**Shorthand `<>...</>`** — for simple grouping without props:

```tsx
export default function TitleContent() {
  return (
    <>
      <Text x={1} y={3} w={10} h={1.5} fontSize={44} bold>Welcome</Text>
      <Text x={1} y={4.5} w={10} h={1} fontSize={18} color="666666">Subtitle</Text>
    </>
  );
}
```

**Explicit `<Fragment>`** — when you need a `key` prop (e.g., in a `.map()` loop):

```tsx
<Slide>
  {items.map((item) => (
    <Fragment key={item.id}>
      <Text x={1} y={item.y}>{item.name}</Text>
      <Text x={5} y={item.y}>{item.value}</Text>
    </Fragment>
  ))}
</Slide>
```

> `<>...</>` is a JSX compile-time syntax — it does not support props. For dynamic lists, always use `<Fragment key={...}>`.

---

## Notes — Speaker Notes

```tsx
<Slide>
  <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: "FFFFFF" }} />
  <Notes>Only visible to presenter.</Notes>
</Slide>
```

---

## Async Components

Components can be `async` functions — they are automatically detected and lazily resolved during rendering:

```tsx
// slides/data-slide.tsx
export default async function DataSlide() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();

  return (
    <Slide>
      <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: "FFFFFF" }} />
      <Text x={1} y={1} w={8} h={1} fontSize={32} bold>{data.title}</Text>
      <Text x={1} y={2.5} w={8} h={4} fontSize={16}>{data.description}</Text>
    </Slide>
  );
}
```

The JSX factory (`jsx`) wraps async component results in a `PptxNodePromise`, and the renderer resolves them during tree traversal.

---

## Lazy Slide Loading

Use the `component` prop on `<Slide>` to defer loading of slide definitions — analogous to React Router's lazy route loading.

```tsx
// slides/title-slide.tsx
export default function TitleSlide() {
  return (
    <>
      <Text x={1} y={3} w={10} h={1.5} fontSize={44} bold>Welcome</Text>
    </>
  );
}
```

```tsx
// main.tsx — lazy import
<Slide component={() => import("./slides/title-slide")} />
```

The component's return value is rendered **inside** the `<Slide>` that declares `component`, so it should provide slide **content only** — not another `<Slide>` element. Context hooks work inside lazy-loaded components.

---

## Sections — Group Slides in Outline View

```tsx
<Deck>
  <Slide>...</Slide>
  <Section title="Overview">
    <Slide>...</Slide>
    <Slide>...</Slide>
  </Section>
  <Section title="Details">
    <Slide>...</Slide>
  </Section>
</Deck>
```

---

## Masters — Reusable Slide Layouts

Define slide masters with reusable layout objects.

```tsx
<Deck>
  <Master name="myMaster" background={{ fill: "F5F5F5" }}>
    <Text x={1} y={0.3} w={10} h={0.5} fontSize={10} color="999999">
      Confidential
    </Text>
    <Rect x={0} y={7} w={13.333} h={0.5} fill={{ color: "4472C4" }} />
  </Master>

  <Slide masterName="myMaster">
    <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: "FFFFFF" }} />
    <Text x={1} y={2} w={8} h={1}>Content goes here</Text>
  </Slide>
</Deck>
```

### Placeholder Inside Masters

```tsx
<Master name="content">
  <Placeholder
    options={{ name: "Body", type: "body", x: 1, y: 1, w: 10, h: 5 }}
  />
</Master>
```
