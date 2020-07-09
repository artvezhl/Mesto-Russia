export class UserInfo {
    constructor(nameNode, aboutNode, avaNode) {
        this._nameNode = nameNode;
        this._aboutNode = aboutNode;
        this._avaNode = avaNode;
    }

    // метод отрисовки дефолтных имени, информации и аватарки
    renderDefaultInfo(userData) {
        this.name = userData.name;
        this.info = userData.about;
        this.ava = userData.avatar;
        this._nameNode.textContent = this.name;
        this._aboutNode.textContent = this.info;
        this._avaNode.style.backgroundImage = `url(${this.ava})`;
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

    // обновление данных об аватаре внутри экземпляра класса
    setAvatar(avatar) {
        this.ava = avatar;
        this.updateUserAva();
    }

    // отображение данных на странице
    updateUserAva() {
        this._avaNode.style.backgroundImage = `url(${this.ava})`;
    }
}