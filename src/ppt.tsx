import { Deck, Slide } from "@zythum02/pptxgenjsx";
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
