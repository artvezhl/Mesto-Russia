class AddCardPopup extends Popup {
    static _template = document.querySelector('#add-card-popup').content;

    constructor(popupContainer, cardlist) {
        super(popupContainer);
        this._popupContent = AddCardPopup._template.cloneNode(true).children[0];
        this.cardlist = cardlist;
    }

    open = () => {
        super.open();
        this._container.appendChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').addEventListener('click', this.close);
        this._addCardForm = document.forms.new;
        this._setListeners();
    }

    _setListeners = () => {
        this._addCardForm.addEventListener('submit', this._handleAddCardSubmit);
    }

    _handleAddCardSubmit = () => {
        this.cardlist.addCard(this._addCardForm.name.value, this._addCardForm.link.value);
        this._resetForm();
        this.close();
    }

    _resetForm() {
        this._addCardForm.reset();
    }

    close = () => {
        super.close();
        this._container.removeChild(this._popupContent);
        this._popupContent.querySelector('.popup__close').removeEventListener('click', this.close);
    }
}