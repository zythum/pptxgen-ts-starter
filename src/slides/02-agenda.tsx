import { Text, TextRun, Notes, RoundRect, Group } from "@zythum02/pptxgenjsx";
import { SlideBackground } from "../components/SlideBackground";
import { SectionHeader } from "../components/SectionHeader";
import { Card } from "../components/Card";
import { PageNumber } from "../components/PageNumber";

export default async function () {
  return (
    <>
      <SlideBackground color="light" />
      <PageNumber />
      <SectionHeader title="Agenda" />

      {/* Three agenda cards — x positions relative to group */}
      <Group x={0.8} y={2.0} w={11.733} h={2.4}>
        {/* Card 1 - Text Elements */}
        <Card x={0} y={0} w={3.6} h={2.2} fill="F3F0FF">
          <Text x={0.3} y={0.2} w={3.0} h={0.6} align="left" valign="middle">
            <TextRun
              text="📝 Text Elements"
              options={{ fontSize: 18, bold: true, color: "7C3AED" }}
            />
          </Text>
          <Text x={0.3} y={0.8} w={3.0} h={1.2} align="left" valign="top" lineSpacing={24}>
            <TextRun
              text="Text & TextRun"
              options={{ fontSize: 16, bold: true, color: "1F2937", breakLine: true }}
            />
            <TextRun
              text="Rich text formatting with color, bold, italics, and line breaks"
              options={{ fontSize: 14, color: "6B7280" }}
            />
          </Text>
        </Card>

        {/* Card 2 - Layout & Cards */}
        <Card x={4.0} y={0} w={3.6} h={2.2} fill="F3F0FF">
          <Text x={0.3} y={0.2} w={3.0} h={0.6} align="left" valign="middle">
            <TextRun
              text="🎨 Layout & Cards"
              options={{ fontSize: 18, bold: true, color: "7C3AED" }}
            />
          </Text>
          <Text x={0.3} y={0.8} w={3.0} h={1.2} align="left" valign="top" lineSpacing={24}>
            <TextRun
              text="RoundRect & Positioning"
              options={{ fontSize: 16, bold: true, color: "1F2937", breakLine: true }}
            />
            <TextRun
              text="Card-based layouts with rounded rectangles and absolute positioning"
              options={{ fontSize: 14, color: "6B7280" }}
            />
          </Text>
        </Card>

        {/* Card 3 - Shapes */}
        <Card x={8.0} y={0} w={3.6} h={2.2} fill="F3F0FF">
          <Text x={0.3} y={0.2} w={3.0} h={0.6} align="left" valign="middle">
            <TextRun text="🔷 Shapes" options={{ fontSize: 18, bold: true, color: "7C3AED" }} />
          </Text>
          <Text x={0.3} y={0.8} w={3.0} h={1.2} align="left" valign="top" lineSpacing={24}>
            <TextRun
              text="Rect, Oval, Line & more"
              options={{ fontSize: 16, bold: true, color: "1F2937", breakLine: true }}
            />
            <TextRun
              text="Built-in shapes with fill, stroke, and shadow options"
              options={{ fontSize: 14, color: "6B7280" }}
            />
          </Text>
        </Card>
      </Group>

      {/* Bottom section - workflow overview */}
      <RoundRect x={0.8} y={4.8} w={11.733} h={1.8} fill={{ color: "FAFAFA" }} rectRadius={0.15} />
      <Text x={1.2} y={5.0} w={11.0} h={1.4} align="left" valign="top" lineSpacing={30}>
        <TextRun
          text="Workflow"
          options={{ fontSize: 16, bold: true, color: "1F2937", breakLine: true }}
        />
        <TextRun
          text="Edit slides in src/slides/ → Preview in browser at localhost:5173 → Generate final .pptx with npm run generate"
          options={{ fontSize: 15, color: "6B7280" }}
        />
      </Text>

      <Notes>
        This presentation covers three main areas of the starter template: text elements, layout and
        card patterns, and shapes. We'll also demonstrate the edit-preview-generate workflow.
      </Notes>
    </>
  );
}
