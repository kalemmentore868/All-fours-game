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
function displayPlayableCards(player) {
    const legalMoves = game.allowedPlays(player);
    legalMoves.map(card => {
        const cardElement = document.getElementById(`${card.cardId}`);
        if (cardElement) {
            cardElement.classList.add("playable");
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
    hand.addEventListener("click", (e) => {
        let cardClicked = e.target;
        handleCardClickedStyles(cardClicked);
        const foundCard = lift.currentPlayerTurn.findCard(playersChosenCardId);
        console.log("Found Card", foundCard);
        if (foundCard) {
            if (lift.turnNumber === 0) {
                lift.suit = foundCard.suit;
            }
            lift.cardsInLift.push(foundCard);
            lift.currentPlayerTurn.chosenCard = foundCard;
            lift.currentPlayerTurn.removeCard(foundCard.cardId);
            lift.turnNumber++;
            lift.currentPlayerTurn = lift.getNewCurrentPlayer(players);
            console.log(lift.currentPlayerTurn);
            console.log(lift.suit);
            displayPlayableCards(lift.currentPlayerTurn);
        }
    });
}
let position;
const players = [];
const team1 = new Team([players[0], players[3]], 0, 0, [], "team1");
const team2 = new Team([players[1], players[4]], 0, 0, [], "team2");
const teams = [team1, team2];
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
    pack.appendChild(kickedCard.getHTML());
    let player1 = players[0];
    let player1sFirstCard = players[0].hand[0];
    lift = new Lift(player1sFirstCard, player1, player1, player1, [], "", 0);
    game = new Game(lift, players[0], kickedCard.suit, teams, players[0].hand[0].suit, players[0].hand[0].suit);
    displayPlayableCards(lift.currentPlayerTurn);
}
//  let player2 = players[1]
//  let player2sFirstCard = players[1].hand[0]
//  let player3 = players[2]
//  let player3sFirstCard = players[2].hand[0]
//  console.log("Player1's cards he can play", game.allowedPlays(players[0]))
// lift.suit = player1sFirstCard.suit
// console.log(`Suit = ${lift.suit}, trump = ${game.trump}`)
// lift.cardsInLift.push(player1sFirstCard)
// let player2Moves = game.allowedPlays(player2)
// console.log("Player2's cards he can play", player2Moves)
// console.log(`Suit = ${lift.suit}, trump = ${game.trump}`)
// lift.cardsInLift.push(player2Moves[player2Moves.length - 1])
// let player3Moves = game.allowedPlays(player3)
// console.log("Player3's cards he can play", player3Moves)
// console.log(`Suit = ${lift.suit}, trump = ${game.trump}`)
// lift.cardsInLift.push(player3Moves[player3Moves.length - 1])
// let player4Moves = game.allowedPlays(players[3])
// console.log("Player4's cards he can play", player4Moves)
// lift.cardsInLift.push(player4Moves[player4Moves.length -1])
// console.log(lift.cardsInLift)
