import { ReactNode, useState } from "react";
import { Card as BCard } from "react-bootstrap";
import { Card } from "../lib/card";

const cardImages = (import.meta as any).glob("../../dependencies/card-images/*.png", { eager: true });

export function ShowCard({card, children}: {card: Card, children: ReactNode}) {
  const { title, type, level, page } = card;
  const src = cardImages["../../dependencies/card-images/" + page + ".png"].default;
  return <BCard>
    <BCard.Img variant="top" src={src} />
    <BCard.Body className="d-flex flex-row justify-content-between">
      <div>
        <BCard.Title>{title}</BCard.Title>
        <BCard.Subtitle>{type} {level}</BCard.Subtitle>
      </div>
      {children}
    </BCard.Body>
  </BCard>
}
