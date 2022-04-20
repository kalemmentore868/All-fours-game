export default class Card {
    constructor(suit, value, cardId, playedBy) {
        this.suit = suit;
        this.value = value;
        this.playedBy = playedBy;
        this.cardId = cardId;
    }
    get color() {
        return this.suit === "♣" || this.suit === "♠" ? "black" : "red";
    }
    getHTML() {
        const cardDiv = document.createElement("div");
        cardDiv.innerText = this.suit;
        cardDiv.classList.add("card", this.color);
        cardDiv.dataset.value = `${this.value} ${this.suit}`;
        return cardDiv;
    }
}
