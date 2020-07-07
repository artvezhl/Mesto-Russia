class Card {
    static _template = document.querySelector('#card-template').content;

    constructor(data, popupOpenHandler, api) {
        this._data = data;
        this._popupOpenHandler = popupOpenHandler;
        this._api = api;
    }

    // метод отрисовки карточек с сервера
    create() {
        this._card = Card._template.cloneNode(true).children[0];
        this._card.querySelector('.place-card__name').textContent = this._data.name;
        const likeIcon = this._card.querySelector('.place-card__like-icon');
        this._cardLikes = this._card.querySelector('.place-card__like-number');
        this._likes = this._data.likes;
        if (this._likes) {
            this._cardLikes.textContent = this._likes.length;
        }
        else {
            this._cardLikes.textContent = 0;
        }
        const deleteButton = this._card.querySelector('.place-card__delete-icon');
        // отрисовка активной кнопки удаления если карточка может быть удалена
        // console.log(this._data);
        if (this._data.owner && this._data.owner._id === "bed1ef91b1eb9c081562b68f") {
            deleteButton.setAttribute('style', 'display: block');
        }
        // отрисовка активных лайков на лайкнутые карточки
        if (this._likes.find(item => item._id === "bed1ef91b1eb9c081562b68f")) {
            likeIcon.classList.add('place-card__like-icon_liked');
        }
        this._card.setAttribute('data-id', `${this._data._id}`);
        this._cardImage = this._card.querySelector('.place-card__image');
        this._cardImage.style.backgroundImage = `url(${this._data.link})`;
        this._setListeners();
        return this._card;
    }

    // метод отрисовки добавленной карточки
    createNewCard() {
        this._card = Card._template.cloneNode(true).children[0];
        this._card.querySelector('.place-card__name').textContent = this._data.name;
        this._cardLikes = this._card.querySelector('.place-card__like-number');
        this._cardLikes.textContent = 0;
        this._card.querySelector('.place-card__delete-icon').setAttribute('style', 'display: block');
        this._card.setAttribute('data-id', `${this._data._id}`);
        this._cardImage = this._card.querySelector('.place-card__image');
        this._cardImage.style.backgroundImage = `url(${this._data.link})`;
        this._setListeners();
        return this._card;
    }

    _setListeners = () => {
        this._card.querySelector('.place-card__like-icon').addEventListener('click', this._cardLikeHandler);
        this._card.querySelector('.place-card__delete-icon').addEventListener('click', this._remove);
        this._card.querySelector('.place-card__image').addEventListener('click', this._popupOpenHandler);
    }

    _cardLikeHandler = (event) => {
        if (event.target.classList.contains('place-card__like-icon_liked'))
            this._removeLike(event)
        else
            this._like(event)
    }

    // TODO убрать глюк с лайком первой карточки
    _like = (event) => {
        const currentCard = event.target.closest('div.place-card');
        const cardId = currentCard.getAttribute('data-id');
        event.preventDefault();
        this._api.setLike(cardId)
            .then((obj) => {
                event.target.classList.toggle('place-card__like-icon_liked');
                this._cardLikes.textContent = obj.likes.length;
            })
            .catch(err => console.log(err));
    }

    _removeLike = (event) => {
        const currentCard = event.target.closest('div.place-card');
        const cardId = currentCard.getAttribute('data-id');
        event.preventDefault();
        this._api.removeLike(cardId)
            .then((obj) => {
                event.target.classList.toggle('place-card__like-icon_liked');
                this._cardLikes.textContent = obj.likes.length;
            })
            .catch(err => console.log(err));
    }

    _removeListeners = () => {
        this._card.querySelector('.place-card__like-icon').removeEventListener('click', this._like);
        this._card.querySelector('.place-card__delete-icon').removeEventListener('click', this._remove);
        this._card.querySelector('.place-card__image').removeEventListener('click', this._popupOpenHandler);
    }

    _remove = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const placesList = event.target.closest('.places-list');
        const currentCard = event.target.closest('div.place-card');
        const cardId = currentCard.getAttribute('data-id');
        if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
            this._api.removeCard(cardId)
                .then(() => {
                    this._removeListeners();
                    placesList.removeChild(currentCard);
                })
                .catch(err => console.log(err));
        }
    }
}