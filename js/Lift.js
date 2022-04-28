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
        console.log("current player", currentPlayerTurn);
        if (currentPlayerTurn) {
            return currentPlayerTurn;
        }
        else {
            console.log(this.turnNumber);
            return null;
        }
    }
    helpSetPosition(players, winnerPositionAtTable) {
        players.map(player => {
            switch (winnerPositionAtTable) {
                case 0:
                    switch (player.position.atTable) {
                        case 1:
                            player.position.thisRound = 1;
                            break;
                        case 2:
                            player.position.thisRound = 2;
                            break;
                        case 3:
                            player.position.thisRound = 3;
                            break;
                    }
                    break;
                case 1:
                    switch (player.position.atTable) {
                        case 0:
                            player.position.thisRound = 3;
                            break;
                        case 2:
                            player.position.thisRound = 1;
                            break;
                        case 3:
                            player.position.thisRound = 2;
                            break;
                    }
                    break;
                case 2:
                    switch (player.position.atTable) {
                        case 0:
                            player.position.thisRound = 2;
                            break;
                        case 1:
                            player.position.thisRound = 3;
                            break;
                        case 3:
                            player.position.thisRound = 1;
                            break;
                    }
                    break;
                case 3:
                    switch (player.position.atTable) {
                        case 0:
                            player.position.thisRound = 1;
                            break;
                        case 1:
                            player.position.thisRound = 2;
                            break;
                        case 2:
                            player.position.thisRound = 3;
                            break;
                    }
                    break;
            }
        });
    }
    setRoundForLiftWinner(liftWinner, players) {
        liftWinner.position.thisRound = 0;
        switch (liftWinner.position.atTable) {
            case 0:
                this.helpSetPosition(players, 0);
                break;
            case 1:
                this.helpSetPosition(players, 1);
                break;
            case 2:
                this.helpSetPosition(players, 2);
                break;
            case 3:
                this.helpSetPosition(players, 3);
                break;
        }
    }
}
