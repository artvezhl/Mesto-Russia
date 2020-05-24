const places = document.querySelector('.places-list');
const addCardButton = document.querySelector('.user-info__button');
const formsArray = [...document.forms];
const newCardForm = document.forms.new;
const crossButton = document.querySelectorAll('.popup__close');
const editForm = document.forms.edit;
const editInfoButton = document.querySelector('.user-info__edit-button');
const submitEditFormButton = document.querySelector('.popup__button_place_profile');
const infoName = document.querySelector('.user-info__name');
const infoJob = document.querySelector('.user-info__job');
const popupProfile = document.querySelector('.popup-profile');
const currentName = document.querySelector('.user-info__name');
const currentAbout = document.querySelector('.user-info__job');

// функциональное выражение создает разметку карточек и возвращает эту разметку
const createCard = function (name, link) {
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
  placeCard.querySelector(".place-card__name").textContent = name;
  placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${link})`;
  return placeCard;
};

// функциональное выражение используется для добавления карточек в разметку
const addCard = (name, link) => places.appendChild(createCard(name, link));

// функциональное выражение используется для добавления стартовых карточек в разметку
const addStartCards = function() {
  for (let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i].name, initialCards[i].link);
  }
};

// функция меняет класс открытия / закрытия формы
function popupToggle(popup) {
  popup.classList.toggle('popup_is-opened');
}

function popupClose(event) {
  const popup = event.target.closest('.popup');
  const form = event.target.parentNode.querySelector('.popup__form');
  if (!popup.className.includes('popup-image'))
    resetForm(form);
  popupToggle(popup);
}

function popupOpen(event) {
  const popupCard = document.querySelector('.popup-card');
  const popupProfile = document.querySelector('.popup-profile');
  let popup;
  if (event.target.className.includes('user-info__button'))
    popup = popupCard;
  if (event.target.className.includes('user-info__edit-button')) {
    popup = popupProfile;
    fillFormUserName();
  }
  popupToggle(popup);
}

// метод добавляет новую карточку, закрывает ее и сбрасывает форму
const addNewCard = function(event) {
  event.preventDefault();
  const { name, link } = newCardForm.elements;
  if (newCardForm.checkValidity()) {
    addCard(name.value, link.value);
    popupClose(event);
    newCardForm.reset();
  }
};

// функциональное выражение меняет имя и род деятельности вверху страницы
const changeInfo = function (name, job) {
  infoName.textContent = name;
  infoJob.textContent = job;
};

// функциональное выражение принимает данные от обработчика событий
// и отправляет их в целях изменения имени и рода деятельности вверху страницы
const changeNameAndJob = function(event) {
  event.preventDefault();
  const { name, about } = editForm.elements;

  changeInfo(name.value, about.value);
};

function cardLike(event) {
  return event.target.classList.toggle('place-card__like-icon_liked');
}

function cardDelete(event) {
  return places.removeChild(event.target.closest('div.place-card'));
}

function imageGrowth(event) {
  const image = document.querySelector('.popup__image');
  const link = event.target.getAttribute('style').slice(22, -2).replace(/"/g, "");
  const popup = document.querySelector('.popup-image');
  image.setAttribute('src', `${link}`);
  return popupToggle(popup);
}

// метод - обработчик для лайков, вывода картинок и удаления карточек
const cardHandler = function(event) {
  if (event.target.classList.contains('place-card__like-icon'))
      //Можно лучше: После проверки нам уже не нужен весь объект event в функциях. Лучше принимать в функцию элемент(event.target в данном случае).
      // Так она станет универсальной и перестанет зависеть от подхода к поиску элемента. Мы сможем передать ей и элемент найденный через event.target и через querySelector.
    cardLike(event);
  if (event.target.classList.contains('place-card__delete-icon'))
    cardDelete(event);
  if (event.target.classList.contains('place-card__image')) {
    imageGrowth(event);
  }
};

// раздел ВАЛИДАЦИЯ ФОРМ

// функция валидации поля. Она принимает два аргумента: элемент поля и элемент ошибки.
// Если поле прошло валидацию, ошибку следует скрыть. Если не прошло — показать.
function checkInputValidity(inputElem, errorElem) {
// перенес в другую функцию все условия из этой
  //DONE Лучше всё таки провалидировать и установить ошибки в одной и той же функции. Так код будет выглядеть более целостно. К тому же визуально ошибки устанавливаются в этой функции.
  inputElem.setCustomValidity('');

  if (inputElem.validity.valueMissing) {
    inputElem.setCustomValidity('Это обязательное поле');
  }
  if (inputElem.validity.tooShort || inputElem.validity.tooLong) {
    inputElem.setCustomValidity('Должно быть от 2 до 30 символов');
  }
  errorElem.textContent = inputElem.validationMessage;

}

function setSubmitButtonState(form) {
  const submitButton = form.querySelector('.button');
  submitButton.disabled = !form.checkValidity();
// DONE Можно лучше: Повторно проверять не нужно. И класс этот не нужен. В css есть селектор :disabled для стилизации задизейблинных элементов. Так состояние точно не разойдется с визуальной составляющей.
}

// функция сброса формы и ошибок
function resetForm(form) {
  // DONE Можно лучше: Не стоит использовать сокращения. errorElements
  const [...errorElements] = form.querySelectorAll('.error-message');
  errorElements.forEach((elem) => {
    elem.textContent = "";
  });
  form.reset();
}

function fillFormUserName() {
  // DONE Можно лучше: user-info__name и user-info__job стоит вынести в переменные в начале файла.
  const { name, about } = editForm.elements;
  name.value = currentName.textContent;
  about.value = currentAbout.textContent;
}

// Добавляет необходимые обработчики всем его полям.
function setEventListeners(popupElem) {
  popupElem.addEventListener('input', function (event) {
    const input = event.target;
    const error = input.nextElementSibling;
    const form = input.closest('.popup__form');
    checkInputValidity(input, error);
    setSubmitButtonState(form);
  })
}
// Можно лучше: Этот код стоит перенести в setEventListeners. И передавать в функцию форму.
// Для инициализации нужно будет вызвать функцию дважды, передав туда формы.
// Если хочется можно завести функцию, которая пробежится по массив форм и передаст каждую туда.
formsArray.forEach((form) => {
  const inputs = [...form.elements];
  inputs.forEach((input) => {
    setEventListeners(input);
  });
});

function handleEditFormSubmit(event) {
  changeNameAndJob(event);
  resetForm(editForm);
  popupToggle(popupProfile);
}

// DONE Можно лучше: Событие стоит вешать на форму (submit)
editForm.addEventListener('submit', handleEditFormSubmit);

// слушатель события реализует функцию ставить лайки карточкам
places.addEventListener('click', cardHandler);

// обработчик нажатия на кнопку добавить карточку (+) - открывает попап
addCardButton.addEventListener('click', popupOpen);

// обработчик нажатия на кнопку Edit - открыает попап
editInfoButton.addEventListener('click', popupOpen);

// обработчик нажатия на крестик - закрывает попап
crossButton.forEach((elem) => elem.addEventListener('click', popupClose));

// Можно лучше: В обработчиках стоит использовать коллбек функции, в которых проводить всю работу с event и вызывать необходимые нам функции.
/*
*
handleCardFormSubmit(event) {
    addNewCard();
    resetForm(form)
})
newCardForm.addEventListener('submit', handleCardFormSubmit);

cardHandler сделан правильно
*
*
*Хорошей практикой является формирование названия функции обработчика по такому принципу:
    // handle + название объекта + название события
    // Например:
    // handleFormSubmit
    // handleInputChange
    // handleDeleteButtonClick
*
* */

newCardForm.addEventListener('submit', addNewCard);

// метод добавляет стартовые карточки в разметку
addStartCards();

//Можно лучше: В форме редактирования профиля лучше дизейблить кнопку отправки по умолчанию при открытии.
// Ведь если данные не изменились нет необходимости их сохранять повторно. Активная кнопка может порождать лишние запросы на сервер в будущем.

/*Хорошая работа. Для успешной сдачи необходимо исправить все замечания "Надо исправить".
1) DONE Ошибка в консоли при вводе в форму добавления карточки.
2) DONE Та же форма не очищается при закрытии на крестик.
3) DONE В форме редактирования профиля при открытии кнопка визуально не активна, но при клике попап закрывается.
* Успехов в доработке.*/

/*Отлично:
Код хорошо стилизован
Используются комментарии в коде
Используется делегирование
Отсутствуют неиспользуемые переменные и функции*/

//Просьба не оставлять без внимания не критичные комментарии. Рефакторинг - неотъемлемая часть работы программиста. Всегда нужно стараться делать код лучше.
