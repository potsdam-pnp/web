import React from 'react'
import ReactDOM from 'react-dom/client'

import './scss/styles.scss'
import cardMetadata from '../dependencies/card-metadata.json';
const cardImages = (import.meta as any).glob("../dependencies/card-images/*.png");


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

interface CardListProps {
  /** The text to display inside the button */
  cards: CardType[];
  selectCard: (cardProperty: CardProperty) => void;
}

type CardListState = {[key: string]: boolean};

class CardList extends React.Component<CardListProps, CardListState> {
  constructor(props: CardListProps) {
    super(props);
    this.state = {};
  }
  toggleExpand(cardType: string) {
    return () =>  {
      console.log("Toggle " + cardType, this.state);
      this.setState({
        ...this.state,
        [cardType]: !this.state[cardType]
      });
    }
  }

  render() {
    return (
      <ul className="list-group">
        {
          this.props.cards.map(card => {
            return (
              <>
                <li className="list-group-item justify-content-between d-flex list-group-item-action fw-bold" onClick={this.toggleExpand(card.type)} key={card.type}>
                  {card.type}
                  <span className="badge bg-secondary rounded-pill">{card.cards.length}</span>
                </li>
                {
                  this.state[card.type] ? 
                    card.cards.map((c, index) => {
                      return (
                       <li className="list-group-item list-group-item-action" key={card.type + "-" + index} onClick={() => this.props.selectCard(c)}>{c.title}</li>
                      )
                  }) : []
                }
              </>
            )
          })
        }
      </ul>
    );
  }
}

function constructAllCards(): CardType[] {
  const types: {[type: string]: CardProperty[]} = {};

  for (const key in cardMetadata) {
    const card: CardProperty = (cardMetadata as any)[key];
    if (card.type == "") continue;
    if (!types[card.type]) {
      types[card.type] = [];
    }
    card.page = key;
    types[card.type].push(card);
  }

  const result: CardType[] = [];
  for (const key in types) {
    result.push({
      type: key,
      cards: types[key]
    });
  }

  return result;
}

interface CardInterface {
  card: CardProperty;
}

interface CardState {
  [page: string]: string
}

class Card extends React.Component<CardInterface, CardState> {
  constructor(props: CardInterface) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.state[this.props.card.page]) {
      const { title, type, level } = this.props.card;
      return (
        <div className="card">
          <img src={this.state[this.props.card.page]} className="card-img-top" alt="Card image" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-subtitle mb-2 text-body-secondary">{type} {level}</p>
          </div>
        </div>
      );
    } else {
      const page = this.props.card.page;
      cardImages["../dependencies/card-images/" + page + ".png"]().then((result: any) => {
        this.setState({
          ...this.state,
          [page]: result.default
        })
      });
      return "Loading";
    }
  }
}

function App() {
  const [ state, setState ] = React.useState<CardProperty | null>(null);
  
  function selectCard(card: CardProperty) {
    setState(card);
  }

  return (
    <div className="container py-4 px-3 mx-auto">
      <h1>Building card decks</h1>
      <div className="d-flex">
        <div className="d-flex flex-column p-2 flex-shrink-0" style={{width: "15em"}}>
          <CardList cards={constructAllCards()} selectCard={selectCard} />
        </div>
        <div className="d-flex flex-column p-2">
          {state ? <Card card={state} /> : "Select which cards to put into your card deck."}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
      <App />
  //</React.StrictMode>,
);
