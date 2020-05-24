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

// функциональное выражение создает разметку карточек и возвращает эту разметку

/* DONE Надо исправить: Стоит обратить внимание, что вставка данных с помощью интерполяции шаблонной строки и insertAdjacentHTML может привести к уязвимости XSS, т.к. данные вставляются на страницу как обычный html, а если они придут с сервера в данных может быть код злоумышленника и он будет вставлен на страницу как html и исполнится. Поэтому необходимо фильтровать html теги во вставляемых данных (такая процедура называется HTML sanitization пример как это сделать есть здесь
https://gomakethings.com/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/ ) или вставлять данные с помощью textContent и style.backgroundImage уже после создания разметки элемента как показано на примере ниже:

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
*/

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

// функция добавляет/удаляет класс у формы, чтобы реализовать ее открытие/закрытие

// DONE Надо исправить: Сложная функция с дублированием кода.
/*
function popupToggle(popup) {
   popup.classList.toggle('popup_is-opened');
}
Стоит сократить так.
* */
// функция меняет класс открытия / закрытия формы
function popupToggle(popup) {
  popup.classList.toggle('popup_is-opened');
}

function popupClose(event) {
  // DONE Надо исправить: Используя parentElement мы сильно зависим от разметки, которая может измениться. Лучше использовать метод closest для поиска нужного нам родителя
  // https://learn.javascript.ru/searching-elements-dom
  // Так код выполниться корректно вне зависимости от уровня вложенности элемента, на котором произошло событие.
  const popup = event.target.closest('.popup');
  const form = event.target.parentNode.querySelector('.popup__form');
  if (!popup.className.includes('.popup-image'))
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
  // DONE Можно лучше: Переменные стоит вынести из функции, чтобы при каждом вызове не искать элементы в DOM
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
      // DONE Можно лучше: Логику внутри условий лучше вынести в отдельные функции с говорящими названиями.
      // Так логика будет разделена. Появится возможность переиспользовать код. А благодаря названиям функций код станет проще читать.
    cardLike(event);
  if (event.target.classList.contains('place-card__delete-icon'))
    cardDelete(event);
  if (event.target.classList.contains('place-card__image')) {
    imageGrowth(event);
  }
};

// раздел ВАЛИДАЦИЯ ФОРМ

// функция работы с ошибками
function setErrors(input) {
  input.setCustomValidity('');

  if (input.validity.valueMissing) {
    input.setCustomValidity('Это обязательное поле');
  }
  if (input.validity.tooShort || input.validity.tooLong) {
    input.setCustomValidity('Должно быть от 2 до 30 символов');
  }
}


// функция валидации поля. Она принимает два аргумента: элемент поля и элемент ошибки.
// Если поле прошло валидацию, ошибку следует скрыть. Если не прошло — показать.
function checkInputValidity(inputElem, errorElem) {
// DONE Надо исправить: Функция работает некорректно. Для проверки валидации лучше воспользоваться встроенной HTML5 валидацией. Используем объект validity в условиях вместо собственных проверок.
// //https://developer.mozilla.org/ru/docs/Learn/HTML/Forms/%D0%92%D0%B0%D0%BB%D0%B8%D0%B4%D0%B0%D1%86%D0%B8%D1%8F_%D1%84%D0%BE%D1%80%D0%BC%D1%8B#API_%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B8_%D0%B2%D0%B0%D0%BB%D0%B8%D0%B4%D0%BD%D0%BE%D1%81%D1%82%D0%B8_HTML5
  // перенес в другую функцию все условия из этой
  setErrors(inputElem);
  errorElem.textContent = inputElem.validationMessage;
  // if (inputElem.validity.valueMissing) {
  //   //errorElem.classList.remove('error-message__hidden');
  //   inputElem.setCustomValidity('Это обязательное поле');
    // DONE Можно лучше: Нам не нужно ничего возвращать из функции. Все return'ы можно удалить
  // }
  // if (inputElem.validity.tooShort || inputElem.validity.tooLong) {
  //   // errorElem.classList.remove('error-message__hidden');
  //   inputElem.setCustomValidity('Должно быть от 2 до 30 символов');
  // }
  // if (inputElem.validity)
  //   inputElem.setCustomValidity('');

}

// функция, меняющая состояние кнопки сабмита. Состояние кнопки сабмита зависит от того,
// прошли все поля валидацию или нет. Определите самостоятельно, какие аргументы передавать этой функции.
function setSubmitButtonState(form) {
  // DONE Надо исправить: Функция не дизейблит поля. Всю, что нам нужно это узнать валидна форма или нет. И для этого у нас есть метод checkValidity().
  // Вся функция сводится к submitButton.disable = !form.checkValidity()
  const submitButton = form.querySelector('#submit');
  submitButton.disabled = !form.checkValidity();

  if (form.checkValidity()) {
    submitButton.classList.add('popup__button_active');
  } else {
    submitButton.classList.remove('popup__button_active');
  }
}

// функция сброса формы и ошибок
// DONE Надо исправить: Функция должна работать точечно. Для этого передаем в неё форму и ищем ошибки только в ней.
function resetForm(form) {
  const [...errorElems] = form.querySelectorAll('.error-message');
  errorElems.forEach((elem) => {
    // DONE Можно лучше: Стилями стоит управлять в css. Тут лучше переключать класс.
    elem.textContent = "";
  });
}

function fillFormUserName() {
  const currentName = document.querySelector('.user-info__name').textContent;
  const currentAbout = document.querySelector('.user-info__job').textContent;
  const { name, about } = editForm.elements;
  name.value = currentName;
  about.value = currentAbout;
}

// функция добавления обработчиков. Принимает единственный аргумент — элемент попапа.
// Добавляет необходимые обработчики всем его полям.
// Эта функция в своём теле вызывает функции checkInputValidity и setSubmitButtonState
function setEventListeners(popupElem) {
  popupElem.addEventListener('input', function (event) {
    //Отлично: Функция обработчик сделана отлично.
    const input = event.target;
    //const error = input.nextElementSibling; так понятнее. Нашли инпут, дальше пляшем от него.
    const error = input.nextElementSibling;
    //const form = input.closest('.popup__form');
    const form = input.closest('.popup__form');
    checkInputValidity(input, error);
    setSubmitButtonState(form);
  })
}

// DONE Надо исправить: Хардкодить все поля не нужно. Представьте, что в форме 50 полей. Или добавили ещё несколько. Мы не должны править из-за этого код.
//Функция setEventListeners должна динамически находить все инпуты в переданной форме и вешать обработчики.
formsArray.forEach((form) => {
  const inputs = [...form.elements];
  inputs.forEach((input) => {
    setEventListeners(input);
  });
});

function handleFormSubmit(event) {
  changeNameAndJob(event);
  resetForm(editForm);
  popupToggle(popupProfile);
}

submitEditFormButton.addEventListener('click', handleFormSubmit);

// DONE Надо исправить: При инициализации нам не нужно сбрасывать формы. Они и так пусты. Ошибки должны быть скрыты по умолчанию

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

/*Хорошая работа. Для успешной сдачи необходимо исправить все замечания "Надо исправить".
1) Исправить функции валидации. Сейчас они не работоспособны. Ошибки появляются не под теми полями, с которыми происходит взаимодействие. Не всегда появляются ошибки. Кнопка не блокируется.
2) Форма редактирования должна заполняться данными о пользователе при открытии.
3) Исправить небезопасную вставку пользовательских данных.
4) Убрать хардкод при навешивании обработчиков
5) Переписать функцию управления попапом. Сейчас она сильно перегружена
* Успехов в доработке.*/

/*Отлично:
Код хорошо стилизован
Используются комментарии в коде
Используется делегирование
Отсутствуют неиспользуемые переменные и функции*/

//Просьба не оставлять без внимания не критичные комментарии. Рефакторинг - неотъемлемая часть работы программиста. Всегда нужно стараться делать код лучше.