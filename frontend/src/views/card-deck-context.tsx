import { createContext, PropsWithChildren, useReducer } from "react";
import * as ManageCardDecks from "../lib/manage-card-decks";

export const CardDeckContext = createContext(ManageCardDecks.emptyState);
export const CardDeckDispatchContext = createContext((_: ManageCardDecks.Action) => {});

let initialHash = window.location.hash;


function initialState() {
  if (initialHash.length > 5 && initialHash[1] != "?") {
    const str = atob(initialHash.slice(1));
    window.history.replaceState(undefined, "", window.location.pathname);
    return JSON.parse(str) as ManageCardDecks.State;
  } else {
    const cardDecks = window.localStorage.getItem("card-decks");
    let result;
    if (cardDecks) {
      result = ManageCardDecks.loadState(cardDecks);
    } else {
      result = ManageCardDecks.emptyState;
    }
    if (initialHash.startsWith("#?shareDeck=")) {
      const content = initialHash.substring(12);
      const [name1, content1] = content.split("&");
      const name = decodeURIComponent(name1);
      const json = atob(decodeURIComponent(content1))
      const cards = JSON.parse(json);
      result = ManageCardDecks.reduce(result, { type: "import-deck", name, cards });
    }
    window.history.replaceState(undefined, "", window.location.pathname);
    return result;
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