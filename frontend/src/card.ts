
export interface Card {
  title: string;
  type: string;
  level: number;
  page: string;
}

export interface CardType {
  type: string;
  cards: Card[];
}

export interface CardDeck {
  name: string;
  cards: Card[];
}
