# Shape Components

All shapes accept: `fill`, `line`, `shadow`, `flipH`, `flipV`, `rotate`, `hyperlink`, plus `x, y, w, h`.

## Dedicated Components

| Component | Extra Props | Notes |
|-----------|-------------|-------|
| `<Rect>` | — | Pure rectangle. Use for backgrounds, lines, accent bars |
| `<RoundRect>` | `rectRadius` (0.0–1.0) | Rounded corners. Cards, badges, buttons |
| `<Ellipse>` / `<Oval>` | — | Circles and ovals |
| `<Line>` | — | Line in PPT box model |
| `<LineBetween>` | `x1, y1, x2, y2` | Line between endpoints. Handles `flipH/flipV` automatically |
| `<Arc>` | `angleRange: [start, end]` (0–359°) | Arc |
| `<BlockArc>` | `angleRange`, `arcThicknessRatio` | Arc with thickness |
| `<PieShape>` | `angleRange` | Pie/wedge |
| `<Triangle>` | — | Triangle |
| `<RightTriangle>` | — | Right triangle |
| `<Diamond>` | — | Diamond |
| `<Pentagon>` | — | Pentagon |
| `<Hexagon>` | — | Hexagon |
| `<Star>`, `<Star4>`, `<Star5>`, `<Star6>`, `<Star8>`, `<Star10>` | — | Stars |
| `<LeftArrow>`, `<RightArrow>`, `<UpArrow>`, `<DownArrow>` | — | Directional arrows |
| `<LeftRightArrow>`, `<UpDownArrow>` | — | Bidirectional arrows |
| `<Chevron>` | — | Chevron |
| `<Cloud>` | — | Cloud |
| `<Heart>` | — | Heart |
| `<Donut>` | — | Donut |
| `<Plus>` | — | Plus sign |
| `<CustomGeometry>` | `points: CustomGeometryPoint[]` | Custom SVG-derived path |

### Critical Rule

> **Never use `<RoundRect rectRadius={0} />` as a substitute for `<Rect>`. If it's a pure rectangle, use `<Rect>`.**

---

## CustomGeometry — SVG Path to PPT

`CustomGeometryPoint`:

```tsx
| { x: Coord; y: Coord; moveTo?: boolean }
| { x: Coord; y: Coord; curve: { type: "cubic"; x1: Coord; y1: Coord; x2: Coord; y2: Coord } }
| { x: Coord; y: Coord; curve: { type: "quadratic"; x1: Coord; y1: Coord } }
| { x: Coord; y: Coord; curve: { type: "arc"; hR: Coord; wR: Coord; stAng: number; swAng: number } }
| { close: true }
```

### SVG Conversion Steps

1. Compute source SVG bounding box in px
2. Convert to PPT inches: `x = inch(svgLeftPx + bbox.x * scale)`, `w = inch(bbox.w * scale)`
3. Map SVG commands: `M` → `{ moveTo: true }`, `L/H/V` → line points, `C` → cubic, `Q` → quadratic, `Z` → `{ close: true }`

```tsx
<CustomGeometry x={1} y={1} w={3} h={2} fill={{ color: "7C3AED" }}
  points={[
    { x: 0, y: 0, moveTo: true },
    { x: 3, y: 0 },
    { x: 3, y: 2 },
    { x: 1.5, y: 1, curve: { type: "quadratic", x1: 1, y1: 0.5 } },
    { close: true },
  ]}
/>
```

---

## Generic `<Shape>` — Any Other PptxGenJS Shape

```tsx
<Shape shape="lightningBolt" x={1} y={1} w={3} h={3} fill={{ color: "F59E0B" }} />
```

### Full SHAPE_NAME List (~180)

Basic: `"rect"`, `"roundRect"`, `"ellipse"`, `"triangle"`, `"diamond"`, `"pentagon"`, `"hexagon"`, `"chevron"`, `"cloud"`, `"heart"`, `"lightningBolt"`, `"moon"`, `"sun"`, `"smileyFace"`, `"noSmoking"`, `"pie"`, `"pieWedge"`, `"donut"`, `"plus"`, `"octagon"`, `"decagon"`, `"dodecagon"`, `"heptagon"`, `"bevel"`, `"can"`, `"cube"`, `"funnel"`, `"frame"`, `"folderCorner"`, `"plaque"`, `"cornerTabs"`, `"squareTabs"`, `"leftBrace"`, `"rightBrace"`, `"leftBracket"`, `"rightBracket"`, `"bracePair"`, `"bracketPair"`, `"halfFrame"`, `"corner"`, `"diagStripe"`, `"homePlate"`, `"parallelogram"`, `"nonIsoscelesTrapezoid"`, `"trapezoid"`, `"teardrop"`, `"chord"`, `"wave"`, `"doubleWave"`, `"ellipseRibbon"`, `"ellipseRibbon2"`, `"ribbon"`, `"ribbon2"`, `"leftRightRibbon"`, `"verticalScroll"`, `"horizontalScroll"`

Arrows: `"circularArrow"`, `"leftCircularArrow"`, `"leftRightCircularArrow"`, `"bentArrow"`, `"bentUpArrow"`, `"curvedDownArrow"`, `"curvedLeftArrow"`, `"curvedRightArrow"`, `"curvedUpArrow"`, `"swooshArrow"`, `"uturnArrow"`, `"notchedRightArrow"`, `"stripedRightArrow"`, `"quadArrow"`

Callouts: `"callout1"`, `"callout2"`, `"callout3"`, `"borderCallout1"`, `"borderCallout2"`, `"borderCallout3"`, `"accentCallout1"`, `"accentCallout2"`, `"accentCallout3"`, `"accentBorderCallout1"`, `"accentBorderCallout2"`, `"accentBorderCallout3"`, `"wedgeEllipseCallout"`, `"wedgeRectCallout"`, `"wedgeRoundRectCallout"`, `"cloudCallout"`

Arrow Callouts: `"upArrowCallout"`, `"downArrowCallout"`, `"leftArrowCallout"`, `"rightArrowCallout"`, `"leftRightArrowCallout"`, `"upDownArrowCallout"`, `"quadArrowCallout"`

Action Buttons: `"actionButtonBlank"`, `"actionButtonHome"`, `"actionButtonHelp"`, `"actionButtonInformation"`, `"actionButtonForwardNext"`, `"actionButtonBackPrevious"`, `"actionButtonEnd"`, `"actionButtonBeginning"`, `"actionButtonReturn"`, `"actionButtonDocument"`, `"actionButtonSound"`, `"actionButtonMovie"`

Flowchart: `"flowChartProcess"`, `"flowChartDecision"`, `"flowChartInputOutput"`, `"flowChartPredefinedProcess"`, `"flowChartInternalStorage"`, `"flowChartDocument"`, `"flowChartMultidocument"`, `"flowChartTerminator"`, `"flowChartPreparation"`, `"flowChartManualInput"`, `"flowChartManualOperation"`, `"flowChartConnector"`, `"flowChartPunchedCard"`, `"flowChartPunchedTape"`, `"flowChartSummingJunction"`, `"flowChartOr"`, `"flowChartCollate"`, `"flowChartSort"`, `"flowChartExtract"`, `"flowChartMerge"`, `"flowChartOfflineStorage"`, `"flowChartOnlineStorage"`, `"flowChartMagneticTape"`, `"flowChartMagneticDisk"`, `"flowChartMagneticDrum"`, `"flowChartDisplay"`, `"flowChartDelay"`, `"flowChartAlternateProcess"`, `"flowChartOffpageConnector"`

Stars & More: `"star4"`, `"star5"`, `"star6"`, `"star7"`, `"star8"`, `"star10"`, `"star12"`, `"star16"`, `"star24"`, `"star32"`, `"round1Rect"`, `"round2DiagRect"`, `"round2SameRect"`, `"snip1Rect"`, `"snip2DiagRect"`, `"snip2SameRect"`, `"snipRoundRect"`, `"chartPlus"`, `"chartStar"`, `"chartX"`, `"gear6"`, `"gear9"`, `"irregularSeal1"`, `"irregularSeal2"`, `"lineInv"`, `"line"`, `"mathDivide"`, `"mathEqual"`, `"mathMinus"`, `"mathMultiply"`, `"mathNotEqual"`, `"mathPlus"`

---

## Combining Shapes: Process Flow

Demonstrates numbered step circles (Ellipse) with connecting lines (LineBetween), labels (Text), and accent bars (Rect):

```tsx
<Slide>
  <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: "0F172A" }} />
  {[
    { num: "01", title: "Plan", desc: "Define scope", color: "7C3AED" },
    { num: "02", title: "Build", desc: "Develop & integrate", color: "3B82F6" },
    { num: "03", title: "Launch", desc: "Deploy to prod", color: "10B981" },
  ].map((step, i) => {
    const x = 0.8 + i * 3.133;
    return (
      <>
        <Ellipse x={x} y={2.0} w={1.2} h={1.2} fill={{ color: step.color }} />
        <Text x={x} y={2.0} w={1.2} h={1.2} align="center" valign="middle">
          <TextRun text={step.num} options={{ fontSize: 16, bold: true, color: "FFFFFF" }} />
        </Text>
        {i < 2 && (
          <LineBetween x1={x + 1.2} y1={2.6} x2={x + 2.833} y2={2.6}
            line={{ color: "334155", width: 2 }} />
        )}
        <Text x={x - 0.2} y={3.5} w={2.8} h={0.6} align="center" valign="middle">
          <TextRun text={step.title} options={{ fontSize: 20, bold: true, color: "FFFFFF" }} />
        </Text>
        <Text x={x - 0.2} y={4.1} w={2.8} h={0.5} align="center" valign="middle">
          <TextRun text={step.desc} options={{ fontSize: 13, color: "94A3B8" }} />
        </Text>
        <Rect x={x + 0.4} y={4.7} w={0.4} h={0.04} fill={{ color: step.color }} />
      </>
    );
  })}
</Slide>
```
