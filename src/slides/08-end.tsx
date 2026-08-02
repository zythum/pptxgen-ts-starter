import { Text, TextRun, Notes, Rect, RoundRect } from "@zythum02/pptxgenjsx";
import { SlideBackground } from "../components/SlideBackground";
import { PageNumber } from "../components/PageNumber";
import { colors } from "../token/colors";
import { typography } from "../token/typography";

// slide: 08 | role: Closing | layout: L9 | core: Fork, preview, and generate a native PPTX with three commands | sources: user-material:agents-guide,user-material:package-manifest | visual: none | asset: none

export default async function () {
  return (
    <>
      <SlideBackground color="dark" />
      <PageNumber color={colors.mutedLight} />

      {/* Decorative top accent */}
      <Rect x={5.667} y={1.72} w={2.0} h={0.06} fill={{ color: colors.accent }} />

      {/* Main thank you text */}
      <Text x={2.0} y={2.02} w={9.333} h={1.4} align="center" valign="middle">
        <TextRun
          text="Get Started Now"
          options={{ fontSize: typography.size.display, bold: true, color: colors.white }}
        />
      </Text>

      {/* Subtitle */}
      <Text x={2.0} y={3.22} w={9.333} h={0.8} align="center" valign="middle">
        <TextRun
          text="Fork the template and build your next presentation with JSX + TypeScript"
          options={{ fontSize: typography.size.subtitle, color: colors.accentLight }}
        />
      </Text>

      {/* Commands */}
      <RoundRect
        x={3.5}
        y={4.22}
        w={7.0}
        h={1.2}
        fill={{ color: colors.darkSurface }}
        rectRadius={0.1}
      />
      <Text x={3.8} y={4.32} w={6.4} h={1.0} align="center" valign="middle">
        <TextRun
          text="npm install  →  npm run dev  →  npm run generate"
          options={{
            fontSize: typography.size.small,
            color: colors.green200,
            fontFace: typography.font.mono,
          }}
        />
      </Text>

      {/* Decorative bottom accent */}
      <Rect x={5.667} y={5.72} w={2.0} h={0.06} fill={{ color: colors.accent }} />

      <Notes
        text={`[Hook]
The fastest way to learn the starter is to change one slide.

[Track]
Summarize fork or clone, npm install, edit src/slides, preview in the browser, and npm run generate.

[Action]
Invite the audience to fork the template and replace one sample page; pause for questions.

[Transition]
End of deck and Q&A.`}
      />
    </>
  );
}
