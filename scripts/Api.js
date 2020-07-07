class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    // метод проверки ответа сервера и преобразование из json
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    // запрос информации и пользователе с сервера
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    // запрос стартовых карточек с сервера
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    // изменение данных о пользователе на сервере
    editUserInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => this._getResponseData(res));
    }

    // добавление новой карточки на сервер
    addNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => this._getResponseData(res));
    }

    // удаление карточки с сервера
    removeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    // постановка лайка
    setLike(cardId) {
        return fetch(`${this._url}/cards/like/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    // удаление лайка
    removeLike(cardId) {
        return fetch(`${this._url}/cards/like/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    // изменение аватарки
    changeAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${avatar}`
            })
        })
            .then(res => this._getResponseData(res));
    }
}