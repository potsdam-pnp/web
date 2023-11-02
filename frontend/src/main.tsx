import { StrictMode, useContext, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { CardSelector } from './views/card-selector';
import { CardDecks } from './views/card-decks';
import loadCardMetadata from './lib/load-card-metadata';
import { Provider } from 'react-redux'
import store from "./store"


import './scss/styles.scss'
import { CardDeckContext, CardDeckDispatchContext, CardDeckState } from './views/card-deck-context';
import { ShowErrors } from './views/show-errors';
import { Button, Form, InputGroup, ToastContainer, Toast, Container } from 'react-bootstrap';
import { ImportDialog } from './views/import-dialog';

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

  return <InputGroup className="my-3">
      <InputGroup.Text>Share card decks</InputGroup.Text>
      <Form.Control type="text" disabled={true} value={urlStr} />
      <Button variant={ succesfullyCopied ? "outline-success" : "outline-secondary" } onClick={onClick}>
        Copy to clipboard
      </Button>
      <ToastContainer position="top-center" containerPosition="fixed" className="p-3">
        <Toast bg="success" show={succesfullyCopied} onClose={() => setSuccesfullyCopied(false)}>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>
            Successfully copied url to clipboard.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </InputGroup>;
}

function App() {
  const dispatch = useContext(CardDeckDispatchContext);

  return (
      <Container className="py-4 px-3 mx-auto">
        <h1>Building card decks</h1>
        <ShowErrors />
        <ImportDialog />
        <CardSelector cards={loadCardMetadata()} selectCard={card => dispatch({ type: "add-card", card: card })} />
        <CardDecks />
        <Share />
      </Container>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <CardDeckState><App /></CardDeckState>
     </Provider>
  </StrictMode>,
);
