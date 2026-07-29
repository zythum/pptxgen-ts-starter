import { Slide, Text, TextRun, Notes, RoundRect, type PptxNode } from "@zythum02/pptxgenjsx";

export async function TextSlide(): Promise<PptxNode> {
  return (
    <Slide>
      {/* Background */}
      <RoundRect x={0} y={0} w={13.333} h={7.5} fill={{ color: "FFFFFF" }} rectRadius={0} />

      {/* Title */}
      <Text x={0.8} y={0.6} w={6} h={0.9} align="left" valign="middle">
        <TextRun text="Text Elements" options={{ fontSize: 30, bold: true, color: "1F2937" }} />
      </Text>

      {/* Accent line */}
      <RoundRect x={0.8} y={1.4} w={2.0} h={0.05} fill={{ color: "7C3AED" }} rectRadius={0.025} />

      {/* Left column - rich text demo */}
      <RoundRect x={0.8} y={2.0} w={5.6} h={4.8} fill={{ color: "F3F0FF" }} rectRadius={0.15} />
      <Text x={1.1} y={2.2} w={5.0} h={0.5} align="left" valign="middle">
        <TextRun text="Rich Text Formatting" options={{ fontSize: 18, bold: true, color: "7C3AED" }} />
      </Text>

      <Text x={1.1} y={2.9} w={5.0} h={3.5} align="left" valign="top" lineSpacing={32}>
        <TextRun text="This text is bold" options={{ fontSize: 16, bold: true, color: "1F2937" }} />
        <TextRun text=" and this is italic" options={{ fontSize: 16, italic: true, color: "1F2937" }} />
        <TextRun text=" with mixed formatting." options={{ fontSize: 16, color: "6B7280", breakLine: true }} />
        <TextRun text="Large Heading" options={{ fontSize: 24, bold: true, color: "1F2937", breakLine: true }} />
        <TextRun text="Small caption text" options={{ fontSize: 12, color: "9CA3AF", breakLine: true }} />
        <TextRun text="Accent colored text" options={{ fontSize: 16, color: "7C3AED", breakLine: true }} />
        <TextRun text="Multi-line text with" options={{ fontSize: 15, color: "4B5563" }} />
        <TextRun text="automatic line spacing." options={{ fontSize: 15, color: "4B5563" }} />
      </Text>

      {/* Right column - usage code demo */}
      <RoundRect x={6.8} y={2.0} w={5.733} h={4.8} fill={{ color: "1E1E2E" }} rectRadius={0.15} />
      <Text x={7.2} y={2.2} w={5.0} h={0.5} align="left" valign="middle">
        <TextRun text="JSX Usage" options={{ fontSize: 18, bold: true, color: "A78BFA" }} />
      </Text>

      {/* Code-like text block */}
      <Text x={7.2} y={2.9} w={5.0} h={3.5} align="left" valign="top" lineSpacing={22}>
        <TextRun text={'<Text x={0.8} y={2.9}'} options={{ fontSize: 11, color: "F87171" }} />
        <TextRun text={'      w={5.0} h={3.5}>'} options={{ fontSize: 11, color: "F87171", breakLine: true }} />
        <TextRun text={'  <TextRun text="Bold text"'} options={{ fontSize: 11, color: "A78BFA", breakLine: true }} />
        <TextRun text={'    options={{bold: true}} />'} options={{ fontSize: 11, color: "A78BFA", breakLine: true }} />
        <TextRun text={'  <TextRun text="Italic text"'} options={{ fontSize: 11, color: "A78BFA", breakLine: true }} />
        <TextRun text={'    options={{italic: true}} />'} options={{ fontSize: 11, color: "A78BFA", breakLine: true }} />
        <TextRun text={'  <TextRun text="Colored"'} options={{ fontSize: 11, color: "A78BFA", breakLine: true }} />
        <TextRun text={'    options={{color:"7C3AED"}} />'} options={{ fontSize: 11, color: "A78BFA", breakLine: true }} />
        <TextRun text={'</Text>'} options={{ fontSize: 11, color: "F87171", breakLine: true }} />
      </Text>

      <Notes>
        This slide demonstrates the Text and TextRun components.
        Each TextRun can have its own formatting options: fontSize, bold, italic, color, and breakLine.
        The Text component handles positioning, alignment, and line spacing.
      </Notes>
    </Slide>
  );
}
