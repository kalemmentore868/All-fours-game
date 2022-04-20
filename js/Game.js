export default class Game {
    constructor(lift, whoDealtThisGame, trump, teams, highestTrumpCard, lowestTrumpCard) {
        this.lift = lift;
        this.whoDealtThisGame = whoDealtThisGame;
        this.trump = trump;
        this.teams = teams;
        this.highestTrumpCard = highestTrumpCard;
        this.lowestTrumpCard = lowestTrumpCard;
    }
    allowedPlays(player) {
        let currentSuit = this.lift.suit;
        if (player.position.thisRound === 1) {
            return player.hand;
        }
        else if (currentSuit === this.trump && this.containsTrump(player.hand)) {
            return this.getTrumpCards(player.hand);
        }
        else {
            return this.getCardsOfSuit(player.hand);
        }
    }
    containsTrump(playerHand) {
        for (let card of playerHand) {
            if (card.suit === this.trump)
                return true;
        }
        return false;
    }
    getTrumpCards(playerHand) {
        return playerHand.filter(card => card.suit === this.trump);
    }
    getCardsOfSuit(playerHand) {
        let currentSuit = this.lift.suit;
        return playerHand.filter(card => card.suit === currentSuit);
    }
}
