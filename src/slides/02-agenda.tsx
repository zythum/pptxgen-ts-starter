import { Text, TextRun, Notes, RoundRect, Group } from "@zythum02/pptxgenjsx";
import { SlideBackground } from "../components/SlideBackground";
import { SectionHeader } from "../components/SectionHeader";
import { Card } from "../components/Card";
import { PageNumber } from "../components/PageNumber";
import { colors } from "../token/colors";
import { typography } from "../token/typography";

// slide: 02 | role: Explain | layout: V-L5-workflow-strip | core: The starter combines text, layout/card, and shape primitives in an edit-preview-generate loop | sources: user-material:agents-guide,user-material:source-code | visual: code-native cards/process | asset: none

export default async function () {
  return (
    <>
      <SlideBackground color="light" />
      <PageNumber />
      <SectionHeader title="Agenda" />

      {/* Three agenda cards — x positions relative to group */}
      <Group x={0.8} y={2.0} w={11.733} h={2.4}>
        {/* Card 1 - Text Elements */}
        <Card x={0} y={0} w={3.6} h={2.2} fill={colors.accentSoft}>
          <Text x={0.3} y={0.2} w={3.0} h={0.6} align="left" valign="middle">
            <TextRun
              text="📝 Text Elements"
              options={{ fontSize: typography.size.subtitle, bold: true, color: colors.accent }}
            />
          </Text>
          <Text x={0.3} y={0.8} w={3.0} h={1.2} align="left" valign="top" lineSpacing={24}>
            <TextRun
              text="Text & TextRun"
              options={{
                fontSize: typography.size.lead,
                bold: true,
                color: colors.ink,
                breakLine: true,
              }}
            />
            <TextRun
              text="Rich text formatting with color, bold, italics, and line breaks"
              options={{ fontSize: typography.size.small, color: colors.muted }}
            />
          </Text>
        </Card>

        {/* Card 2 - Layout & Cards */}
        <Card x={4.0} y={0} w={3.6} h={2.2} fill={colors.accentSoft}>
          <Text x={0.3} y={0.2} w={3.0} h={0.6} align="left" valign="middle">
            <TextRun
              text="🎨 Layout & Cards"
              options={{ fontSize: typography.size.subtitle, bold: true, color: colors.accent }}
            />
          </Text>
          <Text x={0.3} y={0.8} w={3.0} h={1.2} align="left" valign="top" lineSpacing={24}>
            <TextRun
              text="RoundRect & Positioning"
              options={{
                fontSize: typography.size.lead,
                bold: true,
                color: colors.ink,
                breakLine: true,
              }}
            />
            <TextRun
              text="Card-based layouts with rounded rectangles and absolute positioning"
              options={{ fontSize: typography.size.small, color: colors.muted }}
            />
          </Text>
        </Card>

        {/* Card 3 - Shapes */}
        <Card x={8.0} y={0} w={3.6} h={2.2} fill={colors.accentSoft}>
          <Text x={0.3} y={0.2} w={3.0} h={0.6} align="left" valign="middle">
            <TextRun
              text="🔷 Shapes"
              options={{ fontSize: typography.size.subtitle, bold: true, color: colors.accent }}
            />
          </Text>
          <Text x={0.3} y={0.8} w={3.0} h={1.2} align="left" valign="top" lineSpacing={24}>
            <TextRun
              text="Rect, Oval, Line & more"
              options={{
                fontSize: typography.size.lead,
                bold: true,
                color: colors.ink,
                breakLine: true,
              }}
            />
            <TextRun
              text="Built-in shapes with fill, stroke, and shadow options"
              options={{ fontSize: typography.size.small, color: colors.muted }}
            />
          </Text>
        </Card>
      </Group>

      {/* Bottom section - workflow overview */}
      <RoundRect
        x={0.8}
        y={4.8}
        w={11.733}
        h={1.8}
        fill={{ color: colors.backgroundLight }}
        rectRadius={0.15}
      />
      <Text x={1.2} y={5.0} w={11.0} h={1.4} align="left" valign="top" lineSpacing={30}>
        <TextRun
          text="Workflow"
          options={{
            fontSize: typography.size.lead,
            bold: true,
            color: colors.ink,
            breakLine: true,
          }}
        />
        <TextRun
          text="Edit slides in src/slides/ → Preview in browser at localhost:5173 → Generate final .pptx with npm run generate"
          options={{ fontSize: typography.size.body, color: colors.muted }}
        />
      </Text>

      <Notes
        text={`[Hook]
The starter becomes simple when you see three primitives and one loop.

[Track]
Introduce text, layout/cards, and shapes, then follow edit to browser preview to generated .pptx.

[Action]
Move across the three cards, then point to the bottom workflow strip from left to right.

[Transition]
We will start with the smallest content unit: a formatted text run.`}
      />
    </>
  );
}
