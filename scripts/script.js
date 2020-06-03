// создание переменных для слушателей
const popupContainer = document.querySelector('.popup-container');
const editInfoButton = document.querySelector('.user-info__edit-button');
const addCardButton = document.querySelector('.user-info__button');

// создание экземпляра класса FormValidator
const formValidator = (...arg) => new FormValidator(...arg);

// создание экземпляра класса ImagePopup
const imagePopup = new ImagePopup(popupContainer);

// создание экземпляра класса UserInfo без аргументов
const userInfo = new UserInfo(document.querySelector('.user-info__name').textContent, document.querySelector('.user-info__job').textContent);

// создание экземпляра класса AddCardPopup
const editInfoPopup = new EditInfoPopup(popupContainer, userInfo, formValidator);

// создание экземпляра класса Card без аргументов
const createCard = (...arg) => new Card(...arg);

// создание экземпляра Cardlist
const cardList = new Cardlist(document.querySelector('.places-list'), initialCards, createCard, imagePopup.open);

// создание экземпляра класса AddCardPopup
const addCardPopup = new AddCardPopup(popupContainer, cardList, formValidator);

// слушатели событий
editInfoButton.addEventListener('click', editInfoPopup.open);
addCardButton.addEventListener('click', addCardPopup.open);

// отрасовка начальных карточек
cardList.render();