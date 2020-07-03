class Cardlist {
    constructor(container, card, openPopupMethod) {
        this._container = container;
        this._card = card;
        this._openPopupMethod = openPopupMethod;
    }

    addCard(data) {
        this._container.appendChild(this._card(data, this._openPopupMethod).create());
        this._container.querySelector('.place-card').setAttribute('data-id', `${data._id}`);
    }

    render(initialCards) {
        initialCards.forEach((item) => {
            this.addCard(item);
        })
    }
}