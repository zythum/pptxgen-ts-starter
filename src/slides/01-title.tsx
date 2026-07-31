import { Text, TextRun, Notes, Rect } from "@zythum02/pptxgenjsx";
import { SlideBackground } from "../components/SlideBackground";
import { PageNumber } from "../components/PageNumber";
import { colors } from "../token/colors";
import { typography } from "../token/typography";

export default async function () {
  return (
    <>
      <SlideBackground color="dark" />
      <PageNumber color={colors.muted} />

      {/* Accent line */}
      <Rect x={4.667} y={2.1} w={4.0} h={0.06} fill={{ color: colors.accent }} />

      {/* Title */}
      <Text x={1.5} y={2.3} w={10.333} h={1.5} align="center" valign="middle">
        <TextRun
          text="Getting Started with pptxgen-ts-starter"
          options={{ fontSize: typography.size.display, bold: true, color: colors.white }}
        />
      </Text>

      {/* Subtitle */}
      <Text x={1.5} y={3.6} w={10.333} h={0.8} align="center" valign="middle">
        <TextRun
          text="Build PowerPoint Presentations with JSX + TypeScript"
          options={{ fontSize: typography.size.subtitle, color: colors.accentLight }}
        />
      </Text>

      {/* Divider */}
      <Rect x={4.667} y={4.6} w={4.0} h={0.06} fill={{ color: colors.accent }} />

      {/* Footer info */}
      <Text x={1.5} y={4.9} w={10.333} h={0.5} align="center" valign="middle">
        <TextRun
          text="npm run dev  →  npm run generate"
          options={{ fontSize: typography.size.table, color: colors.muted }}
        />
      </Text>

      <Notes>
        Welcome! This is a sample presentation built with pptxgen-ts-starter. The starter uses JSX
        to define slides and pptxgenjs to render them to .pptx files. Press the next button or use
        arrow keys to navigate.
      </Notes>
    </>
  );
}
