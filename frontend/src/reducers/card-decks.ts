import { createSlice } from '@reduxjs/toolkit'
import { CardDeck } from '../lib/card'

interface CardDecks {
  decks: CardDeck[];
  selectedDeck: string | null;
}

export const cardDeckSlice = createSlice({
  name: 'counter',
  initialState: [] as CardDeck[],
  reducers: {
    addDeck: (state: CardDeck[], action: { payload: string}) => {
      state.push({
        name: action.payload,
        cards: []
      })
    },
    removeDeck: (state: CardDeck[], action: { payload: string }) => {
      return state.filter(d => d.name !== action.payload);
    },
  }
})

export const { addDeck, removeDeck } = cardDeckSlice.actions

export default cardDeckSlice.reducer

