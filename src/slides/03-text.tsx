import { Text, TextRun, Notes, RoundRect, Group } from "@zythum02/pptxgenjsx";
import { SlideBackground } from "../components/SlideBackground";
import { SectionHeader } from "../components/SectionHeader";
import { Card } from "../components/Card";
import { PageNumber } from "../components/PageNumber";
import { colors } from "../token/colors";
import { typography } from "../token/typography";

export default async function () {
  return (
    <>
      <SlideBackground color="light" />
      <PageNumber />
      <SectionHeader title="Text Elements" />

      {/* Left column - rich text demo */}
      <Card x={0.8} y={2.0} w={5.6} h={4.8} fill={colors.accentSoft}>
        <Text x={0.3} y={0.2} w={5.0} h={0.5} align="left" valign="middle">
          <TextRun
            text="Rich Text Formatting"
            options={{ fontSize: typography.size.subtitle, bold: true, color: colors.accent }}
          />
        </Text>
        <Text x={0.3} y={0.9} w={5.0} h={3.5} align="left" valign="top" lineSpacing={32}>
          <TextRun
            text="This text is bold"
            options={{ fontSize: typography.size.lead, bold: true, color: colors.ink }}
          />
          <TextRun
            text=" and this is italic"
            options={{ fontSize: typography.size.lead, italic: true, color: colors.ink }}
          />
          <TextRun
            text=" with mixed formatting."
            options={{ fontSize: typography.size.lead, color: colors.muted, breakLine: true }}
          />
          <TextRun
            text="Large Heading"
            options={{
              fontSize: typography.size.title,
              bold: true,
              color: colors.ink,
              breakLine: true,
            }}
          />
          <TextRun
            text="Small caption text"
            options={{
              fontSize: typography.size.caption,
              color: colors.mutedLight,
              breakLine: true,
            }}
          />
          <TextRun
            text="Accent colored text"
            options={{ fontSize: typography.size.lead, color: colors.accent, breakLine: true }}
          />
          <TextRun
            text="Multi-line text with"
            options={{ fontSize: typography.size.body, color: colors.textSecondary }}
          />
          <TextRun
            text="automatic line spacing."
            options={{ fontSize: typography.size.body, color: colors.textSecondary }}
          />
        </Text>
      </Card>

      {/* Right column - usage code demo */}
      <Group x={6.8} y={2.0} w={5.733} h={4.8}>
        <RoundRect
          x={0}
          y={0}
          w={5.733}
          h={4.8}
          fill={{ color: colors.darkBackground }}
          rectRadius={0.15}
        />
        <Text x={0.4} y={0.2} w={5.0} h={0.5} align="left" valign="middle">
          <TextRun
            text="JSX Usage"
            options={{ fontSize: typography.size.subtitle, bold: true, color: colors.accentLight }}
          />
        </Text>

        {/* Code-like text block — each JSX element formatted with one prop per line */}
        <Text x={0.4} y={0.9} w={5.0} h={4.2} align="left" valign="top" lineSpacing={15}>
          <TextRun
            text={"<Text x={0.8} y={2.9} w={5.0} h={3.5}>"}
            options={{
              fontSize: typography.size.code,
              fontFace: typography.font.mono,
              color: colors.codeTag,
              breakLine: true,
            }}
          />
          <TextRun
            text={"  <TextRun"}
            options={{
              fontSize: typography.size.code,
              fontFace: typography.font.mono,
              color: colors.accentLight,
              breakLine: true,
            }}
          />
          <TextRun
            text={'    text="Bold text"'}
            options={{
              fontSize: typography.size.code,
              fontFace: typography.font.mono,
              color: colors.codeText,
              breakLine: true,
            }}
          />
          <TextRun
            text={"    options={{bold: true}}"}
            options={{
              fontSize: typography.size.code,
              fontFace: typography.font.mono,
              color: colors.codeText,
              breakLine: true,
            }}
          />
          <TextRun
            text={"  />"}
            options={{
              fontSize: typography.size.code,
              fontFace: typography.font.mono,
              color: colors.accentLight,
              breakLine: true,
            }}
          />
          <TextRun
            text={"  <TextRun"}
            options={{
              fontSize: typography.size.code,
              fontFace: typography.font.mono,
              color: colors.accentLight,
              breakLine: true,
            }}
          />
          <TextRun
            text={'    text="Italic text"'}
            options={{
              fontSize: typography.size.code,
              fontFace: typography.font.mono,
              color: colors.codeText,
              breakLine: true,
            }}
          />
          <TextRun
            text={"    options={{italic: true}}"}
            options={{
              fontSize: typography.size.code,
              fontFace: typography.font.mono,
              color: colors.codeText,
              breakLine: true,
            }}
          />
          <TextRun
            text={"  />"}
            options={{
              fontSize: typography.size.code,
              fontFace: typography.font.mono,
              color: colors.accentLight,
              breakLine: true,
            }}
          />
          <TextRun
            text={"  <TextRun"}
            options={{
              fontSize: typography.size.code,
              fontFace: typography.font.mono,
              color: colors.accentLight,
              breakLine: true,
            }}
          />
          <TextRun
            text={'    text="Colored text"'}
            options={{
              fontSize: typography.size.code,
              fontFace: typography.font.mono,
              color: colors.codeText,
              breakLine: true,
            }}
          />
          <TextRun
            text={"    options={{color: colors.accent}}"}
            options={{
              fontSize: typography.size.code,
              fontFace: typography.font.mono,
              color: colors.codeText,
              breakLine: true,
            }}
          />
          <TextRun
            text={"  />"}
            options={{
              fontSize: typography.size.code,
              fontFace: typography.font.mono,
              color: colors.accentLight,
              breakLine: true,
            }}
          />
          <TextRun
            text={"</Text>"}
            options={{
              fontSize: typography.size.code,
              fontFace: typography.font.mono,
              color: colors.codeTag,
              breakLine: true,
            }}
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
