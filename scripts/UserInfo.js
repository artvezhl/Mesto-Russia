class UserInfo {
    constructor(nameNode, aboutNode) {
        this._nameNode = nameNode;
        this._aboutNode = aboutNode;
    }

    // метод отрисовки дефолтных имени, информации и аватарки
    renderDefaultInfo(userData) {
        this.name = userData.name;
        this.info = userData.about;
        userName.textContent = userData.name;
        userAbout.textContent = userData.about;
        userAva.style.backgroundImage = `url(${userData.avatar})`;
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