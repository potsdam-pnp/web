import { Card, CardDeck } from "./card";

export interface State {
  decks: CardDeck[];
  selectedDeck: string | null;
  errors: string[];
}

export type Action = 
    { type: "add-deck", name: string }
  | { type: "select-deck", deck: CardDeck }
  | { type: "add-card", card: Card }
  | { type: "remove-card", card: Card }
  | { type: "dismiss-error", index: number };


function addError(state: State, error: string): State {
  return {
    ...state,
    errors: state.errors.concat(error)
  }
}

function updateSelectedDeck(state: State, updateFun: (deck: CardDeck) => CardDeck, noDeckSelectedError: string): State {
  const selectedDeckIndex = state.decks.findIndex(deck => deck.name === state.selectedDeck);
  if (selectedDeckIndex === -1) {
    return addError(state, noDeckSelectedError);
  }
  return {
    ...state,
    decks: Array.from(state.decks, (deck, index) => {
      if (index != selectedDeckIndex) {
        return deck;
      } else {
        return updateFun(deck);
      }
    })
  }
}

export function reduce(state: State, action: Action): State {
  switch (action.type) {
    case "add-deck":
      return {
        ...state,
        decks: state.decks.concat({
          cards: [],
          name: action.name
        })
      };
    case "add-card":
      const card = action.card;
      function addCardToDeck(deck: CardDeck) {
        return {
          ...deck,
          cards: deck.cards.concat(card)
        }
      }
      return updateSelectedDeck(state, addCardToDeck, "Can't add card when no deck is selected");
    case "remove-card":
      return addError(state, "Removing cards has not yet been implemented");
    case "dismiss-error":
      return {
        ...state,
        errors: state.errors.slice(0, action.index).concat(state.errors.slice(action.index+1))
      };
    case "select-deck":
        return {
          ...state,
          selectedDeck: action.deck.name
        }
  }
}

export const emptyState: State = {
  decks: [],
  errors: [],
  selectedDeck: null
}