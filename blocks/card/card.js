class Card {
    constructor(name, link) {
        this.name = name;
        this.link = link;
    };

    createCard() {
        const template = document.createElement("div");
        template.insertAdjacentHTML('beforeend', `
              <div class="place-card">
                <div class="place-card__image">
                    <button class="place-card__delete-icon"></button>
                </div>
                <div class="place-card__description">
                    <h3 class="place-card__name"></h3>
                    <button class="place-card__like-icon"></button>
                </div>
              </div>`);
        const placeCard = template.firstElementChild;
        placeCard.querySelector(".place-card__name").textContent = this.name;
        placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${this.link})`;
        this.cardElement = placeCard;
        return placeCard;
    };

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    // TODO исправить метод чтобы он удалял слушателей (было в первом Q&A)
    remove(event) {
        const placesList = event.target.closest('.places-list');
        const currentCard = event.target.closest('div.place-card');
        placesList.removeChild(currentCard);
    }

    setListeners(openImageMethod) {
        this
            .cardElement
            .querySelector('.place-card__like-icon')
            .addEventListener('click', this.like);
        this
            .cardElement
            .querySelector('.place-card__delete-icon')
            .addEventListener('click', this.remove);
        this
            .cardElement
            .querySelector('.place-card__image')
            .addEventListener('click', openImageMethod);
    }

    removeListeners() {
        this
            .cardElement
            .querySelector('.place-card__like-icon')
            .removeEventListener('click', this.like);
        this
            .cardElement
            .querySelector('.place-card__delete-icon')
            .removeEventListener('click', this.remove);
    }
}