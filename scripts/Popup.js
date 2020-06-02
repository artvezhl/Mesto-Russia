class Popup {
    constructor(container) {
        this._container = container;
    }

    _toggle() {
        this._container.classList.toggle('popup_is-opened');
    }

    open() {
       this._toggle();
    }

    close() {
        this._toggle();
    }
}