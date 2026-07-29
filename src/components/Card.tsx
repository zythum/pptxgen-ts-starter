import { RoundRect, Group, type PptxNode, type PptxNodePromise } from "@zythum02/pptxgenjsx";

/** Union of all types produced by JSX expressions under this jsxImportSource */
type PptxChildNode = PptxNode | PptxNodePromise | Promise<PptxNode>;

export type CardProps = {
  /** Left edge x position (inches) */
  x: number;
  /** Top edge y position (inches) */
  y: number;
  /** Width (inches) */
  w: number;
  /** Height (inches) */
  h: number;
  /** Background fill color (hex without #). Default: "FFFFFF" */
  fill?: string;
  /**
   * Optional left accent bar color.
   * When set, renders a thin (0.08") RoundRect on the left edge.
   */
  accentColor?: string;
  /** Show a light gray border (1px). Default: false */
  border?: boolean;
  /** Show a subtle outer shadow. Default: false */
  shadow?: boolean;
  /** Child elements placed at absolute positions inside the card area */
  children?: PptxChildNode | PptxChildNode[];
};

/**
 * Rounded card container with optional accent bar, border, and shadow.
 *
 * Children are positioned **relative** to the card's top-left corner.
 * The card wraps children in a `<Group>` so `x={0} y={0}` is the
 * card's own top-left corner.
 *
 * Usage:
 *   <Card x={0.8} y={2.0} w={5.6} h={2.2} fill="F3F0FF">
 *     <Text x={0.3} y={0.2} ...>...</Text>
 *     <Text x={0.3} y={0.8} ...>...</Text>
 *   </Card>
 */
export function Card({
  x,
  y,
  w,
  h,
  fill = "FFFFFF",
  accentColor,
  border = false,
  shadow = false,
  children,
}: CardProps) {
  return (
    <>
      <RoundRect
        x={x}
        y={y}
        w={w}
        h={h}
        fill={{ color: fill }}
        rectRadius={0.15}
        line={border ? { color: "E5E7EB" as const, width: 1 } : undefined}
        shadow={
          shadow
            ? ({
                type: "outer" as const,
                blur: 8,
                offset: 2,
                color: "000000" as const,
                opacity: 0.06,
              } as const)
            : undefined
        }
      />
      {accentColor && (
        <RoundRect x={x} y={y} w={0.08} h={h} fill={{ color: accentColor }} rectRadius={0.04} />
      )}
      <Group x={x} y={y} w={w} h={h}>
        {children}
      </Group>
    </>
  );
}
