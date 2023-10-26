import * as React from 'react'
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
      <button className="btn btn-success" onClick={() => selectCard(selectedCard)}>Add</button>
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

class CardTypeList extends React.Component<CardTypeListProps> {
  render() {
    const nonActiveClassList = "list-group-item justify-content-between d-flex list-group-item-action fw-bold";
    const activeClassList = nonActiveClassList + " active";
    const classList = (card: CardType) => card === this.props.selected ? activeClassList : nonActiveClassList;
    return React.createElement("ul", { className: "list-group overflow-auto card-list-height" },
      ...this.props.cards.map(card =>
        React.createElement("li", { className: classList(card), onClick: () => this.props.onSelect(card)},
          card.type,
          React.createElement("span", { className: "badge bg-secondary rounded-pill" }, 
            card.cards.length
          )
        )
      )
    );
  }
}

interface CardListProps {
  cards: Card[];
  selected: Card | null;
  onSelect: (card: Card) => void;
}

class CardList extends React.Component<CardListProps> {
  render() {
    const nonActiveClassList = "list-group-item justify-content-between d-flex list-group-item-action";
    const activeClassList = nonActiveClassList + " active";
    const classList = (card: Card | null) => card === this.props.selected ? activeClassList : nonActiveClassList;
    return React.createElement("ul", { className: "list-group overflow-auto card-list-height"},
      ...this.props.cards.map(card =>
        React.createElement("li", { className: classList(card), onClick: () => this.props.onSelect(card)},
          card.title
        )
      )
    );
  }
}
