import {Popup} from './Popup.js';

export class ImagePopup extends Popup {
    // static _template = document.querySelector('#image-popup').content;

    constructor(popupContainer, imageTemplate) {
        super(popupContainer);
        this._popupContent = imageTemplate.cloneNode(true).children[0];
        this.open = this.open().bind(this);
        this.close = this.close().bind(this);
    }

    open(event) {
        super.open();
        this._link = event.target.getAttribute('style').slice(22, -2).replace(/"/g, "");
        this._popupContent.querySelector('.popup__image').setAttribute('src', `${this._link}`);
        this._container.appendChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').addEventListener('click', this.close);
    }

    close() {
        super.close();
        this._container.removeChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').removeEventListener('click', this.close);
    }
}