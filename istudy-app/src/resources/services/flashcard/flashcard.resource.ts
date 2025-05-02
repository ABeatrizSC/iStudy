export interface CardRequest {
    question: string;
    answer: string;
}

export interface FlashcardRequest {
    title: string;
    cards: CardRequest[];
}

export interface CardAnswer {
    id: string;
    isHit: boolean;
}

export interface FlashcardAnswer {
    cardsAnswer: CardAnswer[];
}

export interface Card {
    id: string;
    question: string;
    answer: string;
    isHit: boolean;
}

export interface Flashcard {
    id: string;
    createdBy: string;
    title: string;
    cards: Card[];
}  