# Layouts — Core Library and Registered Variants

Canvas: 13.333 × 7.5 in (`LAYOUT_WIDE`). Safe margin: 0.8 in. Content area:
11.733 × 5.9 in.

Core layouts L1–L15 are preferred defaults. If none fits after reframing or
splitting content, register a variant in `.deck/spec.md` §8 before use.

All TSX snippets assume imports for pptxgenjsx components plus:

```tsx
import { colors } from "../token/colors";
import { typography } from "../token/typography";
```

They intentionally use runtime tokens; copy-paste examples must not introduce
bare hex or reusable literal font sizes.

## 1. Grid and spacing

### True 12-column option

With 11 gutters of 0.2 in:

```text
column = (11.733 - 11 × 0.2) / 12 = 0.7944 in
span(n) = n × 0.7944 + (n - 1) × 0.2
```

Convenience geometries used by the core library:

| Set              | Width/gap         | Note                                        |
| ---------------- | ----------------- | ------------------------------------------- |
| Full             | 11.733            | full content width                          |
| Half             | 5.7 + 0.333 + 5.7 | convenience split, not exact 6-column spans |
| Third            | 3.71 + 0.3 gaps   | convenience cards/process row               |
| Two-thirds/third | 7.7 + 0.333 + 3.7 | image/chart plus text                       |

### Spacing

| Use              |        Value |
| ---------------- | -----------: |
| Canvas margin    |       0.8 in |
| Title-to-content |       0.4 in |
| Card gap         | 0.25–0.35 in |
| Card padding     |       0.3 in |
| Heading-to-body  |  0.15–0.2 in |

### Layer order

1. full-canvas background;
2. low-contrast decorative accents;
3. surfaces/containers;
4. data, text, images;
5. callouts/highlights.

## 2. Core layouts

### L1. Cover

Centered or left-led topic, speaker, context. Sparse.

```tsx
<Text x={0.8} y={2.5} w={11.733} h={1.3} align="center">
  <TextRun
    text="Title Here"
    options={{ fontSize: typography.size.display, bold: true, color: colors.primary }}
  />
</Text>
<Text x={0.8} y={3.95} w={11.733} h={0.5} align="center">
  <TextRun
    text="Subtitle"
    options={{ fontSize: typography.size.subtitle, color: colors.muted }}
  />
</Text>
```

### L2. Section divider

Kicker plus chapter name. Sparse; use only when the outline calls for a page.

```tsx
<Text x={0.8} y={2.7} w={4} h={0.4}>
  <TextRun
    text="SECTION 01"
    options={{ fontSize: typography.size.caption, bold: true, color: colors.primary }}
  />
</Text>
<Text x={0.8} y={3.25} w={11.0} h={1.0}>
  <TextRun
    text="Section Name"
    options={{ fontSize: typography.size.section, bold: true, color: colors.primary }}
  />
</Text>
```

If the palette does not define `accentText`, use an approved readable role such
as `primary`; do not add a fallback expression to production if the token type
does not include that key.

### L3. Statement

One hero claim. Sparse.

```tsx
<Text x={1.5} y={2.35} w={10.333} h={2.5} align="center" valign="middle">
  <TextRun
    text="One big claim."
    options={{ fontSize: typography.size.statement, bold: true, color: colors.primary }}
  />
</Text>
```

### L4. Split

Text and visual/contrast halves.

```tsx
<Text x={0.8} y={1.55} w={5.7} h={0.8}>
  <TextRun
    text="Headline"
    options={{ fontSize: typography.size.title, bold: true, color: colors.primary }}
  />
</Text>
<Text x={0.8} y={2.55} w={5.7} h={2.8}>
  <TextRun text="Body copy" options={{ fontSize: typography.size.body, color: colors.text }} />
</Text>
<Rect x={6.833} y={1.55} w={5.7} h={4.8} fill={{ color: colors.surface }} />
```

### L5. Cards-3

Three equal cards. Medium.

```tsx
<>
  {[
    { title: "A", body: "First point" },
    { title: "B", body: "Second point" },
    { title: "C", body: "Third point" },
  ].map((card, index) => (
    <Group key={card.title} x={0.8 + index * 4.01} y={2.2} w={3.71} h={3.0}>
      <RoundRect
        x={0}
        y={0}
        w={3.71}
        h={3.0}
        rectRadius={0.15}
        fill={{ color: colors.surface }}
        line={{ color: colors.border, width: 1 }}
      />
      <Text x={0.3} y={0.3} w={3.11} h={0.55}>
        <TextRun
          text={card.title}
          options={{ fontSize: typography.size.subtitle, bold: true, color: colors.primary }}
        />
      </Text>
      <Text x={0.3} y={1.0} w={3.11} h={1.6}>
        <TextRun
          text={card.body}
          options={{ fontSize: typography.size.body, color: colors.text }}
        />
      </Text>
    </Group>
  ))}
</>
```

### L6. Stats / KPI

Two to four editable stat groups. Use the geometry for the actual count; never
reuse a two-item step for four items.

| Count | Item width |   Gap | X step | Right edge |
| ----: | ---------: | ----: | -----: | ---------: |
|     2 |        5.7 | 0.333 |  6.033 |     12.533 |
|     3 |       3.71 |   0.3 |   4.01 |      12.53 |
|     4 |      2.708 |   0.3 |  3.008 |     12.532 |

The four-item width is `(11.733 - 3 × 0.3) / 4 = 2.70825`, rounded to
three decimals. The snippet shows the three-item geometry:

```tsx
<>
  {[
    { value: "1.2M", label: "Users" },
    { value: "98%", label: "Uptime" },
    { value: "42", label: "Markets" },
  ].map((stat, index) => (
    <Group key={stat.label} x={0.8 + index * 4.01} y={2.4} w={3.71} h={1.6}>
      <Text x={0} y={0} w={3.71} h={0.9}>
        <TextRun
          text={stat.value}
          options={{ fontSize: typography.size.stat, bold: true, color: colors.accent }}
        />
      </Text>
      <Text x={0} y={1.0} w={3.71} h={0.4}>
        <TextRun
          text={stat.label}
          options={{ fontSize: typography.size.caption, color: colors.muted }}
        />
      </Text>
    </Group>
  ))}
</>
```

Use `accent` for numbers only when its pairing is approved for the value size;
otherwise use `primary`.

### L7. Timeline / Process

Three or four ordered steps.

```tsx
<>
  {[
    { step: "01", label: "Research" },
    { step: "02", label: "Build" },
    { step: "03", label: "Ship" },
  ].map((item, index) => (
    <Group key={item.step} x={0.8 + index * 4.01} y={3.2} w={3.71} h={1.5}>
      <Ellipse x={0} y={0} w={0.5} h={0.5} fill={{ color: colors.accent }} />
      <Text x={0} y={0.7} w={3.71} h={0.6}>
        <TextRun
          text={`${item.step} · ${item.label}`}
          options={{ fontSize: typography.size.body, bold: true, color: colors.primary }}
        />
      </Text>
    </Group>
  ))}
</>
```

### L8. Quote / Moment

Oversized quote plus attribution. Sparse.

```tsx
<Text x={1.5} y={2.2} w={10.333} h={2.1} align="center" valign="middle">
  <TextRun
    text="“The quote says it all.”"
    options={{ fontSize: typography.size.statement, italic: true, color: colors.primary }}
  />
</Text>
<Text x={1.5} y={4.45} w={10.333} h={0.45} align="center">
  <TextRun text="— Speaker, Title" options={{ fontSize: typography.size.caption, color: colors.muted }} />
</Text>
```

### L9. Closing / CTA

Mirror the cover; state action, contact, synthesis, or Q&A.

```tsx
<Text x={0.8} y={2.5} w={11.733} h={1.3} align="center">
  <TextRun
    text="Next step"
    options={{ fontSize: typography.size.display, bold: true, color: colors.primary }}
  />
</Text>
<Text x={0.8} y={3.95} w={11.733} h={0.5} align="center">
  <TextRun text="Owner · Timing · Contact" options={{ fontSize: typography.size.body, color: colors.muted }} />
</Text>
```

### L10. Chart + takeaway

Title, concise takeaway column, and large editable chart slot.

```tsx
<Text x={0.8} y={0.8} w={11.733} h={0.6}>
  <TextRun text="Chart title" options={{ fontSize: typography.size.title, bold: true, color: colors.primary }} />
</Text>
<Text x={0.8} y={1.75} w={3.2} h={3.8}>
  <TextRun text="One conclusion from the chart" options={{ fontSize: typography.size.subtitle, color: colors.text }} />
</Text>
<Rect x={4.35} y={1.65} w={8.18} h={4.75} fill={{ color: colors.surface }} />
```

Replace the slot Rect with a code-native `<Chart>` using the pptxgenjsx API.

### L11. Table / Matrix

Title plus full-width table/matrix slot and short takeaway.

```tsx
<Text x={0.8} y={0.8} w={11.733} h={0.6}>
  <TextRun text="Matrix title" options={{ fontSize: typography.size.title, bold: true, color: colors.primary }} />
</Text>
<Rect x={0.8} y={1.65} w={11.733} h={4.45} fill={{ color: colors.surface }} />
<Text x={0.8} y={6.25} w={11.733} h={0.4}>
  <TextRun text="Takeaway or source" options={{ fontSize: typography.size.caption, color: colors.muted }} />
</Text>
```

Replace the slot with an editable `<Table>` or explicit matrix shapes.

### L12. Screenshot / Product demo

Large screenshot with a narrow explanation/callout rail.

```tsx
<Rect x={0.8} y={1.45} w={8.3} h={5.1} fill={{ color: colors.surface }} />
<Text x={9.45} y={1.55} w={3.08} h={0.8}>
  <TextRun text="What to notice" options={{ fontSize: typography.size.title, bold: true, color: colors.primary }} />
</Text>
<Text x={9.45} y={2.55} w={3.08} h={2.8}>
  <TextRun text="Explain the interface or demo step" options={{ fontSize: typography.size.body, color: colors.text }} />
</Text>
```

The screenshot slot requires privacy, permission, and ratio review.

### L13. Two-card comparison

Equal 5.7 in panels with a 0.333 in gap.

```tsx
<>
  {[
    { title: "Option A", body: "Trade-off" },
    { title: "Option B", body: "Trade-off" },
  ].map((option, index) => (
    <Group key={option.title} x={0.8 + index * 6.033} y={1.8} w={5.7} h={4.5}>
      <RoundRect
        x={0}
        y={0}
        w={5.7}
        h={4.5}
        rectRadius={0.15}
        fill={{ color: colors.surface }}
        line={{ color: colors.border, width: 1 }}
      />
      <Text x={0.35} y={0.35} w={5.0} h={0.6}>
        <TextRun
          text={option.title}
          options={{ fontSize: typography.size.title, bold: true, color: colors.primary }}
        />
      </Text>
      <Text x={0.35} y={1.2} w={5.0} h={2.7}>
        <TextRun
          text={option.body}
          options={{ fontSize: typography.size.body, color: colors.text }}
        />
      </Text>
    </Group>
  ))}
</>
```

### L14. Architecture / Flow

Three major nodes and connectors; keep details in notes or follow-up pages.

```tsx
<>
  {[
    { id: "A", label: "Input" },
    { id: "B", label: "System" },
    { id: "C", label: "Outcome" },
  ].map((node, index) => (
    <Group key={node.id} x={0.8 + index * 4.01} y={2.7} w={3.71} h={1.8}>
      <RoundRect
        x={0}
        y={0}
        w={3.71}
        h={1.8}
        rectRadius={0.15}
        fill={{ color: colors.surface }}
        line={{ color: colors.border, width: 1 }}
      />
      <Text x={0.3} y={0.55} w={3.11} h={0.6} align="center">
        <TextRun
          text={node.label}
          options={{ fontSize: typography.size.subtitle, bold: true, color: colors.primary }}
        />
      </Text>
    </Group>
  ))}
</>
```

Add connectors with the component/API documented in the pptxgenjsx skill; do not
fake direction using ambiguous decorative lines.

### L15. Image-led story

Large prepared image plus a concise narrative rail.

```tsx
<Rect x={0.8} y={1.35} w={7.7} h={5.35} fill={{ color: colors.surface }} />
<Text x={8.833} y={1.65} w={3.7} h={1.2}>
  <TextRun text="Human story" options={{ fontSize: typography.size.title, bold: true, color: colors.primary }} />
</Text>
<Text x={8.833} y={3.0} w={3.7} h={2.4}>
  <TextRun text="One concise narrative and its implication" options={{ fontSize: typography.size.body, color: colors.text }} />
</Text>
```

Replace the image slot only after `06-visuals.md` ratio/provenance checks.

## 3. Role mapping

| Role      | Preferred core layouts |
| --------- | ---------------------- |
| Cover     | L1                     |
| Section   | L2                     |
| Statement | L3, L6                 |
| Explain   | L4, L5, L14            |
| Evidence  | L6, L10, L11           |
| Contrast  | L4, L13                |
| Process   | L7, L14                |
| Demo      | L12                    |
| Moment    | L8, L15                |
| Closing   | L9                     |

## 4. Registered variant protocol

When no core layout fits:

1. re-check the page role and split content if necessary;
2. choose the nearest parent layout;
3. add spec §8 entry: `V-<parent>-<name>`, geometry, reason, affected pages;
4. update spec §7 and slide comment before coding;
5. apply the same variant consistently where reused.

A variant is controlled extension, not permission for arbitrary composition.

## 5. Consistency checks

- Same approved margin and title line across comparable pages.
- Equal card geometry/gaps/padding.
- Cover and closing echo.
- Text measured with actual font/leading.
- Visual slot ratio fixed before asset preparation.
- Palette pairings follow `palettes.md`; fill-only accent is not text.
- All code examples and production slides use tokens for color/type.
