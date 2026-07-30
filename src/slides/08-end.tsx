import { Text, TextRun, Notes, Rect, RoundRect } from "@zythum02/pptxgenjsx";
import { SlideBackground } from "../components/SlideBackground";
import { PageNumber } from "../components/PageNumber";

export default async function () {
  return (
    <>
      <SlideBackground color="dark" />
      <PageNumber color="6B7280" />

      {/* Decorative top accent */}
      <Rect x={5.667} y={1.72} w={2.0} h={0.06} fill={{ color: "7C3AED" }} />

      {/* Main thank you text */}
      <Text x={2.0} y={2.02} w={9.333} h={1.4} align="center" valign="middle">
        <TextRun text="Get Started Now" options={{ fontSize: 36, bold: true, color: "FFFFFF" }} />
      </Text>

      {/* Subtitle */}
      <Text x={2.0} y={3.22} w={9.333} h={0.8} align="center" valign="middle">
        <TextRun
          text="Fork the template and build your next presentation with JSX + TypeScript"
          options={{ fontSize: 18, color: "A78BFA" }}
        />
      </Text>

      {/* Commands */}
      <RoundRect x={3.5} y={4.22} w={7.0} h={1.2} fill={{ color: "2A2A3E" }} rectRadius={0.1} />
      <Text x={3.8} y={4.32} w={6.4} h={1.0} align="center" valign="middle">
        <TextRun
          text="npm install  →  npm run dev  →  npm run generate"
          options={{ fontSize: 14, color: "6EE7B7", fontFace: "Courier New" }}
        />
      </Text>

      {/* Decorative bottom accent */}
      <Rect x={5.667} y={5.72} w={2.0} h={0.06} fill={{ color: "7C3AED" }} />

      <Notes>
        Thanks for exploring the pptxgen-ts-starter template! To get started: fork or clone the
        repo, run npm install, start editing slides in src/slides/, preview in the browser, and
        generate your .pptx when ready.
      </Notes>
    </>
  );
}
