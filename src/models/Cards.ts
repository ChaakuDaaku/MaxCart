export interface Cards {
    cardsDataset : Card[]
}

export interface Card {
    id: number;
    card_id: string;
    business_name: string;
    card_description: string;
}