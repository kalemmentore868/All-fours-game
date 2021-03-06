import Deck from "./Deck.js";
import Player from "./Player.js";
import Team from "./Team.js";
import Lift from "./Lift.js";
import Game from "./Game.js";
import Round from "./Round.js";
//HTML Elements
let liftContainer = document.querySelector("#displayLift");
let pack = document.querySelector(".deck");
let hands = document.querySelectorAll(".hand");
let beggerModal = document.querySelector("#nextToDeal");
let begBtn = document.querySelector("#beg");
let playGameBtn = document.querySelector("#play");
let dealerModal = document.querySelector("#dealer");
let takeOneBtn = document.querySelector("#take-one");
let goBackBtn = document.querySelector("#go-back");
let winnerModal = document.querySelector("#show-winner");
let teamDivs = document.querySelectorAll(".teams");
//variables
let deck = new Deck();
let playersChosenCardId = "";
let game;
let lift;
let round;
let kickedCardElement;
let team1;
let team2;
let teams;
const players = [];
let kickedCard;
//functions
function displayPlayableCards(player) {
    const legalMoves = game.allowedPlays(player);
    legalMoves.map((card) => {
        const cardElement = document.getElementById(`${card.cardId}`);
        if (cardElement) {
            cardElement.classList.add("playable");
        }
        else {
            console.log(legalMoves);
        }
    });
}
function shareHands(numberOfCards) {
    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        let currentPlayer = players[i];
        let cardsGiven = 0;
        while (cardsGiven < numberOfCards) {
            const playerCard = deck.dealCard();
            if (playerCard) {
                playerCard.playedBy = currentPlayer.name;
                currentPlayer.hand.push(playerCard);
                hand.appendChild(playerCard.getHTML());
                cardsGiven++;
            }
        }
    }
}
function kickCard() {
    let kick = deck.dealCard();
    if (kick) {
        kickedCard = kick;
    }
    else {
        console.log("no card kicked");
    }
    if (kickedCard && pack) {
        kickedCardElement = kickedCard.getHTML();
        pack.appendChild(kickedCardElement);
    }
}
function resetDeck() {
    deck.cards = [
        ...deck.cards,
        ...team1.cardsInLift,
        ...team2.cardsInLift,
        kickedCard,
    ];
    team1.cardsInLift = [];
    team2.cardsInLift = [];
    liftContainer.innerHTML = "";
    deck.shuffle();
}
function newRound() {
    var _a;
    resetDeck();
    if (kickedCardElement)
        (_a = kickedCardElement.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(kickedCardElement);
    shareHands(6);
    kickCard();
    round.setUpNextRound(kickedCard.suit);
    lift.newRound(round.nextDealer);
    lift.setRoundForLiftWinner(lift.currentPlayerTurn, players);
    game.addPointsForKickedCard(kickedCard);
    displayBegModal(round.nextDealer);
    updateScore();
}
function displayNames() {
    for (let i = 0; i < 2; i++) {
        let miniCardsContainer = document.createElement("div");
        miniCardsContainer.classList.add("mini-card-box");
        let teamDiv = teamDivs[i];
        let team1Title = game.getElement("h1", teams[i].teamName);
        teamDiv.append(team1Title);
        let playersList = document.createElement("div");
        playersList.classList.add("show-names");
        teams[i].players.map((player) => {
            let playerNameItem = game.getElement("div", player.name);
            playersList.append(playerNameItem);
        });
        teamDiv.append(playersList);
        teamDiv.append(miniCardsContainer);
        let teamScore = game.getElement("h2", `Total Points: ${teams[i].totalScore}`);
        teamScore.id = teams[i].teamName;
        teamDiv.append(teamScore);
    }
}
function updateScore() {
    teams.map((team) => {
        let teamScore = document.getElementById(team.teamName);
        if (teamScore)
            teamScore.innerText = `Total Score: ${team.totalScore}`;
    });
}
function displayBegModal(player) {
    let headingElement = beggerModal.querySelector("h2");
    headingElement.innerText = `Would you like to beg ${player.name}?`;
    if (player === round.nextDealer) {
        beggerModal.style.display = "block";
    }
}
function displayDealerModal(player) {
    let headingElement = dealerModal.querySelector("h2");
    headingElement.innerText = `Would you like to go back to pack ${player.name}?`;
    if (player === round.whoDealt) {
        dealerModal.style.display = "block";
    }
}
function displayLifts(winningTeam) {
    let miniCardsbox = document.createElement("div"); //div holding 4 cards
    miniCardsbox.classList.add("mini-card-container");
    if (teams[0] === winningTeam) {
        let container = teamDivs[0].lastChild;
        lift.cardsInLift.map((card) => {
            miniCardsbox.append(card.makeSmallCard());
        });
        container === null || container === void 0 ? void 0 : container.append(miniCardsbox);
    }
    else {
        let container = teamDivs[1].lastChild;
        lift.cardsInLift.map((card) => {
            miniCardsbox.append(card.makeSmallCard());
        });
        container === null || container === void 0 ? void 0 : container.append(miniCardsbox);
    }
}
function startGame() {
    kickCard();
    let player1 = players[0];
    let player4 = players[3];
    let player1sFirstCard = players[0].hand[0];
    round = new Round(kickedCard.suit, null, null, players, player4, 3, players[0], false);
    lift = new Lift(player1, [], "", 0);
    game = new Game(lift, teams, round);
    game.addPointsForKickedCard(kickedCard);
    displayBegModal(round.nextDealer);
    displayPlayableCards(lift.currentPlayerTurn);
    displayNames();
}
function setUpTeams() {
    let position;
    for (let i = 0; i < 4; i++) {
        position = {
            atTable: i,
            thisRound: i,
        };
        let player;
        if (i === 0) {
            player = new Player([], position, "Lem", "");
        }
        else if (i === 1) {
            player = new Player([], position, "Nathan", "");
        }
        else {
            player = new Player([], position, `player${i}`, "");
        }
        players.push(player);
    }
    team1 = new Team([players[0], players[2]], 0, [], "team1");
    players[0].belongsTo = team1.teamName;
    players[2].belongsTo = team1.teamName;
    team2 = new Team([players[1], players[3]], 0, [], "team2");
    players[1].belongsTo = team2.teamName;
    players[3].belongsTo = team2.teamName;
    teams = [team1, team2];
}
function handleCardClickedStyles(cardClicked, hand) {
    if (cardClicked && cardClicked.classList.contains("playable")) {
        let allCards = hand.children;
        for (let card of allCards) {
            card.classList.remove("playable");
        }
        cardClicked.classList.add("on-deck");
        liftContainer.append(cardClicked);
        playersChosenCardId = cardClicked.id;
    }
}
function updateLift(foundCard) {
    function moveCardFromHandToLift() {
        lift.cardsInLift.push(foundCard);
        lift.currentPlayerTurn.removeCard(foundCard.cardId);
    }
    function startNextRound() {
        var _a;
        game.endOfRound();
        if (game.winnerFound) {
            winnerModal.style.display = "block";
            let headingElement = winnerModal.querySelector("h2");
            headingElement.innerText = `Winning Team: ${(_a = game.winningTeam) === null || _a === void 0 ? void 0 : _a.teamName}`;
        }
        newRound();
    }
    function goOnToNextPlayerInLift() {
        lift.turnNumber++;
        if (lift.turnNumber > 3) {
            lift.turnNumber = 0;
        }
        let nextPlayer = lift.getNewCurrentPlayer(players);
        if (nextPlayer) {
            lift.currentPlayerTurn = nextPlayer;
        }
        else {
            console.log("Player not found for new current Player");
        }
    }
    const hasFirstPlay = lift.turnNumber === 0;
    if (hasFirstPlay) {
        lift.suit = foundCard.suit;
    }
    moveCardFromHandToLift();
    const finalCardPlayed = lift.currentPlayerTurn.position.thisRound === 3 &&
        lift.currentPlayerTurn.hand.length === 0;
    if (finalCardPlayed) {
        startNextRound();
    }
    else {
        goOnToNextPlayerInLift();
    }
}
function resetLift() {
    function putCardsInWinningTeamLift(winningTeam) {
        displayLifts(winningTeam);
        winningTeam.cardsInLift = [...winningTeam.cardsInLift, ...lift.cardsInLift];
    }
    function setUpNextLift(liftWinner) {
        lift.currentPlayerTurn = liftWinner;
        lift.setRoundForLiftWinner(liftWinner, players);
        lift.cardsInLift = [];
        liftContainer.innerHTML = "";
        lift.turnNumber = 0;
    }
    const liftWinner = game.getLiftWinner();
    if (liftWinner) {
        let winningTeam = game.belongsToWhichTeam(liftWinner);
        if (winningTeam) {
            putCardsInWinningTeamLift(winningTeam);
        }
        else {
            console.log("Team not found");
        }
        setUpNextLift(liftWinner);
    }
    else {
        console.log("Winner not found");
    }
}
//event listeners
for (let hand of hands) {
    hand.addEventListener("click", (e) => {
        let cardClicked = e.target;
        handleCardClickedStyles(cardClicked, hand);
        const foundCard = lift.currentPlayerTurn.findCard(playersChosenCardId);
        if (foundCard) {
            const trumpPlay = foundCard.suit === round.trump;
            if (trumpPlay) {
                round.setHighestTrump(foundCard);
                round.setLowestTrump(foundCard);
                round.didJackPass(foundCard);
                console.log(round.jackInGame);
            }
            updateLift(foundCard);
            if (lift.cardsInLift.length >= 4) {
                resetLift();
            }
            displayPlayableCards(lift.currentPlayerTurn);
        }
        else {
            console.log("Card not Found line 165");
        }
    });
}
playGameBtn.addEventListener("click", () => {
    beggerModal.style.display = "none";
});
begBtn.addEventListener("click", () => {
    beggerModal.style.display = "none";
    displayDealerModal(round.whoDealt);
});
takeOneBtn.addEventListener("click", () => {
    game.addPointToOtherTeam(round.whoDealt, 1);
    dealerModal.style.display = "none";
    updateScore();
});
goBackBtn.addEventListener("click", () => {
    function backToPack() {
        var _a;
        shareHands(3);
        if (kickedCardElement)
            (_a = kickedCardElement.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(kickedCardElement);
        kickCard();
        game.addPointsForKickedCard(kickedCard);
    }
    function ensureTrumpChanged() {
        var _a;
        let cardsInDeck = deck.cards.length;
        if (round.trump === kickedCard.suit && cardsInDeck > 4) {
            backToPack();
            ensureTrumpChanged();
        }
        else if (round.trump === kickedCard.suit && cardsInDeck <= 4) {
            if (kickedCardElement)
                (_a = kickedCardElement.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(kickedCardElement);
            kickCard();
            ensureTrumpChanged();
        }
        else {
            round.trump = kickedCard.suit;
        }
    }
    dealerModal.style.display = "none";
    backToPack();
    ensureTrumpChanged();
    displayPlayableCards(round.nextDealer);
});
//script
setUpTeams(); //72
deck.shuffle();
shareHands(6); //37
startGame(); //56
