class ImagePopup extends Popup {
    static _template = document.querySelector('#image-popup').content;

    constructor(popupContainer) {
        super(popupContainer);
        this._popupContent = ImagePopup._template.cloneNode(true).children[0];
    }

    // TODO разобраться почему не отображается картинка
    open = (event) => {
        super.open();
        const backgroundImage = event.target.getAttribute('style');
        this._link = event.target.getAttribute('style').slice(22, -2).replace(/"/g, "");
        this._popupContent.querySelector('.popup__image').style = backgroundImage;
        this._container.appendChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').addEventListener('click', this.close);
    }

    close = () => {
        super.close();
        this._container.removeChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').removeEventListener('click', this.close);
    }
}