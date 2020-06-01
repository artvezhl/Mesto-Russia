class ImagePopup extends Popup {
    constructor(popupContainer) {
        super(popupContainer);
        // this.link = this.image.getAttribute('style').slice(22, -2).replace(/"/g, "");
        this.content = this.template();
    };

    template() {
        this.content = document.createElement("div");
        this.content.insertAdjacentHTML('beforeend', `
              <div class="popup__content popup__content_place_image">
                  <img src="" alt="" class="popup__image">
                  <img src="./images/close.svg" alt="" class="popup__close popup__close_place_image">
              </div>`);
        const fullImage = this.content.firstElementChild;
        this.image = fullImage.querySelector('.popup__image');
        // fullImage.querySelector(".popup__image").setAttribute('src', `${this.link}`);
        this.content = fullImage;
        this.closeButton = fullImage.querySelector('.popup__close');
        return fullImage;
    };

    open(event) {
        super.open();
        this.template();
        // TODO сделать чтобы при клике на корзину не выскакивала ошибка в консоль
        this.link = event.target.getAttribute('style').slice(22, -2).replace(/"/g, "");
        this.content.querySelector(".popup__image").setAttribute('src', `${this.link}`);
        this.container.innerHTML = this.content.outerHTML;
    }

    setListeners() {
        // todo make listener for popup closing
        // this.closeButton = document.querySelector('.popup__close');
        console.log(document.querySelector('.popup__content'));
        this
            .closeButton
            .addEventListener('click', this.close);
    }

    removeListeners() {
        this.closeButton.removeEventListener('click', this.close());
    }
}