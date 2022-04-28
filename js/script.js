import Deck from "./Deck.js";
import Player from "./Player.js";
import Team from "./Team.js";
import Lift from "./Lift.js";
import Game from "./Game.js";
let liftContainer = document.querySelector("#displayLift");
let pack = document.querySelector(".deck");
let hands = document.querySelectorAll(".hand");
const deck = new Deck();
deck.shuffle();
let playersChosenCardId = "";
let game;
let lift;
let kickedCardElement;
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
        lift.currentPlayerTurn.chosenCard = foundCard;
        lift.currentPlayerTurn.removeCard(foundCard.cardId);
        lift.turnNumber++;
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
            updateLift(foundCard);
            console.log("turn number", lift.turnNumber);
            if (lift.cardsInLift.length >= 4) {
                resetLift();
            }
            displayPlayableCards(lift.currentPlayerTurn);
        }
        else {
            console.log("Card not Found");
        }
    });
}
let position;
const players = [];
for (let i = 0; i < 4; i++) {
    position = {
        atTable: i,
        thisRound: i
    };
    let player;
    if (i === 0) {
        player = new Player([], position, "Lem", false, true);
    }
    else if (i === 1) {
        player = new Player([], position, "Nathan", true, false);
    }
    else {
        player = new Player([], position, `player${i}`, false, false);
    }
    players.push(player);
}
const team1 = new Team([players[0], players[2]], 0, 0, [], "team1");
const team2 = new Team([players[1], players[3]], 0, 0, [], "team2");
const teams = [team1, team2];
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
shareHands();
let kickedCard = deck.dealCard();
if (kickedCard && pack) {
    kickedCardElement = kickedCard.getHTML();
    pack.appendChild(kickedCardElement);
    let player1 = players[0];
    let player1sFirstCard = players[0].hand[0];
    lift = new Lift(player1sFirstCard, player1, player1, player1, [], "", 0);
    game = new Game(lift, players[0], kickedCard.suit, teams, players[0].hand[0].suit, players[0].hand[0].suit);
    displayPlayableCards(lift.currentPlayerTurn);
}
