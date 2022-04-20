import Deck from "./Deck.js";
import Player from "./Player.js";
import Team from "./Team.js";
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
let kickedCard = deck.dealCard();
if (kickedCard && pack) {
    pack.appendChild(kickedCard.getHTML());
}
