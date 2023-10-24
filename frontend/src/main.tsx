import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import { CardSelector } from './views/card-selector';
import { CardDecks } from './views/card-decks';
import loadCardMetadata from './lib/load-card-metadata';

import './scss/styles.scss'
import { CardDeckContext, CardDeckDispatchContext, CardDeckState } from './views/card-deck-context';
import { ShowErrors } from './views/show-errors';

function Share() {
  const state = useContext(CardDeckContext);
  const base64 = btoa(JSON.stringify(state));
  const url = new URL(window.location.href);
  url.hash = base64;
  const urlStr = url.toString();

  function onClick() {
    navigator.share({
      url: urlStr
    });
  }

  return <div className="py-3">Share current page content:
    <button type="button" className="btn btn-success" onClick={onClick}>Share</button>
  </div>;
}

function App() {
  const dispatch = useContext(CardDeckDispatchContext);

  return (
      <div className="container py-4 px-3 mx-auto">
        <h1>Building card decks</h1>
        <ShowErrors />
        <CardSelector cards={loadCardMetadata()} selectCard={card => dispatch({ type: "add-card", card: card })} />
        <CardDecks />
        <Share />
      </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <CardDeckState><App /></CardDeckState>
  </StrictMode>,
);
