export default class Round {
    constructor(trump, highestTrumpCard, lowestTrumpCard, players, whoDealt, dealerPositionAtTable, nextDealer) {
        this.trump = trump;
        this.highestTrumpCard = highestTrumpCard;
        this.lowestTrumpCard = lowestTrumpCard;
        this.players = players;
        this.whoDealt = whoDealt;
        this.dealerPositionAtTable = dealerPositionAtTable;
        this.nextDealer = nextDealer;
    }
    getCardValue(card) {
        let cardValue = 0;
        switch (card.value) {
            case "A":
                cardValue = 14;
                break;
            case "K":
                cardValue = 13;
                break;
            case "Q":
                cardValue = 12;
                break;
            case "J":
                cardValue = 11;
                break;
            default:
                cardValue = parseInt(card.value);
        }
        return cardValue;
    }
    getHigherCard(card1, card2) {
        let card1Value = this.getCardValue(card1);
        let card2Value = this.getCardValue(card2);
        if (card1Value > card2Value) {
            return card1;
        }
        else {
            return card2;
        }
    }
    getLowerCard(card1, card2) {
        let card1Value = this.getCardValue(card1);
        let card2Value = this.getCardValue(card2);
        if (card1Value < card2Value) {
            return card1;
        }
        else {
            return card2;
        }
    }
    setHighestTrump(card) {
        if (card.suit === this.trump) {
            if (this.highestTrumpCard) {
                this.highestTrumpCard = this.getHigherCard(card, this.highestTrumpCard);
            }
            else {
                this.highestTrumpCard = card;
            }
        }
    }
    setLowestTrump(card) {
        if (card.suit === this.trump) {
            if (this.lowestTrumpCard) {
                this.lowestTrumpCard = this.getLowerCard(card, this.lowestTrumpCard);
            }
            else {
                this.lowestTrumpCard = card;
            }
        }
    }
    setNextDealer() {
    }
}
