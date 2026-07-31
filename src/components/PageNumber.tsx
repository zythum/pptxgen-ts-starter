import { Text, TextRun } from "@zythum02/pptxgenjsx";
import { useSlideContext, useGroupContext } from "@zythum02/pptxgenjsx";
import { colors } from "../token/colors";
import { typography } from "../token/typography";

/**
 * Page number indicator — displays "index / total" in the bottom-right corner.
 *
 * Uses **useSlideContext** for the slide index/total and **useGroupContext**
 * for positioning.  This means:
 *
 *   - Placed directly inside a `<Slide>` → positions at the bottom-right
 *     of the entire slide (deck canvas 13.333 × 7.5).
 *   - Placed inside a `<Group>` → positions at the bottom-right of
 *     that group's virtual canvas.
 *
 * Example — standalone on a slide:
 *
 *   <Slide>
 *     <SlideBackground color="light" />
 *     <PageNumber />
 *     ...
 *   </Slide>
 *
 * Example — inside a footer Group:
 *
 *   <Group x={0} y={6.0} w={13.333} h={1.5}>
 *     <PageNumber />
 *   </Group>
 *
 * @param color  Text color (token from src/token/colors). Default: colors.mutedLight.
 *               Use colors.muted for dark backgrounds.
 */
export function PageNumber({ color = colors.mutedLight }: { color?: string }) {
  const { index, total } = useSlideContext();
  const { width, height } = useGroupContext();
  return (
    <Text x={0} y={height - 0.5} w={width - 0.5} h={0.4} align="right" valign="middle">
      <TextRun text={`${index} / ${total}`} options={{ fontSize: typography.size.tiny, color }} />
    </Text>
  );
}
