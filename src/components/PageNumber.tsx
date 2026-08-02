import { Text, TextRun } from "@zythum02/pptxgenjsx";
import { useSlideContext, useGroupContext } from "@zythum02/pptxgenjsx";
import { colors } from "../token/colors";
import { typography } from "../token/typography";

const PAGE_NUMBER_WIDTH = 1.2;
const PAGE_NUMBER_HEIGHT = 0.3;
const PAGE_NUMBER_RIGHT_INSET = 0.7;
const PAGE_NUMBER_BOTTOM_INSET = 0.1;

/**
 * Page number indicator — displays "index / total" in a compact box anchored
 * to the bottom-right of the current slide or Group canvas.
 *
 * Uses **useSlideContext** for the slide index/total and **useGroupContext**
 * for positioning. This means:
 *
 *   - Placed directly inside a `<Slide>` → anchors to the entire deck canvas.
 *   - Placed inside a `<Group>` → anchors to that Group's virtual canvas.
 *
 * The default 1.2 × 0.3 in box leaves ample room for four-digit page counts at
 * 10pt while avoiding a full-width, hard-to-select PowerPoint text box.
 *
 * @param color Text color (token from src/token/colors). Default: colors.mutedLight,
 *              which passes normal-text AA on the demo's light and dark backgrounds.
 *              Override only with a color verified against the target background.
 */
export function PageNumber({ color = colors.mutedLight }: { color?: string }) {
  const { index, total } = useSlideContext();
  const { width, height } = useGroupContext();

  const boxW = Math.min(PAGE_NUMBER_WIDTH, width);
  const boxH = Math.min(PAGE_NUMBER_HEIGHT, height);
  const x = Math.max(0, width - PAGE_NUMBER_RIGHT_INSET - boxW);
  const y = Math.max(0, height - PAGE_NUMBER_BOTTOM_INSET - boxH);

  return (
    <Text x={x} y={y} w={boxW} h={boxH} align="right" valign="middle">
      <TextRun text={`${index} / ${total}`} options={{ fontSize: typography.size.tiny, color }} />
    </Text>
  );
}
