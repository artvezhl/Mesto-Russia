class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(res => res.json());
    };

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(res => res.json());
    };

    editUserInfo(name, about) {
        fetch('https://praktikum.tk/cohort11/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '6a4cb1c5-9817-4f1e-b991-c86219eada0b',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
        // fetch(`${this._url}/users/me`, {
        //     method: 'PATCH',
        //     headers: {
        //         this._headers,
        //     },
        //     body: JSON.stringify({
        //         name: name,
        //         about: about
        //     })
        // })
        //     .then(res => res.json());
    }
}