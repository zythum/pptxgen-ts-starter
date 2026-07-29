import { Slide, Text, TextRun, Notes, RoundRect, Rect, Ellipse, type PptxNode } from "@zythum02/pptxgenjsx";

export async function ShapeSlide(): Promise<PptxNode> {
  return (
    <Slide>
      {/* Background */}
      <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: "FFFFFF" }} />

      {/* Title */}
      <Text x={0.8} y={0.6} w={6} h={0.9} align="left" valign="middle">
        <TextRun text="Shapes" options={{ fontSize: 30, bold: true, color: "1F2937" }} />
      </Text>

      {/* Accent line */}
      <RoundRect x={0.8} y={1.4} w={2.0} h={0.05} fill={{ color: "7C3AED" }} rectRadius={0.025} />

      {/* Rect demo */}
      <Text x={0.8} y={2.0} w={3.0} h={0.5} align="left" valign="middle">
        <TextRun text="Rect" options={{ fontSize: 16, bold: true, color: "6B7280" }} />
      </Text>
      <Rect x={0.8} y={2.6} w={2.5} h={1.6} fill={{ color: "7C3AED" }} />
      <Rect x={3.6} y={2.6} w={2.5} h={1.6} fill={{ color: "8B5CF6" }}
        line={{ color: "5B21B6", width: 2 }}
      />
      <Rect x={6.4} y={2.6} w={2.5} h={1.6} fill={{ color: "A78BFA", transparency: 60 }}
        line={{ color: "7C3AED", width: 3, dashType: "dash" }}
      />

      {/* Oval demo */}
      <Text x={0.8} y={4.6} w={3.0} h={0.5} align="left" valign="middle">
        <TextRun text="Oval" options={{ fontSize: 16, bold: true, color: "6B7280" }} />
      </Text>
      <Ellipse x={0.8} y={5.2} w={2.5} h={1.6} fill={{ color: "10B981" }} />
      <Ellipse x={3.6} y={5.2} w={2.5} h={1.6} fill={{ color: "34D399" }}
        line={{ color: "059669", width: 2 }}
      />
      <Ellipse x={6.4} y={5.2} w={2.5} h={1.6} fill={{ color: "6EE7B7", transparency: 50 }}
        line={{ color: "10B981", width: 3, dashType: "dash" }}
      />

      {/* RoundRect demo */}
      <Text x={9.4} y={2.0} w={3.6} h={0.5} align="left" valign="middle">
        <TextRun text="RoundRect" options={{ fontSize: 16, bold: true, color: "6B7280" }} />
      </Text>
      <RoundRect x={9.4} y={2.6} w={3.2} h={1.6} fill={{ color: "F59E0B" }} rectRadius={0.3} />
      <RoundRect x={9.4} y={4.4} w={3.2} h={1.6} fill={{ color: "FBBF24" }} rectRadius={0.15}
        line={{ color: "D97706", width: 2 }}
      />
      <RoundRect x={9.4} y={6.2} w={3.2} h={0.8} fill={{ color: "FDE68A", transparency: 40 }}
        line={{ color: "F59E0B", width: 2, dashType: "dash" }}
        rectRadius={0.08}
      />

      <Notes>
        This slide demonstrates the Rect, Oval, and RoundRect shape components.
        Shapes support fill color, transparency, line/stroke with width and dash type,
        and shadows. RoundRect also supports a rectRadius prop for corner rounding.
      </Notes>
    </Slide>
  );
}
