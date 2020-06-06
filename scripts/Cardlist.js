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
            /* Можно лучше:

            Избавиться от дублирования кода, и вместо того, чтобы переписывать реализацию метода addCard повторяя один и тот же 
            код два раза, можно напрямую вызвать метод addCard в методе render и передать card.name и card.link в качестве параметров

            Например:
            this.addCard(card.name, card.link)
            */
            this._container.appendChild(this._createCard(card.name, card.link, this._openPopupMethod).create());
        });
    }
}