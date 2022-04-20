export default class Team {
    constructor(players, totalScore, currentLiftPoints, cardsInLift, teamName) {
        this.players = players;
        this.totalScore = totalScore;
        this.currentLiftPoints = currentLiftPoints;
        this.cardsInLift = cardsInLift;
        this.teamName = teamName;
    }
}
