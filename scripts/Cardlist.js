class Cardlist {
    constructor(container, startCards, createCard, openPopupMethod, api) {
        this._container = container;
        this._startCards = startCards;
        this._createCard = createCard;
        this._openPopupMethod = openPopupMethod;
        this._api = api;
    }

    addCard(name, link) {
        this._container.appendChild(this._createCard(name, link, this._openPopupMethod).create());
        this._api.addNewCard(name, link);
    }

    render() {
        this._startCards.then(res => {
            res.forEach((card) => {
                this.addCard(card.name, card.link);
            });
        });
    }
}