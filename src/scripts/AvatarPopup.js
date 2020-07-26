import {Popup} from "./Popup.js";

export class AvatarPopup extends Popup {
    static _template = document.querySelector('#change-avatar-popup').content;

    constructor(popupContainer, userInfo, formValidator, api) {
        super(popupContainer);
        this._popupContent = AvatarPopup._template.cloneNode(true).children[0];
        this._userInfo = userInfo;
        this.formValidator = formValidator;
        this._api = api;
    }

    open = () => {
        super.open();
        this._container.appendChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').addEventListener('click', this.close);
        this.form = document.forms.ava;
        this.form.addEventListener('submit', this._handleChangeAvaSubmit);
        this.formValidator(this.form).setEventListeners();
        this.form.querySelector('.button').setAttribute('disabled', 'true');
    }

    _handleChangeAvaSubmit = (event) => {
        event.preventDefault();
        console.log(this.form.link.value);
        this._api.changeAvatar(`${this.form.link.value}`)
            .then(() => {
                this._userInfo.setAvatar(`${this.form.link.value}`);
                this._resetForm();
                this.close();
            })
            .catch(err => console.log(err));
    }

    _resetForm() {
        this.form.reset();
    }

    close = () => {
        super.close();
        this._container.removeChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').removeEventListener('click', this.close);
        this._resetForm();
        this._resetFormErrors();
    }

    _resetFormErrors() {
        const [...errorElements] = this.form.querySelectorAll('.error-message');
        errorElements.forEach((elem) => {
            elem.textContent = "";
        });
    }
}