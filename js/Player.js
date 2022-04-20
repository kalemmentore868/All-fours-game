export default class Player {
    constructor(hand, position, name, isNextToDeal, isToDeal) {
        this.hand = hand;
        this.position = position;
        this.name = name;
        this.isNextToDeal = isNextToDeal;
        this.isToDeal = isToDeal;
        this.chosenCard;
    }
}
