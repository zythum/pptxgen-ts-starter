import { Slide, Text, TextRun, Notes, RoundRect } from "@artifact-kit/pptxgenjs-jsx";

export function AgendaSlide() {
  return (
    <Slide>
      {/* White background */}
      <RoundRect x={0} y={0} w={13.333} h={7.5} fill={{ color: "FFFFFF" }} rectRadius={0} />

      {/* Section title */}
      <Text x={0.8} y={0.6} w={6} h={0.9} align="left" valign="middle">
        <TextRun text="Agenda" options={{ fontSize: 30, bold: true, color: "1F2937" }} />
      </Text>

      {/* Accent line */}
      <RoundRect x={0.8} y={1.4} w={2.0} h={0.05} fill={{ color: "7C3AED" }} rectRadius={0.025} />

      {/* Card 1 - Text Elements */}
      <RoundRect x={0.8} y={2.0} w={3.6} h={2.2} fill={{ color: "F3F0FF" }} rectRadius={0.15} />
      <Text x={1.1} y={2.2} w={3.0} h={0.6} align="left" valign="middle">
        <TextRun text="📝 Text Elements" options={{ fontSize: 18, bold: true, color: "7C3AED" }} />
      </Text>
      <Text x={1.1} y={2.8} w={3.0} h={1.2} align="left" valign="top" lineSpacing={24}>
        <TextRun text="Text & TextRun" options={{ fontSize: 16, bold: true, color: "1F2937", breakLine: true }} />
        <TextRun text="Rich text formatting with color, bold, italics, and line breaks" options={{ fontSize: 14, color: "6B7280" }} />
      </Text>

      {/* Card 2 - Layout & Cards */}
      <RoundRect x={4.8} y={2.0} w={3.6} h={2.2} fill={{ color: "F3F0FF" }} rectRadius={0.15} />
      <Text x={5.1} y={2.2} w={3.0} h={0.6} align="left" valign="middle">
        <TextRun text="🎨 Layout & Cards" options={{ fontSize: 18, bold: true, color: "7C3AED" }} />
      </Text>
      <Text x={5.1} y={2.8} w={3.0} h={1.2} align="left" valign="top" lineSpacing={24}>
        <TextRun text="RoundRect & Positioning" options={{ fontSize: 16, bold: true, color: "1F2937", breakLine: true }} />
        <TextRun text="Card-based layouts with rounded rectangles and absolute positioning" options={{ fontSize: 14, color: "6B7280" }} />
      </Text>

      {/* Card 3 - Shapes */}
      <RoundRect x={8.8} y={2.0} w={3.6} h={2.2} fill={{ color: "F3F0FF" }} rectRadius={0.15} />
      <Text x={9.1} y={2.2} w={3.0} h={0.6} align="left" valign="middle">
        <TextRun text="🔷 Shapes" options={{ fontSize: 18, bold: true, color: "7C3AED" }} />
      </Text>
      <Text x={9.1} y={2.8} w={3.0} h={1.2} align="left" valign="top" lineSpacing={24}>
        <TextRun text="Rect, Oval, Line & more" options={{ fontSize: 16, bold: true, color: "1F2937", breakLine: true }} />
        <TextRun text="Built-in shapes with fill, stroke, and shadow options" options={{ fontSize: 14, color: "6B7280" }} />
      </Text>

      {/* Bottom section - workflow overview */}
      <RoundRect x={0.8} y={4.8} w={11.733} h={1.8} fill={{ color: "FAFAFA" }} rectRadius={0.15} />
      <Text x={1.2} y={5.0} w={11.0} h={1.4} align="left" valign="top" lineSpacing={30}>
        <TextRun text="Workflow" options={{ fontSize: 16, bold: true, color: "1F2937", breakLine: true }} />
        <TextRun text="Edit slides in src/slides/ → Preview in browser at localhost:5173 → Generate final .pptx with npm run generate" options={{ fontSize: 15, color: "6B7280" }} />
      </Text>

      <Notes>
        This presentation covers three main areas of the starter template:
        text elements, layout and card patterns, and shapes.
        We'll also demonstrate the edit-preview-generate workflow.
      </Notes>
    </Slide>
  );
}
