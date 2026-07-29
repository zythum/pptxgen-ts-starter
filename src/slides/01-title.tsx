import { Slide, Text, TextRun, Notes, Rect, type PptxNode } from "@zythum02/pptxgenjsx";

export async function TitleSlide(): Promise<PptxNode> {
  return (
    <Slide>
      {/* Background */}
      <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: "1E1E2E" }} />

      {/* Accent line */}
      <Rect x={4.667} y={2.8} w={4.0} h={0.06} fill={{ color: "7C3AED" }} />

      {/* Title */}
      <Text x={1.5} y={3.0} w={10.333} h={1.5} align="center" valign="middle">
        <TextRun
          text="Getting Started with pptxgen-ts-starter"
          options={{ fontSize: 36, bold: true, color: "FFFFFF" }}
        />
      </Text>

      {/* Subtitle */}
      <Text x={1.5} y={4.3} w={10.333} h={0.8} align="center" valign="middle">
        <TextRun
          text="Build PowerPoint Presentations with JSX + TypeScript"
          options={{ fontSize: 18, color: "A78BFA" }}
        />
      </Text>

      {/* Divider */}
      <Rect x={4.667} y={5.3} w={4.0} h={0.06} fill={{ color: "7C3AED" }} />

      {/* Footer info */}
      <Text x={1.5} y={5.6} w={10.333} h={0.5} align="center" valign="middle">
        <TextRun
          text="npm run dev  →  npm run generate"
          options={{ fontSize: 13, color: "6B7280" }}
        />
      </Text>

      <Notes>
        Welcome! This is a sample presentation built with pptxgen-ts-starter.
        The starter uses JSX to define slides and pptxgenjs to render them to .pptx files.
        Press the next button or use arrow keys to navigate.
      </Notes>
    </Slide>
  );
}
