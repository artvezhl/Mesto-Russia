class Cardlist {
    constructor(container, card, openPopupMethod, api) {
        this._container = container;
        this._card = card;
        this._openPopupMethod = openPopupMethod;
        this.api = api;
    }

    addCard(data) {
        this._container.appendChild(this._card(data, this._openPopupMethod, this.api).create());
        this._container.querySelector('.place-card').setAttribute('data-id', `${data._id}`);
    }

    addNewCard(data) {
        console.log(data);
        this._container.appendChild(this._card(data, this._openPopupMethod, this.api).createNewCard());
        this._container.querySelector('.place-card').setAttribute('data-id', `${data._id}`);
    }

    render(initialCards) {
        initialCards.forEach((item) => {
            this.addCard(item);
        })
    }
}