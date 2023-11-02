import * as React from "react";
import { CardDeckContext, CardDeckDispatchContext } from "./card-deck-context";
import { ShowCard } from "./show-card";
import { ButtonGroup, Button, Modal, Form, InputGroup, ToastContainer, Toast } from "react-bootstrap";
import { Card, CardDeck } from "../lib/card";
import revision from "../../dependencies/revision";


export function CardDecks() {
  return React.createElement("div", {className: "d-flex flex-column"},
    React.createElement("div", {}, React.createElement(CardDecksPicker)),
    React.createElement(CardDeckC, {})
  );
}

function CardDecksPicker() {
  const { decks, selectedDeck } = React.useContext(CardDeckContext);
  const dispatch = React.useContext(CardDeckDispatchContext);

  const [cardDeckName, setCardDeckName] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);

  function addCardDeck() {
    dispatch({
      type: "add-deck",
      name: cardDeckName
    })
    setCardDeckName("");
    setShowModal(false);
  }

  const children = decks.map(deck =>
    <Button 
      variant="outline-primary" 
      active={deck.name === selectedDeck} 
      onClick={() => dispatch({ type: "select-deck", deck }) }>
      {deck.name}
    </Button>
  );

  const modal = <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Add new card deck</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={(e) => { e.preventDefault(); addCardDeck(); }}>
        <Form.Group>
          <Form.Label>Card deck name:</Form.Label>
          <Form.Control type="text" value={cardDeckName} autoFocus onChange={e => setCardDeckName(e.target.value)} />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
      <Button variant="primary" onClick={addCardDeck}>Create</Button>
    </Modal.Footer>
  </Modal>;

  return <ButtonGroup>
    {modal}
    {children}
    <Button variant="outline-secondary" onClick={() => setShowModal(true)}>
      Create new deck
    </Button>
  </ButtonGroup>
}


function CardDeckC() {
  const { decks, selectedDeck } = React.useContext(CardDeckContext);
  const dispatch = React.useContext(CardDeckDispatchContext);
  const deck = decks.find(d => d.name === selectedDeck);

  function removeCard(card: Card, index: number) {
    dispatch({
      type: "remove-card",
      card: card,
      index: index
    })
  }

  if (!deck) {
    return "No card deck selected";
  } else {
    return <div>
        <h1>Deck {deck.name}</h1>
        <p>This deck consists of {deck.cards.length} cards</p>
        <PrintDeck deck={deck} />
        <ShareDeck deck={deck} />
        <RemoveDeck />
        <div className="row">
          {deck.cards.map((card, index) => <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-lg-xl-2 py-3">
            <ShowCard card={card}>
              <Button variant="danger" onClick={() => removeCard(card, index)}>Remove</Button>
            </ShowCard>
          </div>)}
        </div>
      </div>;
  }
}

function RemoveDeck() {
  const dispatch = React.useContext(CardDeckDispatchContext);
  return <Button variant="danger" onClick={() => dispatch({ type: "remove-selected-deck"})}>Remove</Button>
}

function PrintDeck({deck}: {deck: CardDeck}) {
  const [currentlyPrinting, setCurrentlyPrinting] = React.useState(false);

  const pages = deck.cards.map(card => card.page).join(",");
  
  return <>
    <Modal show={currentlyPrinting} size="xl" onHide={() => setCurrentlyPrinting(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Print card deck</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        To print a card deck, you need to follow a few steps.
        <ol className="py-1">
          <li className="py-1">Go to <a href="https://github.com/potsdam-pnp/web/actions/workflows/print-deck.yml" target="_blank">https://github.com/potsdam-pnp/pf2e-cards/actions/workflows/print-deck.yml</a></li>
          <li className="py-1">Click on <strong>Run workflow</strong></li>
          <li className="py-1">
            <div className="mb-3">Copy the following content into the <strong>input</strong> text field:</div>
          <InputGroup className="mb-3">
            <InputGroup.Text>Input</InputGroup.Text>
            <Form.Control type="text" value={revision + ":" + pages} readOnly onFocus={e => { e.target.select(); navigator.clipboard.writeText(revision); }} />
          </InputGroup>
        </li>
        <li className="py-1">Click on <strong>Run workflow</strong></li>
        <li className="py-1">Wait for workflow to be finished</li>
      </ol>
      Afterwards, you can download your pdf from the workflow artifact.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setCurrentlyPrinting(false)}>Finished printing</Button>
      </Modal.Footer>
    </Modal>
    <Button disabled={deck.cards.length===0} onClick={() => setCurrentlyPrinting(true)}>Print this deck</Button>
  </>;
}

function ShareDeck({deck}: {deck: CardDeck}) {
  const [recentlyCopied, setRecentlyCopied] = React.useState(false);
  const [url, setUrl] = React.useState("");
  
  function shareDeck() {
    const url = new URL(window.location.href);
    const cards = btoa(JSON.stringify(deck.cards));
    url.hash = "?shareDeck=" + encodeURIComponent(deck.name) + "&" + encodeURIComponent(cards);
    const urlStr = url.toString();
    setUrl(urlStr);
    navigator.clipboard.writeText(urlStr);
    setRecentlyCopied(true);
    setTimeout(() => setRecentlyCopied(false), 2000);
  }
  
  return <>
    <ToastContainer position="top-center" containerPosition="fixed" className="p-3">
      <Toast bg="success" show={recentlyCopied} onClose={() => setRecentlyCopied(false)}>
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>
          Successfully copied url to clipboard. <br />
          {url.substring(0, 50) + "..."}
        </Toast.Body>
      </Toast>
    </ToastContainer>
    <Button className="mx-2" disabled={deck.cards.length===0} onClick={shareDeck}>Share this deck</Button>
  </>;
}