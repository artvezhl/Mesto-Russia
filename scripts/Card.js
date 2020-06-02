class Card {
    static _template = document.querySelector('#card-template').content;

    constructor(name, link, popupOpenHandler) {
        this._name = name;
        this._link = link;
        this._popupOpenHandler = popupOpenHandler;
    }
    // TODO разобраться почему при нажатии на корзину открывается попап
    create() {
        this._card = Card._template.cloneNode(true).children[0];
        this._card.querySelector('.place-card__name').textContent = this._name;
        this._card.querySelector('.place-card__image').style.backgroundImage = `url(${this._link})`;
        this._card.querySelector('.place-card__like-icon').addEventListener('click', this._like);
        this._card.querySelector('.place-card__delete-icon').addEventListener('click', this._remove);
        this._card.querySelector('.place-card__image').addEventListener('click', this._popupOpenHandler);
        return this._card;
    }

    _like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    _remove(event) {
        const placesList = event.target.closest('.places-list');
        const currentCard = event.target.closest('div.place-card');
        currentCard.querySelector('.place-card__like-icon').removeEventListener('click', this._like);
        currentCard.querySelector('.place-card__delete-icon').removeEventListener('click', this._remove);
        currentCard.querySelector('.place-card__image').removeEventListener('click', this._popupOpenHandler);
        placesList.removeChild(currentCard);
    }
}