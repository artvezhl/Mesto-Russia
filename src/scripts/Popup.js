export class Popup {
    constructor(container) {
        this._container = container;
    }

    _toggle() {
        this._container.classList.toggle('popup_is-opened');
    }

    open() {
       this._toggle();
       // TODO сделать закрытие на пустую область и на кнопку esc (keycode = 27)
       //  this._container.addEventListener('keydown', (e) => {
       //     if (e.keyCode == 27)
       //         debugger;
       //         this.close();
       // });
    }

    /* Можно лучше:

	Реализовать закрытие попапа по клику на Escape(keycode = 27), либо по клику вне попапа

	Подробнее можно узнать здесь: https://stackoverflow.com/questions/1481626/how-to-handle-esc-keydown-on-javascript-popup-window
	*/
    close() {
        this._toggle();
        // window.removeEventListener('keydown', (e) => {
        //     if (e.keyCode == 27)
        //         this.close();
        // });
    }
}