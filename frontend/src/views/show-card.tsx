import { createElement, ReactNode, useState } from "react";
import { Card } from "../lib/card";

let cardSources: Record<string, string> = {};
const cardImages = (import.meta as any).glob("../../dependencies/card-images/*.png");


export function ShowCard({card, children}: {card: Card, children: ReactNode}) {
  const [src, setSrc] = useState(cardSources[card.page]);

  if (src) {
    const { title, type, level } = card;
    return createElement("div", {className: "card"},
        createElement("img", { src: src, className: "card-img-top", alt: "Card image"}),
        createElement("div", { className: "card-body d-flex flex-row justify-content-between"},
          createElement("div", {},
            createElement("h5", { className: "card-title" }, title),
            createElement("p", { className: "card-subtitle mb-2 text-body-secondary" },
              type, " ", level
            )
          ),
          createElement("div", {}, children)
        ) 
      );
  } else {
    const page = card.page;
    cardImages["../../dependencies/card-images/" + page + ".png"]().then((result: any) => {
      cardSources[page] = result.default;
      setSrc(result.default);
    });
    return <>"Loading"</>;
  }
}
