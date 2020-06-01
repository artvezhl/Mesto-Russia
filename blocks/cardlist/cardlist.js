class Cardlist {
    constructor(container, startCards, openImagePopupMethod) {
        this.container = container;
        this.cards = startCards;
        this.openPopupMethod = openImagePopupMethod;
    }

    // TODO переделать, так как класс не может принимать класс
    render() {
        for (let i = 0; i < this.cards.length; i++) {
            const card = new Card(this.cards[i].name, this.cards[i].link);
            this.container.appendChild(card.createCard());
            card.setListeners(this.openPopupMethod);
        }
    }

    addCard(cardElement) {
        this.cards.push(cardElement);
        this.container.appendChild(cardElement);
    }
}