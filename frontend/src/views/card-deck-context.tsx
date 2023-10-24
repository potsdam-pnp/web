import { createContext, PropsWithChildren, useReducer } from "react";
import * as ManageCardDecks from "../lib/manage-card-decks";

export const CardDeckContext = createContext(ManageCardDecks.emptyState);
export const CardDeckDispatchContext = createContext((_: ManageCardDecks.Action) => {});


export function CardDeckState({ children }: PropsWithChildren) {
  const [cardDecks, dispatch] = useReducer(ManageCardDecks.reduce, ManageCardDecks.emptyState);


  return <CardDeckContext.Provider value={cardDecks}>
    <CardDeckDispatchContext.Provider value={dispatch}>
      {children}
    </CardDeckDispatchContext.Provider>
    </CardDeckContext.Provider>;
} 