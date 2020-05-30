class Cardlist {
    constructor(container) {
        this.container = container;
        this.cards = [];
    }
    // TODO fix it
    // render() {
    //     const noSongsElement = document.querySelector('.no-songs');
    //
    //     if (this.songs.length === 0) {
    //         noSongsElement.classList.remove('no-songs_hidden');
    //     } else {
    //         noSongsElement.classList.add('no-songs_hidden');
    //     }
    // }

    addCard(cardElement) {
        this.cards.push(cardElement);
        this.container.appendChild(cardElement);
        // this.render();
    }

    // TODO delete code below
    // reset() {
    //     this.songs = [];
    //     this.container.innerHTML = '';
    //     this.render();
    // }
}