import cardMetadata from '../../dependencies/card-metadata.json';
import { Card, CardType } from './card';

export default function (): CardType[] {
  const types: {[type: string]: Card[]} = {};

  for (const key in cardMetadata) {
    const card: Card = (cardMetadata as any)[key];
    if (card.type == "") continue;
    if (!types[card.type]) {
      types[card.type] = [];
    }
    card.page = key;
    types[card.type].push(card);
  }

  const result: CardType[] = [];
  for (const key in types) {
    result.push({
      type: key,
      cards: types[key]
    });
  }

  return result;
}
