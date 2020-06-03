class AddCardPopup extends Popup {
    static _template = document.querySelector('#add-card-popup').content;

    constructor(popupContainer, cardlist, formValidator) {
        super(popupContainer);
        this._popupContent = AddCardPopup._template.cloneNode(true).children[0];
        this.cardlist = cardlist;
        this.formValidator = formValidator;
    }

    open = () => {
        super.open();
        this._container.appendChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').addEventListener('click', this.close);
        this.form = document.forms.new;
        this._setListeners();
        this.formValidator(this.form).setEventListeners();
        this.form.querySelector('.button').setAttribute('disabled', 'true');
    }

    _setListeners = () => {
        this.form.addEventListener('submit', this._handleAddCardSubmit);
    }

    _handleAddCardSubmit = () => {
        this.cardlist.addCard(this.form.name.value, this.form.link.value);
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
    }
}