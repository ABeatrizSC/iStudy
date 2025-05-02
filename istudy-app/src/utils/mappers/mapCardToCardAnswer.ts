import { Card, CardAnswer } from "@/resources/services/flashcard/flashcard.resource";

export const mapCardToCardAnswer = (card: Card): CardAnswer => ({
  id: card.id,
  isHit: card.isHit 
});
  