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
      <SectionHeader title="Text Elements" />

      {/* Left column - rich text demo */}
      <Card x={0.8} y={2.0} w={5.6} h={4.8} fill="F3F0FF">
        <Text x={0.3} y={0.2} w={5.0} h={0.5} align="left" valign="middle">
          <TextRun
            text="Rich Text Formatting"
            options={{ fontSize: 18, bold: true, color: "7C3AED" }}
          />
        </Text>
        <Text x={0.3} y={0.9} w={5.0} h={3.5} align="left" valign="top" lineSpacing={32}>
          <TextRun
            text="This text is bold"
            options={{ fontSize: 16, bold: true, color: "1F2937" }}
          />
          <TextRun
            text=" and this is italic"
            options={{ fontSize: 16, italic: true, color: "1F2937" }}
          />
          <TextRun
            text=" with mixed formatting."
            options={{ fontSize: 16, color: "6B7280", breakLine: true }}
          />
          <TextRun
            text="Large Heading"
            options={{ fontSize: 24, bold: true, color: "1F2937", breakLine: true }}
          />
          <TextRun
            text="Small caption text"
            options={{ fontSize: 12, color: "9CA3AF", breakLine: true }}
          />
          <TextRun
            text="Accent colored text"
            options={{ fontSize: 16, color: "7C3AED", breakLine: true }}
          />
          <TextRun text="Multi-line text with" options={{ fontSize: 15, color: "4B5563" }} />
          <TextRun text="automatic line spacing." options={{ fontSize: 15, color: "4B5563" }} />
        </Text>
      </Card>

      {/* Right column - usage code demo */}
      <Group x={6.8} y={2.0} w={5.733} h={4.8}>
        <RoundRect x={0} y={0} w={5.733} h={4.8} fill={{ color: "1E1E2E" }} rectRadius={0.15} />
        <Text x={0.4} y={0.2} w={5.0} h={0.5} align="left" valign="middle">
          <TextRun text="JSX Usage" options={{ fontSize: 18, bold: true, color: "A78BFA" }} />
        </Text>

        {/* Code-like text block — each JSX element formatted with one prop per line */}
        <Text x={0.4} y={0.9} w={5.0} h={4.2} align="left" valign="top" lineSpacing={15}>
          <TextRun
            text={"<Text x={0.8} y={2.9} w={5.0} h={3.5}>"}
            options={{ fontSize: 11, fontFace: "Courier New", color: "F87171", breakLine: true }}
          />
          <TextRun
            text={"  <TextRun"}
            options={{ fontSize: 11, fontFace: "Courier New", color: "A78BFA", breakLine: true }}
          />
          <TextRun
            text={'    text="Bold text"'}
            options={{ fontSize: 11, fontFace: "Courier New", color: "E2E8F0", breakLine: true }}
          />
          <TextRun
            text={"    options={{bold: true}}"}
            options={{ fontSize: 11, fontFace: "Courier New", color: "E2E8F0", breakLine: true }}
          />
          <TextRun
            text={"  />"}
            options={{ fontSize: 11, fontFace: "Courier New", color: "A78BFA", breakLine: true }}
          />
          <TextRun
            text={"  <TextRun"}
            options={{ fontSize: 11, fontFace: "Courier New", color: "A78BFA", breakLine: true }}
          />
          <TextRun
            text={'    text="Italic text"'}
            options={{ fontSize: 11, fontFace: "Courier New", color: "E2E8F0", breakLine: true }}
          />
          <TextRun
            text={"    options={{italic: true}}"}
            options={{ fontSize: 11, fontFace: "Courier New", color: "E2E8F0", breakLine: true }}
          />
          <TextRun
            text={"  />"}
            options={{ fontSize: 11, fontFace: "Courier New", color: "A78BFA", breakLine: true }}
          />
          <TextRun
            text={"  <TextRun"}
            options={{ fontSize: 11, fontFace: "Courier New", color: "A78BFA", breakLine: true }}
          />
          <TextRun
            text={'    text="Colored text"'}
            options={{ fontSize: 11, fontFace: "Courier New", color: "E2E8F0", breakLine: true }}
          />
          <TextRun
            text={'    options={{color:"7C3AED"}}'}
            options={{ fontSize: 11, fontFace: "Courier New", color: "E2E8F0", breakLine: true }}
          />
          <TextRun
            text={"  />"}
            options={{ fontSize: 11, fontFace: "Courier New", color: "A78BFA", breakLine: true }}
          />
          <TextRun
            text={"</Text>"}
            options={{ fontSize: 11, fontFace: "Courier New", color: "F87171", breakLine: true }}
          />
        </Text>
      </Group>

      <Notes>
        This slide demonstrates the Text and TextRun components. Each TextRun can have its own
        formatting options: fontSize, bold, italic, color, and breakLine. The Text component handles
        positioning, alignment, and line spacing.
      </Notes>
    </>
  );
}
