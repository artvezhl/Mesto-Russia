class Card {
    static _template = document.querySelector('#card-template').content;

    constructor(data, deleteCardApi, popupOpenHandler) {
        this._data = data;
        this._deleteCardApi = deleteCardApi;
        this._popupOpenHandler = popupOpenHandler;
    }

    create() {
        this._card = Card._template.cloneNode(true).children[0];
        this._card.querySelector('.place-card__name').textContent = this._data.name;
        // TODO сделать чтобы работало добавление карточки и не выдавало ошибку из-за количества лайков
        //  (наверное нужно создать новый метод для новых карточек)
        const cardLikes = this._card.querySelector('.place-card__like-number');
        if (this._data.likes) {
            cardLikes.textContent = this._data.likes.length;
        }
        else {
            cardLikes.textContent = 0;
        }
        const deleteButton = this._card.querySelector('.place-card__delete-icon');
        if (this._data.owner && this._data.owner._id === "bed1ef91b1eb9c081562b68f") {
            deleteButton.setAttribute('style', 'display: block');
        }
        this._card.setAttribute('data-id', `${this._data._id}`);
        this._cardImage = this._card.querySelector('.place-card__image');
        this._cardImage.style.backgroundImage = `url(${this._data.link})`;
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
        // console.log(this._deleteCardApi);
        // console.log(currentCard.getAttribute('data-id'));
        this._deleteCardApi(currentCard.getAttribute('data-id'))
            .then(() => {
                this._removeListeners();
                placesList.removeChild(currentCard);
            })
    }
}