export default class Lift {
    constructor(firstCard, firstPlayer, currentPlayerTurn, playerOnTop, cardsInLift, suit, turnNumber) {
        this.firstCard = firstCard;
        this.firstPlayer = firstPlayer;
        this.currentPlayerTurn = currentPlayerTurn;
        this.playerOnTop = playerOnTop;
        this.cardsInLift = cardsInLift;
        this.suit = suit;
        this.turnNumber = turnNumber;
    }
    getNewCurrentPlayer(players) {
        let currentPlayerTurn = players.find(player => {
            return player.position.thisRound === this.turnNumber;
        });
        if (currentPlayerTurn) {
            return currentPlayerTurn;
        }
        else {
            return players[1];
        }
    }
}
