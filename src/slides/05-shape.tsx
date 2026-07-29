import { Text, TextRun, Notes, RoundRect, Rect, Ellipse, Group } from "@zythum02/pptxgenjsx";
import { SlideBackground } from "../components/SlideBackground";
import { SectionHeader } from "../components/SectionHeader";
import { PageNumber } from "../components/PageNumber";

export default async function () {
  return (
    <>
      <SlideBackground color="light" />
      <PageNumber />
      <SectionHeader title="Shapes" />

      {/* Rect section — header + 3 rects */}
      <Group x={0.8} y={2.0} w={8.1} h={2.2}>
        <Text x={0} y={0} w={3.0} h={0.5} align="left" valign="middle">
          <TextRun text="Rect" options={{ fontSize: 16, bold: true, color: "6B7280" }} />
        </Text>
        <Rect x={0} y={0.6} w={2.5} h={1.6} fill={{ color: "7C3AED" }} />
        <Rect
          x={2.8}
          y={0.6}
          w={2.5}
          h={1.6}
          fill={{ color: "8B5CF6" }}
          line={{ color: "5B21B6", width: 2 }}
        />
        <Rect
          x={5.6}
          y={0.6}
          w={2.5}
          h={1.6}
          fill={{ color: "A78BFA", transparency: 60 }}
          line={{ color: "7C3AED", width: 3, dashType: "dash" }}
        />
      </Group>

      {/* Oval section — header + 3 ovals */}
      <Group x={0.8} y={4.6} w={8.1} h={2.2}>
        <Text x={0} y={0} w={3.0} h={0.5} align="left" valign="middle">
          <TextRun text="Oval" options={{ fontSize: 16, bold: true, color: "6B7280" }} />
        </Text>
        <Ellipse x={0} y={0.6} w={2.5} h={1.6} fill={{ color: "10B981" }} />
        <Ellipse
          x={2.8}
          y={0.6}
          w={2.5}
          h={1.6}
          fill={{ color: "34D399" }}
          line={{ color: "059669", width: 2 }}
        />
        <Ellipse
          x={5.6}
          y={0.6}
          w={2.5}
          h={1.6}
          fill={{ color: "6EE7B7", transparency: 50 }}
          line={{ color: "10B981", width: 3, dashType: "dash" }}
        />
      </Group>

      {/* RoundRect section — header + 3 round-rects */}
      <Group x={9.4} y={2.0} w={3.2} h={5.0}>
        <Text x={0} y={0} w={3.6} h={0.5} align="left" valign="middle">
          <TextRun text="RoundRect" options={{ fontSize: 16, bold: true, color: "6B7280" }} />
        </Text>
        <RoundRect x={0} y={0.6} w={3.2} h={1.6} fill={{ color: "F59E0B" }} rectRadius={0.3} />
        <RoundRect
          x={0}
          y={2.4}
          w={3.2}
          h={1.6}
          fill={{ color: "FBBF24" }}
          rectRadius={0.15}
          line={{ color: "D97706", width: 2 }}
        />
        <RoundRect
          x={0}
          y={4.2}
          w={3.2}
          h={0.8}
          fill={{ color: "FDE68A", transparency: 40 }}
          line={{ color: "F59E0B", width: 2, dashType: "dash" }}
          rectRadius={0.08}
        />
      </Group>

      <Notes>
        This slide demonstrates the Rect, Oval, and RoundRect shape components. Shapes support fill
        color, transparency, line/stroke with width and dash type, and shadows. RoundRect also
        supports a rectRadius prop for corner rounding.
      </Notes>
    </>
  );
}
