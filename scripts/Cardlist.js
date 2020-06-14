class Cardlist {
    constructor(container, getInitialCards, card, openPopupMethod) {
        this._container = container;
        this._getInitialCards = getInitialCards;
        this._card = card;
        this._openPopupMethod = openPopupMethod;
    }

    addCard(data) {
        this._container.appendChild(this._card(data, this._openPopupMethod).create());
        this._container.querySelector('.place-card').setAttribute('data-id', `${data._id}`);
    }

    render() {
        this._getInitialCards
            .then(res => {
                console.log(res);
                res.forEach((item) => {
                    this.addCard(item);
                })
            })
            .catch(err => console.log(err));
    }
}