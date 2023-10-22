export interface CardProperty {
  title: string;
  type: string;
  level: number;
  page: string;
}

export interface CardType {
  type: string;
  cards: CardProperty[];
}
