import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import { CardSelector } from './views/card-selector';
import { CardDecks } from './views/card-decks';
import loadCardMetadata from './lib/load-card-metadata';

import './scss/styles.scss'
import { CardDeckDispatchContext, CardDeckState } from './views/card-deck-context';
import { ShowErrors } from './views/show-errors';

function App() {
  const dispatch = useContext(CardDeckDispatchContext);

  return (
      <div className="container py-4 px-3 mx-auto">
        <h1>Building card decks</h1>
        <ShowErrors />
        <CardSelector cards={loadCardMetadata()} selectCard={card => dispatch({ type: "add-card", card: card })} />
        <CardDecks />
      </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <CardDeckState><App /></CardDeckState>
  </StrictMode>,
);
