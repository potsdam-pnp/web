import * as React from 'react'
import { Badge, Button, ListGroup } from 'react-bootstrap';
import { Card, CardType } from "../lib/card"
import { ShowCard } from './show-card';

interface CardSelectorProps {
  /** The text to display inside the button */
  cards: CardType[];
  selectCard: (card: Card) => void;
}

export function CardSelector({cards, selectCard}: CardSelectorProps) {
  const [selectedType, setSelectedType] = React.useState<CardType | null>(null);
  const [selectedCard, setSelectedCard] = React.useState<Card | null>(null);

  function selectCardType(cardType: CardType) {
    setSelectedType(cardType);
    setSelectedCard(null);
  }

  let showCard;
  if (selectedCard) {
    showCard = <ShowCard card={selectedCard}>
      <Button variant="success" onClick={() => selectCard(selectedCard)}>Add</Button>
    </ShowCard>
  } else {
    showCard = <></>
  }

  return React.createElement("div", { className: "d-md-flex flex-md-row my-row" },
    React.createElement("div", { className: "d-flex flex-column p-2 flex-shrink-0 my-col-6 flex-width-15"},
      React.createElement(CardTypeList, { cards: cards, selected: selectedType, onSelect: (cardType) => selectCardType(cardType) })
    ),
    React.createElement("div", { className: "d-flex flex-column p-2 flex-shrink-0 my-col-6 flex-width-15"},
      ...(selectedType ? [React.createElement(CardList, { cards: selectedType.cards, selected: selectedCard, onSelect: (card) => setSelectedCard(card) })] : [])
    ),
    React.createElement("div", { className: "d-flex flex-column p-2 my-col-12" }, showCard)
  );
}

interface CardTypeListProps {
  cards: CardType[];
  selected: CardType | null;
  onSelect: (cardType: CardType) => void;
}

function CardTypeList({cards, selected, onSelect}: CardTypeListProps) {
  return <ListGroup className="overflow-auto card-list-height">
    {cards.map(card =>
      <ListGroup.Item action className="justify-content-between d-flex fw-bold" active={card === selected} onClick={() => onSelect(card)}>
        {card.type}
        <Badge bg="secondary" pill>{card.cards.length}</Badge>
      </ListGroup.Item>
    )}
  </ListGroup>
}

interface CardListProps {
  cards: Card[];
  selected: Card | null;
  onSelect: (card: Card) => void;
}

function CardList  ({ cards, onSelect, selected}: CardListProps) {
  return <ListGroup className="overflow-auto card-list-height">
    {cards.map(card =>
      <ListGroup.Item className="justify-content-between d-flex" action active={card === selected} onClick={() => onSelect(card)}>
        {card.title}
      </ListGroup.Item>  
    )}
  </ListGroup>
}
