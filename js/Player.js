export default class Player {
    constructor(hand, position, name, belongsTo) {
        this.hand = hand;
        this.position = position;
        this.name = name;
        this.belongsTo = belongsTo;
    }
    findCard(id) {
        const cardId = parseInt(id);
        let foundCard = this.hand.find(card => card.cardId === cardId);
        if (foundCard) {
            return foundCard;
        }
        else {
            return null;
        }
    }
    removeCard(id) {
        this.hand = this.hand.filter(card => card.cardId !== id);
    }
}
