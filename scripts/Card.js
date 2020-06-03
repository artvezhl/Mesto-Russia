class Card {
    static _template = document.querySelector('#card-template').content;

    constructor(name, link, popupOpenHandler) {
        this._name = name;
        this._link = link;
        this._popupOpenHandler = popupOpenHandler;
    }
    create() {
        this._card = Card._template.cloneNode(true).children[0];
        this._card.querySelector('.place-card__name').textContent = this._name;
        this._card.querySelector('.place-card__image').style.backgroundImage = `url(${this._link})`;
        this._card.addEventListener('click', this._cardClickHandler);
        return this._card;
    }

    _cardClickHandler = (event) => {
        if (event.target.classList.contains('place-card__like-icon')) {
            this._like(event);
        }
        if (event.target.classList.contains('place-card__delete-icon')) {
            this._remove(event);
        }
        if (event.target.classList.contains('place-card__image')) {
            this._popupOpenHandler(event);
          }
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