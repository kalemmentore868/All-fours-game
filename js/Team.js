export default class Team {
    constructor(players, totalScore, cardsInLift, teamName) {
        this.players = players;
        this.totalScore = totalScore;
        // this.currentLiftPoints = currentLiftPoints
        this.cardsInLift = cardsInLift;
        this.teamName = teamName;
    }
    countForGame() {
        let gamePoints = 0;
        this.cardsInLift.map(card => {
            gamePoints += this.getGamePointValue(card);
        });
        return gamePoints;
    }
    getGamePointValue(card) {
        let cardValue = 0;
        switch (card.value) {
            case "A":
                cardValue = 4;
                break;
            case "K":
                cardValue = 3;
                break;
            case "Q":
                cardValue = 2;
                break;
            case "J":
                cardValue = 1;
                break;
            case "10":
                cardValue = 10;
                break;
        }
        return cardValue;
    }
}
