import { Rect } from "@zythum02/pptxgenjsx";
import { colors } from "../token/colors";

/**
 * Full-canvas background — keep this as the first root-level element on every
 * slide. Percentage dimensions resolve against the current context, so placing
 * it inside a Group intentionally fills only that Group rather than the slide.
 */
export function SlideBackground({
  color = "light",
}: {
  /** "light" → colors.white; "dark" → colors.darkBackground */
  color?: "light" | "dark";
}) {
  const bgColor = color === "dark" ? colors.darkBackground : colors.white;
  return <Rect x={0} y={0} w="100%" h="100%" fill={{ color: bgColor }} />;
}
