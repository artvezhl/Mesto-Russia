// создание переменных для слушателей
const popupContainer = document.querySelector('.popup-container');
const editInfoButton = document.querySelector('.user-info__edit-button');
const addCardButton = document.querySelector('.user-info__button');

// создание экземпляра класса FormValidator
const formValidator = (...arg) => new FormValidator(...arg);

// создание экземпляра класса ImagePopup
const imagePopup = new ImagePopup(popupContainer);

// создание экземпляра класса UserInfo без аргументов
/* Можно лучше:

Вынести селекторы для '.user-info__name' и '.user-info__job' в константы в начале файла, и передавать эти переменные
в качестве аргументов при создании экземпляра класса userInfo
*/
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

/* REVIEW:

Работа выполнена отлично, весь функционал реализован и работает как указано в задании, видно общее понимание принципов ООП, 
в коде используются стрелочные функции и интерполяция строк из ES6, а также spread-оператор, здорово! Код логично организован, 
методы классов и переменные имеют понятные и описательные названия, карточку нельзя добавить на страницу, если поля не заполнены. 
Также очень круто, что используется наследование и в коде присутствуют уместные комментарии.

По работе нет никаких критических замечаний, работа принята! Удачи в следующем спринте

Можно лучше: 1) Избавиться от дублирования кода в классе CadrdList
2) Вынести селекторы для '.user-info__name' и '.user-info__job' в константы в начале файла
3) Реализовать закрытие попапов по клику на Escape(keycode = 27), либо по клику вне попапа
*/