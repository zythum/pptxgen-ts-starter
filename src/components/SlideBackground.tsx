import { Rect } from "@zythum02/pptxgenjsx";
import { colors } from "../token/colors";

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
  /** "light" → white (#FFFFFF), "dark" → near-black (#18181B) */
  color?: "light" | "dark";
}) {
  const bgColor = color === "dark" ? colors.darkBackground : colors.white;
  return <Rect x={0} y={0} w={13.333} h={7.5} fill={{ color: bgColor }} />;
}
