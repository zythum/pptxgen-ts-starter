import { Deck } from "@zythum02/pptxgenjsx";
import { TitleSlide } from "./slides/01-title";
import { AgendaSlide } from "./slides/02-agenda";
import { TextSlide } from "./slides/03-text";
import { LayoutSlide } from "./slides/04-layout";
import { ShapeSlide } from "./slides/05-shape";
import { EndSlide } from "./slides/06-end";

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
      layout={{ name: "WIDE", width: 13.333, height: 7.5 }}
    >
      <TitleSlide />
      <AgendaSlide />
      <TextSlide />
      <LayoutSlide />
      <ShapeSlide />
      <EndSlide />
    </Deck>
  );
}
