import * as React from "react";
import { CardDeckContext, CardDeckDispatchContext } from "./card-deck-context";
import { ShowCard } from "./show-card";
import { ButtonGroup, Button, Modal, Form } from "react-bootstrap";


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
  const { decks, selectedDeck } = React.useContext(CardDeckContext)
  const deck = decks.find(d => d.name === selectedDeck);
  if (!deck) {
    return "No card deck selected";
  } else {
    return <div>
        <h1>Deck {deck.name}</h1>
        <p>This deck consists of {deck.cards.length} cards</p>
        <div className="row">
          {deck.cards.map(card => <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-lg-xl-2 py-3">
            <ShowCard card={card}><span></span></ShowCard>
          </div>)}
        </div>
      </div>;
  }
}
