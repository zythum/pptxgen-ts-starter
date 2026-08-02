import { Text, TextRun, Notes, RoundRect, Rect, Ellipse, Group } from "@zythum02/pptxgenjsx";
import { SlideBackground } from "../components/SlideBackground";
import { SectionHeader } from "../components/SectionHeader";
import { PageNumber } from "../components/PageNumber";
import { colors } from "../token/colors";
import { typography } from "../token/typography";

// slide: 05 | role: Explain | layout: V-L4-shape-gallery | core: Native shapes expose fill, transparency, stroke, dash, shadow, and corner controls | sources: user-material:pptxgenjsx-docs,user-material:source-code | visual: code-native shape gallery | asset: none

export default async function () {
  return (
    <>
      <SlideBackground color="light" />
      <PageNumber />
      <SectionHeader title="Shapes" />

      {/* Rect section — header + 3 rects */}
      <Group x={0.8} y={2.0} w={8.1} h={2.2}>
        <Text x={0} y={0} w={3.0} h={0.5} align="left" valign="middle">
          <TextRun
            text="Rect"
            options={{ fontSize: typography.size.lead, bold: true, color: colors.muted }}
          />
        </Text>
        <Rect x={0} y={0.6} w={2.5} h={1.6} fill={{ color: colors.accent }} />
        <Rect
          x={2.8}
          y={0.6}
          w={2.5}
          h={1.6}
          fill={{ color: colors.violet500 }}
          line={{ color: colors.violet900, width: 2 }}
        />
        <Rect
          x={5.6}
          y={0.6}
          w={2.5}
          h={1.6}
          fill={{ color: colors.accentLight, transparency: 60 }}
          line={{ color: colors.accent, width: 3, dashType: "dash" }}
        />
      </Group>

      {/* Oval section — header + 3 ovals */}
      <Group x={0.8} y={4.6} w={8.1} h={2.2}>
        <Text x={0} y={0} w={3.0} h={0.5} align="left" valign="middle">
          <TextRun
            text="Oval"
            options={{ fontSize: typography.size.lead, bold: true, color: colors.muted }}
          />
        </Text>
        <Ellipse x={0} y={0.6} w={2.5} h={1.6} fill={{ color: colors.success }} />
        <Ellipse
          x={2.8}
          y={0.6}
          w={2.5}
          h={1.6}
          fill={{ color: colors.green300 }}
          line={{ color: colors.green600, width: 2 }}
        />
        <Ellipse
          x={5.6}
          y={0.6}
          w={2.5}
          h={1.6}
          fill={{ color: colors.green200, transparency: 50 }}
          line={{ color: colors.success, width: 3, dashType: "dash" }}
        />
      </Group>

      {/* RoundRect section — header + 3 round-rects */}
      <Group x={9.4} y={2.0} w={3.2} h={5.0}>
        <Text x={0} y={0} w={3.6} h={0.5} align="left" valign="middle">
          <TextRun
            text="RoundRect"
            options={{ fontSize: typography.size.lead, bold: true, color: colors.muted }}
          />
        </Text>
        <RoundRect
          x={0}
          y={0.6}
          w={3.2}
          h={1.6}
          fill={{ color: colors.amber500 }}
          rectRadius={0.3}
        />
        <RoundRect
          x={0}
          y={2.4}
          w={3.2}
          h={1.6}
          fill={{ color: colors.amber400 }}
          rectRadius={0.15}
          line={{ color: colors.amber600, width: 2 }}
        />
        <RoundRect
          x={0}
          y={4.2}
          w={3.2}
          h={0.8}
          fill={{ color: colors.amber200, transparency: 40 }}
          line={{ color: colors.amber500, width: 2, dashType: "dash" }}
          rectRadius={0.08}
        />
      </Group>

      <Notes
        text={`[Hook]
The deck can draw its own visual language without image assets.

[Track]
Demonstrate Rect, Ellipse, and RoundRect fill, transparency, line, dash, shadow, and corner-radius controls.

[Action]
Point to one fill, one stroked shape, and the rounded example; explain that the multiple hues are intentional demo coverage.

[Transition]
These primitives also support structured, data-driven components such as tables.`}
      />
    </>
  );
}
