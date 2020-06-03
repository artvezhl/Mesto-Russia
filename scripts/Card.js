class Card {
    static _template = document.querySelector('#card-template').content;

    constructor(name, link, popupOpenHandler) {
        this._name = name;
        this._link = link;
        this._popupOpenHandler = popupOpenHandler;
    }

    // TODO убрать делегирование и повесить обработчики событий на те элементы, которые нужно слушать
    // TODO установить удаление обработчиков попапам
    create() {
        this._card = Card._template.cloneNode(true).children[0];
        this._card.querySelector('.place-card__name').textContent = this._name;
        this._cardImage = this._card.querySelector('.place-card__image');
        this._cardImage.style.backgroundImage = `url(${this._link})`;
        this._setListeners();
        return this._card;
    }

    _setListeners = () => {
        this._card.querySelector('.place-card__like-icon').addEventListener('click', this._like);
        this._card.querySelector('.place-card__delete-icon').addEventListener('click', this._remove);
        this._card.querySelector('.place-card__image').addEventListener('click', this._popupOpenHandler);
    }

    _like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    _removeListeners = () => {
        this._card.querySelector('.place-card__like-icon').removeEventListener('click', this._like);
        this._card.querySelector('.place-card__delete-icon').removeEventListener('click', this._remove);
        this._card.querySelector('.place-card__image').removeEventListener('click', this._popupOpenHandler);
    }

    _remove = (event) => {
        const placesList = event.target.closest('.places-list');
        const currentCard = event.target.closest('div.place-card');
        this._removeListeners();
        placesList.removeChild(currentCard);
    }
}