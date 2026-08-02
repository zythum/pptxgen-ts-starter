import { Text, TextRun, RoundRect, useGroupContext } from "@zythum02/pptxgenjsx";
import { colors } from "../token/colors";
import { typography } from "../token/typography";

/**
 * Slide section title with a purple accent underline.
 *
 * Used on content slides (agenda, text, layout, shapes).
 * Position: top-left at (0.8, 0.6), accent line at (0.8, 1.4).
 *
 * Usage:
 *   <Slide>
 *     <SlideBackground color="light" />
 *     <SectionHeader title="My Section" />
 *     ...
 *   </Slide>
 */
export function SectionHeader({ title }: { title: string }) {
  const { width } = useGroupContext();
  return (
    <>
      <Text x={0.8} y={0.6} w={width - 0.8} h={0.9} align="left" valign="middle">
        <TextRun
          text={title}
          options={{ fontSize: typography.size.hero, bold: true, color: colors.ink }}
        />
      </Text>
      <RoundRect
        x={0.8}
        y={1.4}
        w={2.0}
        h={0.05}
        fill={{ color: colors.accent }}
        rectRadius={0.025}
      />
    </>
  );
}
