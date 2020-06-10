class AddCardPopup extends Popup {
    static _template = document.querySelector('#add-card-popup').content;

    constructor(popupContainer, cardlist, formValidator, api) {
        super(popupContainer);
        this._popupContent = AddCardPopup._template.cloneNode(true).children[0];
        this.cardlist = cardlist;
        this.formValidator = formValidator;
        this._api = api;
    }

    open = () => {
        super.open();
        this._container.appendChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').addEventListener('click', this.close);
        this.form = document.forms.new;
        this.form.addEventListener('submit', this._handleAddCardSubmit);
        this.formValidator(this.form).setEventListeners();
        this.form.querySelector('.button').setAttribute('disabled', 'true');
    }

    _handleAddCardSubmit = () => {
        this.cardlist.addCard({name: this.form.name.value, link: this.form.link.value});
        this._api.addNewCard(this.form.name.value, this.form.link.value);
        this._resetForm();
        this.close();
    }

    _resetForm() {
        this.form.reset();
    }

    close = () => {
        super.close();
        this._container.removeChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').removeEventListener('click', this.close);
        this._resetFormErrors();
    }

    _resetFormErrors() {
        const [...errorElements] = this.form.querySelectorAll('.error-message');
        errorElements.forEach((elem) => {
            elem.textContent = "";
        });
    }
}