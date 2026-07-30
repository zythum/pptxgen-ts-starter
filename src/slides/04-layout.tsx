import { Text, TextRun, Notes, Group } from "@zythum02/pptxgenjsx";
import { SlideBackground } from "../components/SlideBackground";
import { SectionHeader } from "../components/SectionHeader";
import { Card } from "../components/Card";
import { PageNumber } from "../components/PageNumber";

export default async function () {
  return (
    <>
      <SlideBackground color="light" />
      <PageNumber />
      <SectionHeader title="Layout & Cards" />

      {/* 2×2 card grid — children positions are relative to the group */}
      <Group x={0.8} y={2.0} w={11.733} h={4.8}>
        {/* Top-left card — white bg, border, shadow, purple accent */}
        <Card
          x={0}
          y={0}
          w={5.6}
          h={2.2}
          fill="FFFFFF"
          accentColor="7C3AED"
          border={true}
          shadow={true}
        >
          <Text x={0.4} y={0.1} w={4.8} h={0.5} align="left" valign="middle">
            <TextRun text="Feature Card" options={{ fontSize: 17, bold: true, color: "1F2937" }} />
          </Text>
          <Text x={0.4} y={0.7} w={4.8} h={1.2} align="left" valign="top" lineSpacing={24}>
            <TextRun
              text="Use RoundRect with shadow and border to create card containers for your content."
              options={{ fontSize: 14, color: "6B7280" }}
            />
          </Text>
        </Card>

        {/* Top-right card — white bg, border, shadow, green accent */}
        <Card
          x={6.0}
          y={0}
          w={5.733}
          h={2.2}
          fill="FFFFFF"
          accentColor="10B981"
          border={true}
          shadow={true}
        >
          <Text x={0.4} y={0.1} w={5.0} h={0.5} align="left" valign="middle">
            <TextRun
              text="Left Accent Bar"
              options={{ fontSize: 17, bold: true, color: "1F2937" }}
            />
          </Text>
          <Text x={0.4} y={0.7} w={5.0} h={1.2} align="left" valign="top" lineSpacing={24}>
            <TextRun
              text="Add a thin accent bar on the left of a card to highlight its category or importance."
              options={{ fontSize: 14, color: "6B7280" }}
            />
          </Text>
        </Card>

        {/* Bottom-left card — solid colored background */}
        <Card x={0} y={2.6} w={5.6} h={2.2} fill="FEF2F2">
          <Text x={0.4} y={0.2} w={4.8} h={0.5} align="left" valign="middle">
            <TextRun
              text="Colored Background"
              options={{ fontSize: 17, bold: true, color: "DC2626" }}
            />
          </Text>
          <Text x={0.4} y={0.8} w={4.8} h={1.2} align="left" valign="top" lineSpacing={24}>
            <TextRun
              text="Use different fill colors for background cards. Use F3F0FF (light purple) for a subtle accent."
              options={{ fontSize: 14, color: "6B7280" }}
            />
          </Text>
        </Card>

        {/* Bottom-right card — solid colored background */}
        <Card x={6.0} y={2.6} w={5.733} h={2.2} fill="EFF6FF">
          <Text x={0.4} y={0.2} w={5.0} h={0.5} align="left" valign="middle">
            <TextRun
              text="Absolute Positioning"
              options={{ fontSize: 17, bold: true, color: "2563EB" }}
            />
          </Text>
          <Text x={0.4} y={0.8} w={5.0} h={1.2} align="left" valign="top" lineSpacing={24}>
            <TextRun
              text="Every element uses absolute (x, y, w, h) positioning in inches. Design pixel-perfect slides."
              options={{ fontSize: 14, color: "6B7280" }}
            />
          </Text>
        </Card>
      </Group>

      <Notes>
        This slide demonstrates different card layout patterns using RoundRect. Cards can have
        shadows, colored accent bars, colored backgrounds, and borders. Everything is positioned
        absolutely using x, y, w, h coordinates.
      </Notes>
    </>
  );
}
