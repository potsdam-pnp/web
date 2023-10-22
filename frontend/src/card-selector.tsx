import * as React from 'react'

interface CardProperty {
  title: string;
  type: string;
  level: number;
  page: string;
}

interface CardType {
  type: string;
  cards: CardProperty[];
}

interface CardSelectorProps {
  /** The text to display inside the button */
  cards: CardType[];
}

interface CardSelectorState {
  selectedType: CardType | null;
  selectedCard: CardProperty | null;
}

export class CardSelector extends React.Component<CardSelectorProps, CardSelectorState> {
  constructor(props: CardSelectorProps) {
    super(props);
    this.state = {
      selectedType: null,
      selectedCard: null
    }
  }

  selectCardType(cardType: CardType) {
    this.setState({
        selectedType: cardType,
        selectedCard: null
    });
  }

  selectCard(card: CardProperty) {
    this.setState({
      selectedType: this.state.selectedType,
      selectedCard: card
    });
  }

  render() {
    return React.createElement("div", { className: "d-flex" },
      React.createElement("div", { className: "d-flex flex-column p-2 flex-shrink-0", style: { width: "15em" }},
        React.createElement(CardTypeList, { cards: this.props.cards, selected: this.state.selectedType, onSelect: (cardType) => this.selectCardType(cardType) })
      ),
      React.createElement("div", { className: "d-flex flex-column p-2 flex-shrink-0", style: { width: "15em" }},
        ...(this.state.selectedType ? [React.createElement(CardList, { cards: this.state.selectedType.cards, selected: this.state.selectedCard, onSelect: (card) => this.selectCard(card) })] : [])
      ),
      React.createElement("div", { className: "d-flex flex-column p-2" },
        ...(this.state.selectedCard ? [React.createElement(Card, { card: this.state.selectedCard })] : [])
      )
    );
  }
}

interface CardTypeListProps extends CardSelectorProps {
  selected: CardType | null;
  onSelect: (cardType: CardType) => void;
}

class CardTypeList extends React.Component<CardTypeListProps> {
  render() {
    const nonActiveClassList = "list-group-item justify-content-between d-flex list-group-item-action fw-bold";
    const activeClassList = nonActiveClassList + " active";
    const classList = (card: CardType) => card === this.props.selected ? activeClassList : nonActiveClassList;
    return React.createElement("ul", { className: "list-group overflow-auto",  style: {maxHeight: "620px"}},
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
  cards: CardProperty[];
  selected: CardProperty | null;
  onSelect: (card: CardProperty) => void;
}

class CardList extends React.Component<CardListProps> {
  render() {
    const nonActiveClassList = "list-group-item justify-content-between d-flex list-group-item-action";
    const activeClassList = nonActiveClassList + " active";
    const classList = (card: CardProperty | null) => card === this.props.selected ? activeClassList : nonActiveClassList;
    return React.createElement("ul", { className: "list-group overflow-auto",  style: {maxHeight: "620px"}},
      ...this.props.cards.map(card =>
        React.createElement("li", { className: classList(card), onClick: () => this.props.onSelect(card)},
          card.title
        )
      )
    );
  }
}


interface CardInterface {
  card: CardProperty;
}

interface CardState {
  [page: string]: string
}

const cardImages = (import.meta as any).glob("../dependencies/card-images/*.png");

class Card extends React.Component<CardInterface, CardState> {
  constructor(props: CardInterface) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.state[this.props.card.page]) {
      const { title, type, level } = this.props.card;
      return React.createElement("div", {className: "card"},
          React.createElement("img", { src: this.state[this.props.card.page], className: "card-img-top", alt: "Card image"}),
          React.createElement("div", { className: "card-body"},
            React.createElement("h5", { className: "card-title" }, title),
            React.createElement("p", { className: "card-subtitle mb-2 text-body-secondary" },
              type, " ", level
            )
          )
        );
    } else {
      const page = this.props.card.page;
      cardImages["../dependencies/card-images/" + page + ".png"]().then((result: any) => {
        this.setState({
          ...this.state,
          [page]: result.default
        });
      });
      return "Loading";
    }
  }
}

//         {
//           this.props.cards.map(card => {
//             return (
//               <>
//                 <li className="list-group-item justify-content-between d-flex list-group-item-action fw-bold" onClick={this.toggleExpand(card.type)} key={card.type}>
//                   {card.type}
//                   <span className="badge bg-secondary rounded-pill">{card.cards.length}</span>
//                 </li>
//                 {
//                   this.state[card.type] ? 
//                     card.cards.map((c, index) => {
//                       return (
//                        <li className="list-group-item list-group-item-action" key={card.type + "-" + index} onClick={() => this.props.selectCard(c)}>{c.title}</li>
//                       )
//                   }) : []
//                 }
//               </>
//             )
//           })
//         }
//       </ul>
//   }
// }