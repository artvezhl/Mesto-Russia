// ( function () {
//     const places = document.querySelector('.places-list');
//     const addCardButton = document.querySelector('.user-info__button');
//     const formsArray = [...document.forms];
//     const newCardForm = document.forms.new;
//     const newCardFormSubmitButton = newCardForm.querySelector('.button');
//     const editForm = document.forms.edit;
//     const editFormSubmitButton = editForm.querySelector('.button');
//     const editInfoButton = document.querySelector('.user-info__edit-button');
//     const infoName = document.querySelector('.user-info__name');
//     const infoJob = document.querySelector('.user-info__job');
//     const popupAddCard = document.querySelector('.popup-card');
//     const popupProfile = document.querySelector('.popup-profile');
//     const popupImage = document.querySelector('.popup-image');
//     const currentName = document.querySelector('.user-info__name');
//     const currentAbout = document.querySelector('.user-info__job');
//     const crossImagePopup = popupImage.querySelector('.popup__close');
//     const crossProfilePopup = popupProfile.querySelector('.popup__close');
//     const crossAddCardPopup = popupAddCard.querySelector('.popup__close');
// })();


// НОВЫЙ КОД

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


// TODO TEST PLACE
// console.log(editInfoPopup.submitButtonHandler());
// TODO TEST PLACE FINISHED

// TODO сохранить функционал про сбрасывание ошибок и тд при закрытии формы

// const placeCardImages = document.querySelectorAll('.place-card__image');
// placeCardImages.forEach(elem => elem.addEventListener('click',(event) => {
//     const popup = new ImagePopup(event.target.getAttribute('style').slice(22, -2).replace(/"/g, ""));
//     console.log(popup.template());
// }));


// const addStartCards = function() {
//   for (let i = 0; i < initialCards.length; i++) {
//     const card = new Card(initialCards[i].name, initialCards[i].link);
//     cardList.addCard(card.createCard());
//     card.setListeners();
//     // console.log(card);
//     // addCard(initialCards[i].name, initialCards[i].link);
//   }
// };

// функциональное выражение создает разметку карточек и возвращает эту разметку
// const createCard = function (name, link) {
//   const template = document.createElement("div");
//   template.insertAdjacentHTML('beforeend', `
//               <div class="place-card">
//                 <div class="place-card__image">
//                     <button class="place-card__delete-icon"></button>
//                 </div>
//                 <div class="place-card__description">
//                     <h3 class="place-card__name"></h3>
//                     <button class="place-card__like-icon"></button>
//                 </div>
//               </div>`);
//   const placeCard = template.firstElementChild;
//   placeCard.querySelector(".place-card__name").textContent = name;
//   placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${link})`;
//   return placeCard;
// };
//
// // функциональное выражение используется для добавления карточек в разметку
// const addCard = (name, link) => places.appendChild(createCard(name, link));
//
// // функциональное выражение используется для добавления стартовых карточек в разметку
// const addStartCards = function() {
//   for (let i = 0; i < initialCards.length; i++) {
//     addCard(initialCards[i].name, initialCards[i].link);
//   }
// };
//
// // функция меняет класс открытия / закрытия формы
// function popupToggle(popup) {
//   popup.classList.toggle('popup_is-opened');
// }
//
// function handleImagePopupClose() {
//   popupToggle(popupImage);
// }
//
// function handleEditPopupClose() {
//   resetFormErrors(editForm);
//   popupToggle(popupProfile);
// }
//
// function handleAddCardPopupClose() {
//   resetFormErrors(newCardForm);
//   popupToggle(popupAddCard);
// }
//
// function handleAddCardButtonClick() {
//   popupToggle(popupAddCard);
//   newCardFormSubmitButton.disabled = true;
// }
//
// function handleEditButtonClick() {
//   popupToggle(popupProfile);
//   fillFormUserName();
//   editFormSubmitButton.disabled = true;
// }
//
// // метод добавляет новую карточку, закрывает ее и сбрасывает форму
// const addNewCard = function(event) {
//   event.preventDefault();
//   const { name, link } = newCardForm.elements;
//   addCard(name.value, link.value);
//   popupToggle(popupAddCard);
//   resetFormErrors(newCardForm);
// };
//
// // функциональное выражение меняет имя и род деятельности вверху страницы
// const changeInfo = function (name, job) {
//   infoName.textContent = name;
//   infoJob.textContent = job;
// };
//
// // функциональное выражение принимает данные от обработчика событий
// // и отправляет их в целях изменения имени и рода деятельности вверху страницы
// const changeNameAndJob = function(event) {
//   event.preventDefault();
//   const { name, about } = editForm.elements;
//
//   changeInfo(name.value, about.value);
// };
//
// function cardLike(event) {
//   return event.target.classList.toggle('place-card__like-icon_liked');
// }
//
// function cardDelete(event) {
//   return places.removeChild(event.target.closest('div.place-card'));
// }
//
// function imageGrowth(event) {
//   const image = document.querySelector('.popup__image');
//   const link = event.target.getAttribute('style').slice(22, -2).replace(/"/g, "");
//   image.setAttribute('src', `${link}`);
//   return popupToggle(popupImage);
// }
//
// // метод - обработчик для лайков, вывода картинок и удаления карточек
// const cardHandler = function(event) {
//   if (event.target.classList.contains('place-card__like-icon'))
//       // Можно лучше: После проверки нам уже не нужен весь объект event в функциях. Лучше принимать в функцию элемент(event.target в данном случае).
//       // Так она станет универсальной и перестанет зависеть от подхода к поиску элемента. Мы сможем передать ей и элемент найденный через event.target и через querySelector.
//     cardLike(event);
//   if (event.target.classList.contains('place-card__delete-icon'))
//     cardDelete(event);
//   if (event.target.classList.contains('place-card__image')) {
//     imageGrowth(event);
//   }
// };
//
// // раздел ВАЛИДАЦИЯ ФОРМ
//
// // функция валидации поля.
// function checkInputValidity(inputElem, errorElem) {
//   inputElem.setCustomValidity('');
//
//   if (inputElem.validity.valueMissing) {
//     inputElem.setCustomValidity('Это обязательное поле');
//   }
//   if (inputElem.validity.tooShort || inputElem.validity.tooLong) {
//     inputElem.setCustomValidity('Должно быть от 2 до 30 символов');
//   }
//   errorElem.textContent = inputElem.validationMessage;
//
// }
//
// function setSubmitButtonState(form) {
//   const submitButton = form.querySelector('.button');
//   submitButton.disabled = !form.checkValidity();
// }
//
// // функция сброса формы и ошибок
//
// function resetFormErrors(form) {
//   const [...errorElements] = form.querySelectorAll('.error-message');
//   errorElements.forEach((elem) => {
//     elem.textContent = "";
//   });
//   form.reset();
// }
//
// function fillFormUserName() {
//   const { name, about } = editForm.elements;
//   name.value = currentName.textContent;
//   about.value = currentAbout.textContent;
// }
//
// // Добавляет необходимые обработчики всем его полям.
// function setEventListeners(popupElem) {
//   popupElem.addEventListener('input', function (event) {
//     const input = event.target;
//     const error = input.nextElementSibling;
//     const form = input.closest('.popup__form');
//     checkInputValidity(input, error);
//     setSubmitButtonState(form);
//   })
// }
// // Можно лучше: Этот код стоит перенести в setEventListeners. И передавать в функцию форму.
// // Для инициализации нужно будет вызвать функцию дважды, передав туда формы.
// // Если хочется можно завести функцию, которая пробежится по массив форм и передаст каждую туда.
// formsArray.forEach((form) => {
//   const inputs = [...form.elements];
//   inputs.forEach((input) => {
//     setEventListeners(input);
//   });
// });
//
// function handleEditFormSubmit(event) {
//   changeNameAndJob(event);
//   resetFormErrors(editForm);
//   popupToggle(popupProfile);
// }
//
// editForm.addEventListener('submit', handleEditFormSubmit);
//
// // слушатель события реализует функцию ставить лайки карточкам
// places.addEventListener('click', cardHandler);
//
// // обработчик нажатия на кнопку добавить карточку (+) - открывает попап
// addCardButton.addEventListener('click', handleAddCardButtonClick);
//
// // обработчик нажатия на кнопку Edit - открыает попап
// editInfoButton.addEventListener('click', handleEditButtonClick);
//
// // обработчик нажатия на крестик - закрывает попап
// crossImagePopup.addEventListener('click', handleImagePopupClose);
// crossProfilePopup.addEventListener('click', handleEditPopupClose);
// crossAddCardPopup.addEventListener('click', handleAddCardPopupClose);
// // Можно лучше: В обработчиках стоит использовать коллбек функции, в которых проводить всю работу с event и вызывать необходимые нам функции.
// /*
// *
// handleCardFormSubmit(event) {
//     addNewCard();
//     resetForm(form)
// })
// newCardForm.addEventListener('submit', handleCardFormSubmit);
//
// cardHandler сделан правильно
// *
// *
// *Хорошей практикой является формирование названия функции обработчика по такому принципу:
//     // handle + название объекта + название события
//     // Например:
//     // handleFormSubmit
//     // handleInputChange
//     // handleDeleteButtonClick
// *
// * */
// // newCardForm.addEventListener('submit', addNewCard);
// newCardForm.addEventListener('submit', function (event) {
//   event.preventDefault();
//
//   const name = newCardForm.name;
//   const link = newCardForm.link;
//   const card = new Card(name.value, link.value);
//
// });
//
//
// // метод добавляет стартовые карточки в разметку
// addStartCards();
//
// //Отличная работа. Задание принято.
// //Просьба не оставлять без внимания не критичные комментарии. Рефакторинг - неотъемлемая часть работы программиста. Всегда нужно стараться делать код лучше.
// //Перед отправкой на проверку следующего спринта необходимо очистить код от комментариев предыдущего спринта. Спасибо.
// //Успехов в дальнейшем обучении.
// /*
//
// //Можно лучше: Текст ошибки под полем ссылки не соответствует заданию. Необходимо поправить в следующем спринте.
//
// /*Отлично:
// Код хорошо стилизован
// Используются комментарии в коде
// Используется делегирование
// Отсутствуют неиспользуемые переменные и функции
// Код краток и лаконичен
// Функционал полностью соответствует заданию
// */