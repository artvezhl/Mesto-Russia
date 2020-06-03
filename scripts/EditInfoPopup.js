class EditInfoPopup extends Popup {
    static _template = document.querySelector('#edit-info-popup').content;

    constructor(popupContainer, userInfoObj, formValidator) {
        super(popupContainer);
        this._popupContent = EditInfoPopup._template.cloneNode(true).children[0];
        this.userInfoObj = userInfoObj;
        this.formValidator = formValidator;
    }

    open = () => {
        super.open();
        this._container.appendChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').addEventListener('click', this.close);
        this.form = document.forms.edit;
        this.name = this.form.name;
        this.about = this.form.about;
        this.name.value = this.userInfoObj.name;
        this.about.value = this.userInfoObj.info;
        this._setListeners();
        this.formValidator(this.form).setEventListeners();
        this.form.querySelector('.button').setAttribute('disabled', 'true');
    }

    _setListeners = () => {
        this.form.addEventListener('submit', this._handleEditFormSubmit);
    }

    _handleEditFormSubmit = () => {
        this.userInfoObj.setUserInfo(this.name.value, this.about.value);
        this.close();
    }

    close = () => {
        super.close();
        this._container.removeChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').removeEventListener('click', this.close);
    }
}