import { Slide, Text, TextRun, Notes, Rect, RoundRect } from "@artifact-kit/pptxgenjs-jsx";

export function EndSlide() {
  return (
    <Slide>
      {/* Background */}
      <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: "1E1E2E" }} />

      {/* Decorative top accent */}
      <Rect x={5.667} y={2.5} w={2.0} h={0.06} fill={{ color: "7C3AED" }} />

      {/* Main thank you text */}
      <Text x={2.0} y={2.8} w={9.333} h={1.4} align="center" valign="middle">
        <TextRun text="Get Started Now" options={{ fontSize: 36, bold: true, color: "FFFFFF" }} />
      </Text>

      {/* Subtitle */}
      <Text x={2.0} y={4.0} w={9.333} h={0.8} align="center" valign="middle">
        <TextRun
          text="Fork the template and build your next presentation with JSX + TypeScript"
          options={{ fontSize: 18, color: "A78BFA" }}
        />
      </Text>

      {/* Commands */}
      <RoundRect x={3.5} y={5.0} w={6.333} h={1.2} fill={{ color: "2A2A3E" }} rectRadius={0.1} />
      <Text x={3.8} y={5.1} w={5.733} h={1.0} align="center" valign="middle">
        <TextRun text="npm install  →  npm run dev  →  npm run generate" options={{ fontSize: 14, color: "6EE7B7", fontFace: "Courier New" }} />
      </Text>

      {/* Decorative bottom accent */}
      <Rect x={5.667} y={6.5} w={2.0} h={0.06} fill={{ color: "7C3AED" }} />

      <Notes>
        Thanks for exploring the pptxgen-ts-starter template!
        To get started: fork or clone the repo, run npm install,
        start editing slides in src/slides/, preview in the browser,
        and generate your .pptx when ready.
      </Notes>
    </Slide>
  );
}
