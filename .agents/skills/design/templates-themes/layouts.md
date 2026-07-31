# Layouts — Locked Layout Library

Canvas: 13.333 × 7.5 in (`LAYOUT_WIDE`). Safe margin **0.8 in** → content area
11.733 × 5.9 in.

> **Lock rule (borrowed from guizang-ppt-skill):** pick layouts ONLY from this
> library. Do not invent new layouts — locked layouts keep the deck coherent and
> the implementation verifiable. If none fits, change the slide role or split
> the content, not the layout system.

## Grid

- 12-column mental grid over the content area (column ≈ 0.978 in, gutter 0.2 in).
- Column widths: full 11.733 / half 5.7 / third 3.7 / two-thirds 7.7 in.

## Element stacking order (Z)

1. Background — full-canvas `<SlideBackground />` (always first child)
2. Decorative accents — low-contrast shapes, dimmed
3. Content containers — cards, panels
4. Text & images
5. Highlight overlays — accent bars, callouts

## Spacing scale

Base unit 0.2 in.

| Use                             | Gap          |
| ------------------------------- | ------------ |
| Slide margin                    | 0.8 in       |
| Between cards in a row          | 0.25–0.35 in |
| Card internal padding           | 0.3 in       |
| Between title block and content | 0.4 in       |
| Between heading and its body    | 0.15 in      |

## The 9 locked layouts

> Code below uses bare hex / numeric sizes only to keep the examples short —
> real slides must reference `colors.*` / `typography.*` and the locked spec
> (see `workflow/04-spec` + `workflow/04b-token-files.md`).

### L1. Cover

Full-bleed hero, topic + speaker. Centered, sparse (1–15 words).

```tsx
<Text x={0.8} y={2.6} w={11.733} h={1.2} align="center">
  <TextRun text="Title Here" options={{ fontSize: 44, bold: true, color: "1F2937" }} />
</Text>
<Text x={0.8} y={3.9} w={11.733} h={0.6} align="center">
  <TextRun text="Subtitle" options={{ fontSize: 18, color: "6B7280" }} />
</Text>
```

### L2. Section divider

Announce a new part. Kicker + big section name.

```tsx
<Text x={0.8} y={2.8} w={4} h={0.5}>
  <TextRun text="SECTION 01" options={{ fontSize: 14, bold: true, color: "7C3AED" }} />
</Text>
<Text x={0.8} y={3.3} w={11} h={1}>
  <TextRun text="Section Name" options={{ fontSize: 36, bold: true, color: "1F2937" }} />
</Text>
```

### L3. Statement (hero claim)

One big claim, huge type, centered.

```tsx
<Text x={1.5} y={2.4} w={10.333} h={2.4} align="center" valign="middle">
  <TextRun text="One big claim." options={{ fontSize: 40, bold: true, color: "1F2937" }} />
</Text>
```

### L4. Split (text + visual)

Left text (5.7), right visual (5.68). Explain / Contrast / Moment.

```tsx
<Text x={0.8} y={1.6} w={5.7} h={0.8}>
  <TextRun text="Headline" options={{ fontSize: 28, bold: true, color: "1F2937" }} />
</Text>
<Text x={0.8} y={2.6} w={5.7} h={2.5}>
  <TextRun text="Body copy, left-aligned, 16pt." options={{ fontSize: 16, color: "4B5563" }} />
</Text>
<Rect x={6.85} y={1.6} w={5.68} h={4.3} fill={{ color: "F3F4F6" }} />
```

### L5. Cards-3 (equal width row)

3 cards, each 3.71 w, gap 0.3. Use `<Group>` so card children are relative.

```tsx
{
  [
    { title: "A", body: "…" },
    { title: "B", body: "…" },
    { title: "C", body: "…" },
  ].map((c, i) => (
    <Group key={i} x={0.8 + i * 4.01} y={2.2} w={3.71} h={3}>
      <RoundRect
        x={0}
        y={0}
        w={3.71}
        h={3}
        rectRadius={0.15}
        fill={{ color: "FFFFFF" }}
        line={{ color: "E5E7EB", width: 1 }}
      />
      <Text x={0.3} y={0.3} w={3.11} h={0.6}>
        <TextRun text={c.title} options={{ fontSize: 18, bold: true, color: "1F2937" }} />
      </Text>
      <Text x={0.3} y={1} w={3.11} h={1.7}>
        <TextRun text={c.body} options={{ fontSize: 13, color: "4B5563" }} />
      </Text>
    </Group>
  ));
}
```

### L6. Stats / KPI

Big tabular numbers + labels. Evidence / Statement.

```tsx
{
  [
    { value: "1.2M", label: "Users" },
    { value: "98%", label: "Uptime" },
  ].map((s, i) => (
    <Group key={i} x={0.8 + i * 3.2} y={2.4} w={2.9} h={1.6}>
      <Text x={0} y={0} w={2.9} h={0.9}>
        <TextRun text={s.value} options={{ fontSize: 40, bold: true, color: "7C3AED" }} />
      </Text>
      <Text x={0} y={1} w={2.9} h={0.4}>
        <TextRun text={s.label} options={{ fontSize: 13, color: "6B7280" }} />
      </Text>
    </Group>
  ));
}
```

### L7. Timeline / Process

Sequence with steps. Process role.

```tsx
{
  [
    { step: "01", label: "Research" },
    { step: "02", label: "Build" },
    { step: "03", label: "Ship" },
  ].map((t, i) => (
    <Group key={i} x={0.8 + i * 4.01} y={3.4} w={3.71} h={1.5}>
      <Ellipse x={0} y={0} w={0.5} h={0.5} fill={{ color: "7C3AED" }} />
      <Text x={0} y={0.7} w={3.71} h={0.8}>
        <TextRun
          text={`${t.step} · ${t.label}`}
          options={{ fontSize: 14, bold: true, color: "1F2937" }}
        />
      </Text>
    </Group>
  ));
}
```

### L8. Quote (moment)

Sparse, oversized quote + attribution.

```tsx
<Text x={1.5} y={2.3} w={10.333} h={2} align="center" valign="middle">
  <TextRun text="“The quote says it all.”" options={{ fontSize: 30, italic: true, color: "1F2937" }} />
</Text>
<Text x={1.5} y={4.4} w={10.333} h={0.5} align="center">
  <TextRun text="— Speaker, Title" options={{ fontSize: 14, color: "6B7280" }} />
</Text>
```

### L9. Closing / CTA

Thanks + contact, echoes the cover.

```tsx
<Text x={0.8} y={2.6} w={11.733} h={1.2} align="center">
  <TextRun text="Thank you" options={{ fontSize: 44, bold: true, color: "1F2937" }} />
</Text>
<Text x={0.8} y={3.9} w={11.733} h={0.6} align="center">
  <TextRun text="Contact · Links · Q&A" options={{ fontSize: 16, color: "6B7280" }} />
</Text>
```

## Role → layout mapping

| Role      | Layout                         |
| --------- | ------------------------------ |
| Cover     | L1 Cover                       |
| Section   | L2 Section divider             |
| Statement | L3 Statement / L6 Stats        |
| Explain   | L4 Split / L5 Cards / L8 Quote |
| Evidence  | L6 Stats / data chart          |
| Contrast  | L4 Split / L5 Cards            |
| Process   | L7 Timeline                    |
| Moment    | L8 Quote                       |
| Closing   | L9 Closing                     |

## Consistency rules

- Same margin (0.8) on every slide.
- Cards in a row: identical geometry, equal gaps, same padding.
- Titles at the same `y` across pages (e.g. 0.8) so pages align when flipping.
- Cover and closing mirror each other.
- Measure text with `scripts/estimate-text.ts` before finalizing `h`.
- Examples assume `<SlideBackground color="light" />` and the default palette —
  adapt hex values from the locked spec (`workflow/04-spec`).
