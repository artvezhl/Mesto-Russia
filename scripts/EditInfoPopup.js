class EditInfoPopup extends Popup {
    static _template = document.querySelector('#edit-info-popup').content;

    constructor(popupContainer) {
        super(popupContainer);
        this._popupContent = EditInfoPopup._template.cloneNode(true).children[0];
    }

    open = () => {
        super.open();
        this._container.appendChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').addEventListener('click', this.close);
    }

    close = () => {
        super.close();
        this._container.removeChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').removeEventListener('click', this.close);
    }
}