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
    helpSetPosition(players, winnerPositionAtTable) {
        players.map(player => {
            const hasSecondPlay = winnerPositionAtTable + 1 === player.position.atTable;
            const secondPlayPart2 = winnerPositionAtTable + 1 > 3 && player.position.atTable === 0;
            const hasThirdPlay = winnerPositionAtTable + 2 === player.position.atTable;
            const hasThirdPlayPart2 = winnerPositionAtTable - 2 === -2;
            const hasLastPlay = winnerPositionAtTable - 1 < 0 && player.position.atTable === 3;
            switch (true) {
                case hasSecondPlay:
                    player.position.thisRound = 1;
                    // console.log(`Player Name: ${player}`)
                    break;
                case secondPlayPart2:
                    player.position.thisRound = 1;
                    break;
                case hasThirdPlay:
                    player.position.thisRound = 2;
                    break;
                case hasThirdPlayPart2:
                    player.position.thisRound = 2;
                    break;
                case hasLastPlay:
                    player.position.thisRound = 3;
                    break;
                case winnerPositionAtTable - 1 === player.position.atTable:
                    player.position.thisRound = 3;
                    break;
                case winnerPositionAtTable + 3 === player.position.atTable:
                    player.position.thisRound = 3;
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
