class UserInfo {
    constructor(name, info) {
        this.name = name;
        this.info = info;
    }

    // обновлять данные внутри экземпляра класса
    setUserInfo(newName, newInfo) {
        this.name = newName;
        this.info = newInfo;
        this.updateUserInfo();
    }

    // отображать данные на странице (обновлять данные на странице с учетом того, что введено в форме)
    updateUserInfo() {
        document.querySelector('.user-info__name').textContent = this.name;
        document.querySelector('.user-info__job').textContent = this.info;
    }
}