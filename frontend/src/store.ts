import { configureStore } from '@reduxjs/toolkit';
import cardDecksReducer from './reducers/card-decks';

export default configureStore({
  reducer: {
    "card-decks": cardDecksReducer
  }
});
