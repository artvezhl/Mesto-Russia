class Popup {
    constructor(popupContainer) {
        this.container = popupContainer;
    }

    toggle() {
        this.container.classList.toggle('popup_is-opened');
    }

    open() {
        this.toggle();
        this.setListeners();
    }

    close() {
        this.toggle();
        this.removeListeners();
        this.container.innerHTML = null;
    }

    setListeners() {
    }

    // TODO посмотреть какие проблемы с удалением в первом  Q&A
    removeListeners() {
    }
}