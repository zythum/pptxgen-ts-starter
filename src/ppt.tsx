import { Deck, Slide } from "@zythum02/pptxgenjsx";

/* Design spec mirror — .deck/spec.md
   Status: confirmed (reference example, user-delegated)
   Canvas: LAYOUT_WIDE 13.333 × 7.5 — 8 slides
   Style: S8 Dev / Data — information-first
   Palette: white/light content + 18181B cover/closing; accent 7C3AED
   Fonts: Inter token / Courier New mono; legacy prose uses renderer default
   Density: tutorial 25–40% Sparse; actual 25%
   Layouts: L1, V-L5-workflow-strip, L4, V-L5-cards-4,
            V-L4-shape-gallery, L11, L4, L9
   Visuals: code-native only; no external assets
*/
/**
 * Sample presentation — demonstrates the full feature set of pptxgenjs-jsx.
 *
 * Replace these slide imports with your own slides to build your deck.
 * See each slide file for examples of different JSX elements.
 */

export default function () {
  return (
    <Deck
      title="Getting Started with pptxgen-ts-starter"
      author="pptxgen-ts-starter"
      layout="LAYOUT_WIDE"
    >
      <Slide component={() => import("./slides/01-title")} />
      <Slide component={() => import("./slides/02-agenda")} />
      <Slide component={() => import("./slides/03-text")} />
      <Slide component={() => import("./slides/04-layout")} />
      <Slide component={() => import("./slides/05-shape")} />
      <Slide component={() => import("./slides/06-table")} />
      <Slide component={() => import("./slides/07-chart")} />
      <Slide component={() => import("./slides/08-end")} />
    </Deck>
  );
}
