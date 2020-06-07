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
        this._startCards.then(res => {
            res.forEach((card) => {
                this.addCard(card.name, card.link);
            });
        });
    }
}