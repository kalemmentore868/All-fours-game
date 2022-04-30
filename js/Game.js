export default class Game {
    constructor(lift, 
    // trump:string,
    teams, 
    // highestTrumpCard:string,
    // lowestTrumpCard:string
    round) {
        this.lift = lift;
        // this.trump = trump
        this.round = round;
        this.teams = teams;
        // this.highestTrumpCard = highestTrumpCard
        // this.lowestTrumpCard = lowestTrumpCard
    }
    //rule enforcement
    allowedPlays(player) {
        let currentSuit = this.lift.suit;
        const playerHasFirstPlay = player.position.thisRound === 0;
        const playerHasTrump = this.containsTrump(player.hand);
        const playerHasSecondPlay = player.position.thisRound === 1;
        const trumpCall = currentSuit === this.round.trump;
        const trumpInLift = this.containsTrump(this.lift.cardsInLift);
        const playerCanUnderTrump = !trumpCall && trumpInLift
            && this.containsTrump(player.hand);
        const playerHasCardsOfSuit = this.containsCardOfSuit(player.hand);
        if (playerHasFirstPlay) {
            return player.hand;
        }
        else if (trumpCall && playerHasTrump) {
            return this.getTrumpCards(player.hand);
        }
        else if (trumpCall && !playerHasTrump) {
            return player.hand;
        }
        else if (!playerHasCardsOfSuit && !trumpInLift) {
            return player.hand;
        }
        else if (!playerHasCardsOfSuit && !playerCanUnderTrump) {
            return player.hand;
        }
        else if (playerHasSecondPlay) {
            return [...this.getCardsOfSuit(player.hand), ...this.getTrumpCards(player.hand)];
        }
        else if (playerCanUnderTrump && !this.isDownToTrump(player.hand) && playerHasCardsOfSuit) {
            const trumpInLift = this.getTrumpCards(this.lift.cardsInLift);
            const playersTrump = this.getTrumpCards(player.hand);
            const highestTrumpInLift = this.getHighestCardOfSuit(trumpInLift);
            let higherTrumpCards = [];
            playersTrump.map(card => {
                if (this.getCardValue(card) > this.getCardValue(highestTrumpInLift))
                    higherTrumpCards.push(card);
            });
            return [...this.getCardsOfSuit(player.hand), ...higherTrumpCards];
        }
        else if (playerCanUnderTrump && !this.isDownToTrump(player.hand) && !playerHasCardsOfSuit) {
            let allCardsExceptSmallerTrump = [];
            const trumpInLift = this.getTrumpCards(this.lift.cardsInLift);
            const highestTrumpInLift = this.getHighestCardOfSuit(trumpInLift);
            player.hand.map(card => {
                if (card.suit === this.round.trump) {
                    if (this.getCardValue(card) > this.getCardValue(highestTrumpInLift))
                        allCardsExceptSmallerTrump.push(card);
                }
                else {
                    allCardsExceptSmallerTrump.push(card);
                }
            });
            return allCardsExceptSmallerTrump;
        }
        else {
            return [...this.getCardsOfSuit(player.hand), ...this.getTrumpCards(player.hand)];
        }
    }
    //Use when list of cards are already of same suit
    getHighestCardOfSuit(cards) {
        let highestCard = cards[0];
        let highestCardValue = 0;
        cards.map(card => {
            // if(this.getCardValue(card) === 14) return card
            let cardValue = this.getCardValue(card);
            if (cardValue > highestCardValue) {
                highestCard = card;
                highestCardValue = cardValue;
            }
        });
        return highestCard;
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
    isDownToTrump(playerHand) {
        for (let card of playerHand) {
            if (card.suit !== this.round.trump)
                return false;
        }
        return true;
    }
    containsTrump(playerHand) {
        for (let card of playerHand) {
            if (card.suit === this.round.trump)
                return true;
        }
        return false;
    }
    getTrumpCards(playerHand) {
        return playerHand.filter(card => card.suit === this.round.trump);
    }
    containsCardOfSuit(playerHand) {
        for (let card of playerHand) {
            if (card.suit === this.lift.suit)
                return true;
        }
        return false;
    }
    getCardsOfSuit(playerHand) {
        let currentSuit = this.lift.suit;
        return playerHand.filter(card => card.suit === currentSuit);
    }
    whoOwnsThisCard(card) {
        let owner = null;
        for (let team of this.teams) {
            for (let player of team.players) {
                if (card.playedBy === player.name) {
                    owner = player;
                }
            }
        }
        return owner;
    }
    belongsToWhichTeam(player) {
        let playerTeam = null;
        this.teams.map(team => {
            if (player.belongsTo === team.teamName) {
                playerTeam = team;
            }
        });
        return playerTeam;
    }
    getLiftWinner() {
        if (this.containsTrump(this.lift.cardsInLift)) {
            let trumpInLift = this.getTrumpCards(this.lift.cardsInLift);
            let highestCard = this.getHighestCardOfSuit(trumpInLift);
            return this.whoOwnsThisCard(highestCard);
        }
        else {
            let cardsOfSuit = this.getCardsOfSuit(this.lift.cardsInLift);
            let highestCard = this.getHighestCardOfSuit(cardsOfSuit);
            return this.whoOwnsThisCard(highestCard);
        }
    }
    addPointForHigh() {
        if (this.round.highestTrumpCard) {
            let owner = this.whoOwnsThisCard(this.round.highestTrumpCard);
            if (owner) {
                let team = this.belongsToWhichTeam(owner);
                if (team) {
                    team.totalScore++;
                }
                else {
                    console.log("error in game 217");
                }
            }
            else {
                console.log("error in game 217");
            }
        }
    }
    addPointForLow() {
        if (this.round.lowestTrumpCard) {
            let owner = this.whoOwnsThisCard(this.round.lowestTrumpCard);
            if (owner) {
                let team = this.belongsToWhichTeam(owner);
                if (team) {
                    team.totalScore++;
                }
                else {
                    console.log("error in game 234");
                }
            }
            else {
                console.log("error in game 234");
            }
        }
    }
    addPointForGame() {
        let team1 = this.teams[0];
        let team2 = this.teams[1];
        let team1GamePoints = team1.countForGame();
        let team2GamePoints = team2.countForGame();
        if (team1GamePoints > team2GamePoints) {
            team1.totalScore++;
        }
        else if (team1GamePoints < team2GamePoints) {
            team2.totalScore++;
        }
        else if (team1GamePoints === team2GamePoints) {
            const team1Dealt = team1 === this.belongsToWhichTeam(this.round.whoDealt);
            if (team1Dealt) {
                team2.totalScore++;
            }
            else {
                team1.totalScore++;
            }
        }
    }
    endOfRound() {
        this.addPointForHigh();
        this.addPointForLow();
        this.addPointForGame();
    }
}
