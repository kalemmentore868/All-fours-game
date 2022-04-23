import Deck from "./Deck.js";
import Player from "./Player.js";
import Team from "./Team.js";
import Lift from "./Lift.js";
import Game from "./Game.js";
const deck = new Deck();
deck.shuffle();
let pack = document.querySelector(".deck");
let hands = document.querySelectorAll(".hand");
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
const shareHands = () => {
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
};
const team1 = new Team([players[0], players[3]], 0, 0, [], "team1");
const team2 = new Team([players[1], players[4]], 0, 0, [], "team2");
const teams = [team1, team2];
shareHands();
let game;
let kickedCard = deck.dealCard();
if (kickedCard && pack) {
    pack.appendChild(kickedCard.getHTML());
    let player1 = players[0];
    let player1sFirstCard = players[0].hand[0];
    let player2 = players[1];
    let player2sFirstCard = players[1].hand[0];
    let player3 = players[2];
    let player3sFirstCard = players[2].hand[0];
    let lift = new Lift(player1sFirstCard, player1, player1, player1, [], "");
    game = new Game(lift, players[0], kickedCard.suit, teams, players[0].hand[0].suit, players[0].hand[0].suit);
    const displayPlayableCards = (player) => {
        const legalMoves = game.allowedPlays(player);
        legalMoves.map(card => {
            const cardElement = document.getElementById(`${card.cardId}`);
            if (cardElement) {
                cardElement.classList.add("playable");
                cardElement.addEventListener("click", () => {
                });
            }
        });
        return legalMoves;
    };
    while (lift.cardsInLift.length >= 3) {
        const legalMoves = displayPlayableCards(lift.currentPlayerTurn);
    }
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
}
