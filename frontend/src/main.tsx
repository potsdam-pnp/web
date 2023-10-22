import React from 'react'
import ReactDOM from 'react-dom/client'
import { CardSelector } from './card-selector';

import './scss/styles.scss'
import cardMetadata from '../dependencies/card-metadata.json';

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

function App() {
  return (
    <div className="container py-4 px-3 mx-auto">
      <h1>Building card decks</h1>
      <CardSelector cards={constructAllCards()} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);
