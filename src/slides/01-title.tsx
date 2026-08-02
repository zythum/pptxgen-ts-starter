import { Text, TextRun, Notes, Rect } from "@zythum02/pptxgenjsx";
import { SlideBackground } from "../components/SlideBackground";
import { PageNumber } from "../components/PageNumber";
import { colors } from "../token/colors";
import { typography } from "../token/typography";

// slide: 01 | role: Cover | layout: L1 | core: Native PPTX presentations can be authored with JSX and TypeScript | sources: user-material:agents-guide,user-material:package-manifest | visual: none | asset: none

export default async function () {
  return (
    <>
      <SlideBackground color="dark" />
      <PageNumber color={colors.mutedLight} />

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

      <Notes
        text={`[Hook]
Welcome—this entire presentation is generated from JSX and TypeScript.

[Track]
pptxgenjsx defines editable slide content and pptxgenjs writes the native .pptx; the deck itself is the demonstration.

[Action]
Pause after “native PPTX,” then advance with the next control or arrow key.

[Transition]
First, here is the workflow and the three building blocks this starter demonstrates.`}
      />
    </>
  );
}
