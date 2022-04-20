import Card from "./Card.js";
const SUITS = ["♠", "♥", "♦", "♣"];
const VALUES = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
];
export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards;
    }
    get numberOfCards() {
        return this.cards.length;
    }
    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
    dealCard() {
        return this.cards.shift();
    }
}
function freshDeck() {
    return SUITS.flatMap((suit) => {
        return VALUES.map((value, index) => {
            return new Card(suit, value, index, "");
        });
    });
}
