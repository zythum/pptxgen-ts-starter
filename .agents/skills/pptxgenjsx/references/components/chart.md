# Chart Component

## `<Chart>`

| Prop | Type | Description |
|------|------|-------------|
| `x` | `number` | Left offset (inches) |
| `y` | `number` | Top offset |
| `w` | `number` | Width |
| `h` | `number` | Height |
| `type` | `CHART_NAME` | `'area'\|'bar'\|'bar3D'\|'bubble'\|'doughnut'\|'line'\|'pie'\|'radar'\|'scatter'` |
| `data` | `OptsChartData[]` | Series data |
| `options` | `IChartOpts` | Chart options |

---

## Data Format (`OptsChartData[]`)

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Series name |
| `labels` | `string[] \| string[][]` | Category labels (supports multi-level) |
| `values` | `number[]` | Data values |
| `sizes` | `number[]` | Bubble sizes (only for `bubble`) |

---

## Chart Options

### Basic

`showTitle`, `showLegend`, `showValue`, `showPercent`, `showLabel`, `showSerName`, `chartColors`, `chartColorsOpacity`, `displayBlanksAs`

### Category Axis

`catAxisHidden`, `catAxisLabelColor`, `catAxisLabelFontBold`, `catAxisLabelFontFace`, `catAxisLabelFontSize`, `catAxisLabelPos`, `catAxisLabelRotate`, `catAxisTitle`, `catAxisLineShow`, `catAxisMajorTickMark`, `catGridLine`, `catAxisMultiLevelLabels`, `secondaryCatAxis`

### Value Axis

`valAxisHidden`, `valAxisLabelColor`, `valAxisLabelFontFace`, `valAxisLabelFontSize`, `valAxisTitle`, `valAxisMinVal`, `valAxisMaxVal`, `valAxisMajorUnit`, `valAxisLineShow`, `valGridLine`, `valAxisDisplayUnit` (`"thousands"\|"millions"\|"billions"`), `valAxisLogScaleBase`, `secondaryValAxis`

### Bar-Specific

| Option | Type | Description |
|--------|------|-------------|
| `barDir` | `"bar" \| "col"` | `"bar"`=horizontal, `"col"`=vertical |
| `barGrouping` | `"clustered" \| "stacked" \| "stacked100"` | Grouping mode |
| `barGapWidthPct` | `number` | 0–500 |
| `barOverlapPct` | `number` | -100–100 |

### Line-Specific

| Option | Type | Description |
|--------|------|-------------|
| `lineSize` | `number` | Line width in points |
| `lineDash` | `string` | Dash style |
| `lineSmooth` | `boolean` | Smooth curves |
| `lineDataSymbol` | `"circle"\|"diamond"\|"square"\|"triangle"\|"none"` | Data point symbol |
| `lineDataSymbolSize` | `number` | Symbol size |

### Doughnut

`holeSize` — size of center hole

### Data Labels

`dataLabelColor`, `dataLabelFontSize`, `dataLabelFontFace`, `dataLabelFontBold`, `dataLabelPosition` (`"b"\|"t"\|"l"\|"r"\|"ctr"\|"bestFit"\|"inEnd"\|"outEnd"`), `dataLabelFormatCode`

### Chart Area & Plot Area

```tsx
chartArea: {
  fill: { color: "FAFAFA" },
  border: { color: "E5E7EB", pt: 1 },
  roundedCorners: true,
},
plotArea: {
  fill: { color: "FFFFFF" },
},
```

### 3D

`v3DPerspective` (0–120), `v3DRotX` (0–359.9), `v3DRotY` (0–359.9), `v3DRAngAx`

---

## Example

```tsx
<Chart x={0.8} y={1.8} w={11.733} h={5.0} type="bar"
  data={[
    { name: "Revenue", labels: ["Q1","Q2","Q3","Q4"], values: [450, 520, 480, 610] },
    { name: "Costs", labels: ["Q1","Q2","Q3","Q4"], values: [320, 340, 310, 380] },
  ]}
  options={{
    showLegend: true,
    barGrouping: "clustered",
    chartColors: ["7C3AED", "10B981"],
    catAxisLabelFontSize: 12,
    valGridLine: { color: "E5E7EB", size: 1, style: "dash" },
  }}
/>
```

---

## Multi-Chart (Mixed Types)

```tsx
<Chart type="bar" x={0.5} y={1.5} w={9} h={5.5}
  data={[{ name: "Bars", labels: ["A","B","C","D"], values: [30,45,35,50] }]}
  options={{
    multi: [{
      type: "line",
      data: [{ name: "Line", labels: ["A","B","C","D"], values: [20,30,25,40] }],
      options: { secondaryValAxis: true },
    }],
    catAxes: [{}],
    valAxes: [{}, { secondaryValAxis: true }],
  }}
/>
```
