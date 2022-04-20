export default class Lift {
    constructor(firstCard, firstPlayer, currentPlayerTurn, playerOnTop, cardsInLift, suit) {
        this.firstCard = firstCard;
        this.firstPlayer = firstPlayer;
        this.currentPlayerTurn = currentPlayerTurn;
        this.playerOnTop = playerOnTop;
        this.cardsInLift = cardsInLift;
        this.suit = suit;
    }
}
