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
        /* DONE
            Можно лучше: проверка ответа сервера и преобразование из json
            дублируется во всех методах класса Api, лучше вынести в отдельный метод:
                _getResponseData(res) {
                    if (!res.ok) {
                        return Promise.reject(`Ошибка: ${res.status}`); 
                    }
                    return res.json();
                }
            Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
            не используется вне класса Api   
        */
            .then(res => this._getResponseData(res));
    };

    // запрос стартовых карточек с сервера
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
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
            .then(res => this._getResponseData(res));
    };
}