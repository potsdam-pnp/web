import * as React from "react";
import { CardDeck } from "../lib/card";
import { Modal } from "bootstrap";
import { CardDeckContext, CardDeckDispatchContext } from "./card-deck-context";
import { ShowCard } from "./show-card";


export function CardDecks() {
  return React.createElement("div", {className: "d-flex flex-column"},
    React.createElement("div", {}, React.createElement(CardDecksPicker)),
    React.createElement(CardDeckC, {})
  );
}

function CardDecksPicker() {
  const { decks, selectedDeck } = React.useContext(CardDeckContext);
  const dispatch = React.useContext(CardDeckDispatchContext);

  const classes = (deck: CardDeck) => 
    deck.name === selectedDeck ? 
    "btn btn-outline-primary active ": 
    "btn btn-outline-primary";
  const children = decks.map(deck =>
    React.createElement("button", { type: "button", className: classes(deck), onClick: () => dispatch({ type: "select-deck", deck }) }, deck.name)
  );
const addDeck = React.createElement("button", { 
    type: "button", 
    className: "btn btn-outline-secondary",
    //"bs-data-toggle": "modal",
    //"bs-data-target": "#add-card-deck-modal"
    onClick: () => (new Modal("#add-card-deck-modal", {  })).show()
  }, 
    "Create new deck"
  );

  return React.createElement("div", { className: "btn-group", role: "group" },
    React.createElement(AddCardDeckModal, {}),
    ...children,
    addDeck);
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
          {deck.cards.map(card => <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-lg-xl-2 py-3"><ShowCard card={card}><span></span></ShowCard></div>)}
        </div>
      </div>;
  }
}

function AddCardDeckModal() {
  const dispatch = React.useContext(CardDeckDispatchContext);

  const [cardDeckName, setCardDeckName] = React.useState("");

  function onClick() {
    dispatch({
      type: "add-deck",
      name: cardDeckName
    })
    setCardDeckName("");
  }

  return (
    <div id="add-card-deck-modal" className="modal fade" aria-hidden="true" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add new card deck</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="form-group"></div>
              <label htmlFor="recipient-name" className="col-form-label">Card deck name:</label>
              <input type="text" className="form-control" value={cardDeckName} onChange={e => setCardDeckName(e.target.value)}></input>
            </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onClick}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}