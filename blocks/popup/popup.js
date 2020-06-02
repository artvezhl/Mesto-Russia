class Popup {
    constructor(popupContainer, openButton, closeButton) {
        this.container = popupContainer;
        this.openButton = openButton;
        this.closeButton = closeButton;
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
    }

    // TODO сделать общий слушатель на закрытие всех попапов
    setListeners() {
        this
            .openButton
            .addEventListener('click', this.open);
        this
            .closeButton
            .addEventListener('click', this.close);
    }

    // TODO посмотреть какие проблемы с удалением в первом  Q&A
    removeListeners() {
        this
            .openButton
            .removeEventListener('click', this.open.bind(this));
        this
            .closeButton
            .removeEventListener('click', this.close.bind(this));
    }
}