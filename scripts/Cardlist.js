class Cardlist {
    constructor(container, startCards, createCard, openPopupMethod) {
        this._container = container;
        this._startCards = startCards;
        this._createCard = createCard;
        this._openPopupMethod = openPopupMethod;
    }

    addCard(name, link) {
        this._container.appendChild(this._createCard(name, link, this._openPopupMethod).create());
    }

    render() {
        this._startCards.forEach((card) => {
            this._container.appendChild(this._createCard(card.name, card.link, this._openPopupMethod).create());
        });
    }
}