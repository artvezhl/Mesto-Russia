class ImagePopup extends Popup {
    static _template = document.querySelector('#image-popup').content;

    constructor(popupContainer) {
        super(popupContainer);
        this._popupContent = ImagePopup._template.cloneNode(true).children[0];
    }

    open = (event) => {
        super.open();
        this._link = event.target.getAttribute('style').slice(22, -2).replace(/"/g, "");
        this._popupContent.querySelector('.popup__image').setAttribute('src', `${this._link}`);
        this._container.appendChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').addEventListener('click', this.close);
    }

    close = () => {
        super.close();
        this._container.removeChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').removeEventListener('click', this.close);
    }
}