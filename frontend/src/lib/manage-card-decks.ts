import { Card, CardDeck } from "./card";

export interface State {
  decks: CardDeck[];
  selectedDeck: string | null;
  errors: string[];
  currentlyImporting: CardDeck | null;
}

export type Action = 
    { type: "add-deck", name: string }
  | { type: "select-deck", deck: CardDeck }
  | { type: "remove-selected-deck"}
  | { type: "rename-selected-deck", name: string }
  | { type: "add-card", card: Card }
  | { type: "remove-card", card: Card, index: number }
  | { type: "dismiss-error", index: number }
  | { type: "import-deck", name: string, cards: Card[] }
  | { type: "card-deck-import" }
  | { type: "card-deck-import-dismiss" };


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

function addNewDeck(state: State, deck: CardDeck): State {
  if (state.decks.find(d => d.name === deck.name)) {
    return addError(state, `Card deck with name ${deck.name} already exists`);
  } else {
    return {
      ...state,
      decks: state.decks.concat(deck)
    }
  }
}

export function reduce(state: State, action: Action): State {
  switch (action.type) {
    case "add-deck":
      return addNewDeck(state, {
        cards: [],
        name: action.name
      });
    case "remove-selected-deck":
      return {
        ...state,
        selectedDeck: null,
        decks: state.decks.filter(d => d.name !== state.selectedDeck)
      }
    case "rename-selected-deck":
      return {
        ...state,
        selectedDeck: action.name,
        decks: state.decks.map(d => d.name === state.selectedDeck ? { ...d, name: action.name } : d)
      }
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
      const index = action.index;
      function removeCard(deck: CardDeck) {
        return {
          ...deck,
          cards: deck.cards.slice(0, index).concat(deck.cards.slice(index + 1))
        }
      }
      return updateSelectedDeck(state, removeCard, "Can't remove card when no deck is selected");
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
    case "import-deck":
        return {
          ...state,
          currentlyImporting: {
            name: action.name,
            cards: action.cards
          }
        }
    case "card-deck-import-dismiss":
      return {
        ...state,
        currentlyImporting: null
      }
    case "card-deck-import":
      if (state.currentlyImporting) {
        return addNewDeck({
          ...state,
          currentlyImporting: null
        }, state.currentlyImporting);
      } else {
        return addError(state, "importing non-existing card deck");
      }
  }
}

export const emptyState: State = {
  decks: [],
  errors: [],
  selectedDeck: null,
  currentlyImporting: null
}

export function loadState(storage: string): State {
  return JSON.parse(storage);
}