import { createContext, PropsWithChildren, useReducer } from "react";
import * as ManageCardDecks from "../lib/manage-card-decks";

export const CardDeckContext = createContext(ManageCardDecks.emptyState);
export const CardDeckDispatchContext = createContext((_: ManageCardDecks.Action) => {});

function initialState() {
  if (window.location.hash.length > 5) {
    const str = atob(window.location.hash.slice(1));
    return JSON.parse(str) as ManageCardDecks.State;
  } else {
    return ManageCardDecks.emptyState;
  }
}

export function CardDeckState({ children }: PropsWithChildren) {
  const [cardDecks, dispatch] = useReducer(ManageCardDecks.reduce, undefined, initialState);


  return <CardDeckContext.Provider value={cardDecks}>
    <CardDeckDispatchContext.Provider value={dispatch}>
      {children}
    </CardDeckDispatchContext.Provider>
    </CardDeckContext.Provider>;
} 