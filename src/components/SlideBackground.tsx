import { Rect } from "@zythum02/pptxgenjsx";

/**
 * Full-size slide background — the first element on every slide.
 *
 * Usage:
 *   <Slide>
 *     <SlideBackground color="light" />
 *     ...
 *   </Slide>
 */
export function SlideBackground({
  color = "light",
}: {
  /** "light" → white (#FFFFFF), "dark" → near-black (#1E1E2E) */
  color?: "light" | "dark";
}) {
  const bgColor = color === "dark" ? "1E1E2E" : "FFFFFF";
  return <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: bgColor }} />;
}
