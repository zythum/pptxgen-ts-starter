# Slide & Deck

## Deck — Root Element

Wraps all slides. Must be the **default export** of `src/ppt.tsx`.

| Prop     | Type                                              | Description                                            |
| -------- | ------------------------------------------------- | ------------------------------------------------------ |
| `title`  | `string`                                          | Presentation title                                     |
| `author` | `string`                                          | Author name                                            |
| `layout` | `{ name: string, width: number, height: number }` | Slide dimensions in inches. Default: `WIDE` 13.333×7.5 |

```tsx
<Deck title="My Talk" author="You" layout={{ name: "WIDE", width: 13.333, height: 7.5 }}>
  <TitleSlide />
</Deck>
```

## Slide — A Single Slide

Children are positioned absolutely. Each slide **must** start with a full-size background shape.

| Prop           | Type               | Description                                                                             |
| -------------- | ------------------ | --------------------------------------------------------------------------------------- |
| `background`   | `BackgroundProps`  | Background color or image (`{ color: "FFFFFF" }`, `{ path: "..." }`, `{ data: "..." }`) |
| `color`        | `HexColor`         | Default text color for the slide                                                        |
| `hidden`       | `boolean`          | Whether the slide is hidden in the presentation                                         |
| `slideNumber`  | `SlideNumberProps` | Slide number formatting options                                                         |
| `masterName`   | `string`           | Master slide name (layout) to apply                                                     |
| `sectionTitle` | `string`           | Section this slide belongs to                                                           |

### Minimal Slide Template

```tsx
import { Slide, Rect, Text, TextRun, Notes, type PptxNode } from "@zythum02/pptxgenjsx";

export async function MySlide(): Promise<PptxNode> {
  return (
    <Slide>
      {/* Full-size background — mandatory */}
      <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: "FFFFFF" }} />

      <Text x={0.8} y={0.6} w={8} h={0.8} align="left" valign="middle">
        <TextRun text="Slide Title" options={{ fontSize: 24, bold: true, color: "1E293B" }} />
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

## Notes — Speaker Notes

```tsx
<Slide>
  <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: "FFFFFF" }} />
  <Notes>Only visible to presenter.</Notes>
</Slide>
```
