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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject("Произошла ошибка");
            });
    };

    // запрос стартовых карточек с сервера
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject("Произошла ошибка");
            });
    };

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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject("Произошла ошибка");
            });
    };
}