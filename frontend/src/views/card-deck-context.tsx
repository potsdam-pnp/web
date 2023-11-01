import { createContext, PropsWithChildren, useReducer } from "react";
import * as ManageCardDecks from "../lib/manage-card-decks";

export const CardDeckContext = createContext(ManageCardDecks.emptyState);
export const CardDeckDispatchContext = createContext((_: ManageCardDecks.Action) => {});

function initialState() {
  if (window.location.hash.length > 5) {
    const str = atob(window.location.hash.slice(1));
    return JSON.parse(str) as ManageCardDecks.State;
  } else {
    const cardDecks = window.localStorage.getItem("card-decks");
    if (cardDecks) {
      return ManageCardDecks.loadState(cardDecks);
    } else {
      return ManageCardDecks.emptyState;
    }
  }
}

export function CardDeckState({ children }: PropsWithChildren) {
  const [cardDecks, dispatchWrapper] = useReducer(ManageCardDecks.reduce, undefined, initialState);
  function dispatch(action: ManageCardDecks.Action) {
    window.localStorage.setItem("card-decks", JSON.stringify(ManageCardDecks.reduce(cardDecks, action)));
    dispatchWrapper(action);
  }

  return <CardDeckContext.Provider value={cardDecks}>
    <CardDeckDispatchContext.Provider value={dispatch}>
      {children}
    </CardDeckDispatchContext.Provider>
    </CardDeckContext.Provider>;
} 