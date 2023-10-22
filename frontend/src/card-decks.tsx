import * as React from "react";
import { CardProperty } from "./card";
import { Modal } from "bootstrap";

interface CardDeck {
  name: string;
  cards: CardProperty[];
}

interface CardDecksProps {
  decks: CardDeck[];
  selected: CardDeck | null;
}

export class CardDecks extends React.Component<CardDecksProps > {
  render() {
    return React.createElement("div", {},
      React.createElement("div", {className: "d-flex flex-row"},
        React.createElement(CardDecksPicker, this.props),
      )
    );
  }
}

class CardDecksPicker extends React.Component<CardDecksProps> {
  render() {
    const classes = (deck: CardDeck | null) => 
      deck === this.props.selected ? 
      "btn btn-outline-primary active ": 
      "btn btn-outline-primary";
    const children = this.props.decks.map(deck =>
      React.createElement("button", { type: "button", className: classes(deck)}, deck.name)
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
}


class AddCardDeckModal extends React.Component {
  render() {
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
                <input type="text" className="form-control" id="recipient-name"></input>
              </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Create</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}