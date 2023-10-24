import React from 'react'
import ReactDOM from 'react-dom/client'
import { CardSelector } from './card-selector';
import { CardDecks } from './card-decks';
import { Card, CardType } from './card';

import './scss/styles.scss'
import cardMetadata from '../dependencies/card-metadata.json';

function constructAllCards(): CardType[] {
  const types: {[type: string]: Card[]} = {};

  for (const key in cardMetadata) {
    const card: Card = (cardMetadata as any)[key];
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

function App() {
  const selectCard = (card: Card) => {
    // TODO
    console.log("add card", card.title);
  };

  return (
    <div className="container py-4 px-3 mx-auto">
      <h1>Building card decks</h1>
      <CardSelector cards={constructAllCards()} selectCard={selectCard} />
      <CardDecks decks={[]} selected={null} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);
