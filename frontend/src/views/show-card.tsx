import { ReactNode, useState } from "react";
import { Card as BCard } from "react-bootstrap";
import { Card } from "../lib/card";

let cardSources: Record<string, string> = {};
const cardImages = (import.meta as any).glob("../../dependencies/card-images/*.png");

export function ShowCard({card, children}: {card: Card, children: ReactNode}) {
  const [src, setSrc] = useState({ [card.page]: cardSources[card.page] });

  if (!(card.page in src)) {
    setSrc({ [card.page]: cardSources[card.page] });
    return;
  }

  if (!src[card.page]) {
    const page = card.page;
    cardImages["../../dependencies/card-images/" + page + ".png"]().then((result: any) => {
      cardSources[page] = result.default;
      setSrc({ [card.page]: result.default });
    });
  }

  const { title, type, level } = card;
  return <BCard>
    <BCard.Img variant="top" src={src[card.page] || ""} />
    <BCard.Body className="d-flex flex-row justify-content-between">
      <div>
        <BCard.Title>{title}</BCard.Title>
        <BCard.Subtitle>{type} {level}</BCard.Subtitle>
      </div>
      {children}
    </BCard.Body>
  </BCard>
}
