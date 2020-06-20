class UserInfo {
    constructor(api, nameNode, aboutNode) {
        this._api = api;
        this._nameNode = nameNode;
        this._aboutNode = aboutNode;
    }

    // метод отрисовки дефолтных имени, информации и аватарки
    renderDefaultInfo() {
        this._api.getUserInfo()
            .then(res => {
                this.name = res.name;
                this.info = res.about;
                userName.textContent = res.name;
                userAbout.textContent = res.about;
                userAva.style.backgroundImage = `url(${res.avatar})`;
            })
            .catch(err => console.log(err));
    }

    // обновление данные внутри экземпляра класса
    setUserInfo(newName, newInfo) {
        this.name = newName;
        this.info = newInfo;
        this.updateUserInfo();
    }

    // отображать данные на странице (обновлять данные на странице с учетом того, что введено в форме)
    updateUserInfo() {
        this._nameNode.textContent = this.name;
        this._aboutNode.textContent = this.info;
    }
}