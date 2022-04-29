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
//variables
const deck = new Deck();
let playersChosenCardId = "";
let game;
let lift;
let round;
let kickedCardElement;
let team1;
let team2;
let teams;
const players = [];
//functions
function displayPlayableCards(player) {
    const legalMoves = game.allowedPlays(player);
    legalMoves.map(card => {
        const cardElement = document.getElementById(`${card.cardId}`);
        if (cardElement) {
            cardElement.classList.add("playable");
        }
        else {
            console.log(legalMoves);
        }
    });
}
function shareHands() {
    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        let currentPlayer = players[i];
        let cardsGiven = 0;
        while (cardsGiven < 6) {
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
;
function startGame() {
    let kickedCard = deck.dealCard();
    if (kickedCard && pack) {
        kickedCardElement = kickedCard.getHTML();
        pack.appendChild(kickedCardElement);
        let player1 = players[0];
        let player1sFirstCard = players[0].hand[0];
        round = new Round(kickedCard.suit, null, null, players, player1);
        lift = new Lift(player1, [], "", 0);
        game = new Game(lift, teams, round);
        displayPlayableCards(lift.currentPlayerTurn);
    }
}
function setUpTeams() {
    let position;
    for (let i = 0; i < 4; i++) {
        position = {
            atTable: i,
            thisRound: i
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
//event listeners
for (let hand of hands) {
    function handleCardClickedStyles(cardClicked) {
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
        if (lift.turnNumber === 0) {
            lift.suit = foundCard.suit;
        }
        lift.cardsInLift.push(foundCard);
        lift.currentPlayerTurn.removeCard(foundCard.cardId);
        const finalCardPlayed = lift.currentPlayerTurn.position.thisRound === 3 && lift.currentPlayerTurn.hand.length === 0;
        if (finalCardPlayed) {
        }
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
    function resetLift() {
        const liftWinner = game.getLiftWinner();
        if (liftWinner) {
            let winningTeam = game.belongsToWhichTeam(liftWinner);
            if (winningTeam) {
                winningTeam.cardsInLift = [...winningTeam.cardsInLift, ...lift.cardsInLift];
                // let teamLift = winningTeam.cardsInLift
                // teamLift.map(card => {
                //     console.log(`Card Value ${card.value} Game Point ${winningTeam?.getGamePointValue(card)}`)
                // })
            }
            else {
                console.log('Team not found');
            }
            lift.currentPlayerTurn = liftWinner;
            lift.setRoundForLiftWinner(liftWinner, players);
            lift.cardsInLift = [];
            liftContainer.innerHTML = "";
            lift.turnNumber = 0;
        }
        else {
            console.log("Winner not found");
        }
    }
    hand.addEventListener("click", (e) => {
        let cardClicked = e.target;
        handleCardClickedStyles(cardClicked);
        const foundCard = lift.currentPlayerTurn.findCard(playersChosenCardId);
        if (foundCard) {
            if (foundCard.suit === round.trump) {
                round.setHighestTrump(foundCard);
                round.setLowestTrump(foundCard);
            }
            updateLift(foundCard);
            console.log("turn number", lift.turnNumber);
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
setUpTeams(); //72
deck.shuffle();
shareHands(); //37
startGame(); //56
