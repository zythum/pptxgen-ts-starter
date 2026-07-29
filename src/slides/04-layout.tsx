import { Slide, Text, TextRun, Notes, Rect, RoundRect, type PptxNode } from "@zythum02/pptxgenjsx";

export async function LayoutSlide(): Promise<PptxNode> {
  return (
    <Slide>
      {/* Background */}
      <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: "FFFFFF" }} />

      {/* Title */}
      <Text x={0.8} y={0.6} w={6} h={0.9} align="left" valign="middle">
        <TextRun text="Layout & Cards" options={{ fontSize: 30, bold: true, color: "1F2937" }} />
      </Text>

      {/* Accent line */}
      <RoundRect x={0.8} y={1.4} w={2.0} h={0.05} fill={{ color: "7C3AED" }} rectRadius={0.025} />

      {/* Card pattern: 2x2 grid */}
      {/* Top-left card */}
      <RoundRect x={0.8} y={2.0} w={5.6} h={2.2} fill={{ color: "FFFFFF" }} rectRadius={0.15}
        line={{ color: "E5E7EB", width: 1 }}
        shadow={{ type: "outer", blur: 8, offset: 2, color: "000000", opacity: 0.06 }}
      />
      <RoundRect x={0.8} y={2.0} w={0.08} h={2.2} fill={{ color: "7C3AED" }} rectRadius={0.04} />
      <Text x={1.2} y={2.1} w={4.8} h={0.5} align="left" valign="middle">
        <TextRun text="Feature Card" options={{ fontSize: 17, bold: true, color: "1F2937" }} />
      </Text>
      <Text x={1.2} y={2.7} w={4.8} h={1.2} align="left" valign="top" lineSpacing={24}>
        <TextRun text="Use RoundRect with shadow and border to create card containers for your content." options={{ fontSize: 14, color: "6B7280" }} />
      </Text>

      {/* Top-right card */}
      <RoundRect x={6.8} y={2.0} w={5.733} h={2.2} fill={{ color: "FFFFFF" }} rectRadius={0.15}
        line={{ color: "E5E7EB", width: 1 }}
        shadow={{ type: "outer", blur: 8, offset: 2, color: "000000", opacity: 0.06 }}
      />
      <RoundRect x={6.8} y={2.0} w={0.08} h={2.2} fill={{ color: "10B981" }} rectRadius={0.04} />
      <Text x={7.2} y={2.1} w={5.0} h={0.5} align="left" valign="middle">
        <TextRun text="Left Accent Bar" options={{ fontSize: 17, bold: true, color: "1F2937" }} />
      </Text>
      <Text x={7.2} y={2.7} w={5.0} h={1.2} align="left" valign="top" lineSpacing={24}>
        <TextRun text="Add a thin accent bar on the left of a card to highlight its category or importance." options={{ fontSize: 14, color: "6B7280" }} />
      </Text>

      {/* Bottom-left card */}
      <RoundRect x={0.8} y={4.6} w={5.6} h={2.2} fill={{ color: "FEF2F2" }} rectRadius={0.15} />
      <Text x={1.2} y={4.8} w={4.8} h={0.5} align="left" valign="middle">
        <TextRun text="Colored Background" options={{ fontSize: 17, bold: true, color: "DC2626" }} />
      </Text>
      <Text x={1.2} y={5.4} w={4.8} h={1.2} align="left" valign="top" lineSpacing={24}>
        <TextRun text="Use different fill colors for background cards. Use F3F0FF (light purple) for a subtle accent." options={{ fontSize: 14, color: "6B7280" }} />
      </Text>

      {/* Bottom-right card */}
      <RoundRect x={6.8} y={4.6} w={5.733} h={2.2} fill={{ color: "EFF6FF" }} rectRadius={0.15} />
      <Text x={7.2} y={4.8} w={5.0} h={0.5} align="left" valign="middle">
        <TextRun text="Absolute Positioning" options={{ fontSize: 17, bold: true, color: "2563EB" }} />
      </Text>
      <Text x={7.2} y={5.4} w={5.0} h={1.2} align="left" valign="top" lineSpacing={24}>
        <TextRun text="Every element uses absolute (x, y, w, h) positioning in inches. Design pixel-perfect slides." options={{ fontSize: 14, color: "6B7280" }} />
      </Text>

      <Notes>
        This slide demonstrates different card layout patterns using RoundRect.
        Cards can have shadows, colored accent bars, colored backgrounds, and borders.
        Everything is positioned absolutely using x, y, w, h coordinates.
      </Notes>
    </Slide>
  );
}
