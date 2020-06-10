class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    // запрос информации и пользователе с сервера
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(res => res.json());
    };

    // запрос стартовых карточек с сервера
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(res => res.json());
    };

    // изменение данных о пользователе на сервере
    editUserInfo(name, about) {
        fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => res.json());
    };

    addNewCard(name, link) {
        fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => res.json());
    }

    deleteCard(id) {
        fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => res.json())
    }
}