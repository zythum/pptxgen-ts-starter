import { Text, TextRun, Notes, Rect } from "@zythum02/pptxgenjsx";
import { SlideBackground } from "../components/SlideBackground";
import { PageNumber } from "../components/PageNumber";

export default async function () {
  return (
    <>
      <SlideBackground color="dark" />
      <PageNumber color="6B7280" />

      {/* Accent line */}
      <Rect x={4.667} y={2.1} w={4.0} h={0.06} fill={{ color: "7C3AED" }} />

      {/* Title */}
      <Text x={1.5} y={2.3} w={10.333} h={1.5} align="center" valign="middle">
        <TextRun
          text="Getting Started with pptxgen-ts-starter"
          options={{ fontSize: 36, bold: true, color: "FFFFFF" }}
        />
      </Text>

      {/* Subtitle */}
      <Text x={1.5} y={3.6} w={10.333} h={0.8} align="center" valign="middle">
        <TextRun
          text="Build PowerPoint Presentations with JSX + TypeScript"
          options={{ fontSize: 18, color: "A78BFA" }}
        />
      </Text>

      {/* Divider */}
      <Rect x={4.667} y={4.6} w={4.0} h={0.06} fill={{ color: "7C3AED" }} />

      {/* Footer info */}
      <Text x={1.5} y={4.9} w={10.333} h={0.5} align="center" valign="middle">
        <TextRun
          text="npm run dev  →  npm run generate"
          options={{ fontSize: 13, color: "6B7280" }}
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
