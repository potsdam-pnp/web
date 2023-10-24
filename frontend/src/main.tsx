import { StrictMode, useContext, useState } from 'react'
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

  const [ succesfullyCopied, setSuccesfullyCopied ] = useState(false);

  function onClick() {
    navigator.clipboard.writeText(urlStr).then(_ => {
      setSuccesfullyCopied(true);
      setTimeout(() => setSuccesfullyCopied(false), 3000);
    });
  }

  return <div className="input-group my-3">
    <span className="input-group-text">Share card decks</span>
    <input type="text" className="form-control" value={urlStr} disabled={true}></input>
    <button className={"btn " + (succesfullyCopied ? "btn-outline-success" : "btn-outline-secondary")} type="button" onClick={onClick}>Copy to clipboard</button>
    <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
      <div className={"toast text-bg-success" + (succesfullyCopied ? " show" : "")} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className="me-auto">Success</strong>
          <button type="button" className="btn-close" onClick={() => setSuccesfullyCopied(false)} aria-label="Close"></button>
        </div>
        <div className="toast-body">
          Successfully copied url to clipboard.
        </div>
      </div>
    </div>
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
