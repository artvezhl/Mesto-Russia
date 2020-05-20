const places = document.querySelector('.places-list');
const popups = document.querySelectorAll('.popup');
const addCardButton = document.querySelector('.user-info__button');
const newCardForm = document.forms.new;
const editForm = document.forms.edit;
const editInfoButton = document.querySelector('.user-info__edit-button');

// функциональное выражение создает разметку карточек и возвращает эту разметку
const createCard = function (name, link) {
  const markup = `
    <div class = 'place-card'>
        <div class="place-card__image" style="background-image: url(${link})">
            <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
            <h3 class="place-card__name">${name}</h3>
            <button class="place-card__like-icon"></button>
        </div>
    </div>
  `;

  const element = document.createElement('div');
  element.insertAdjacentHTML('afterbegin', markup);

  return element.firstElementChild;
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
function popupToggle () {
  const popupCard = document.querySelector('.popup-card');
  const popupProfile = document.querySelector('.popup-profile');
  const popupImage = document.querySelector('.popup-image');

  function popupProfileToggle () {
    popupProfile.classList.toggle('popup_is-opened');
  }
  function popupCardToggle () {
    popupCard.classList.toggle('popup_is-opened');
  }
  function popupImageToggle () {
    popupImage.classList.toggle('popup_is-opened');
  }
  function popupClose(event) {
    const crossParent = event.target.parentElement.parentElement;
    if (crossParent == popupCard)
      popupCardToggle();
    if (crossParent == popupProfile)
      popupProfileToggle();
    if (crossParent == popupImage)
      popupImageToggle();
  }

  return {
    popupCardToggle,
    popupProfileToggle,
    popupImageToggle,
    popupClose,
  }
};

// присваиваем функцию popupToggle константе popupHandler
const popupHandler = popupToggle();

// метод добавляет новую карточку
const addNewCard = function(event) {
  event.preventDefault();
  const { name, link } = newCardForm.elements;
  if (name.value.length !== 0 || link.value.length !== 0) {
    addCard(name.value, link.value);
    popupHandler.popupCardToggle();
    newCardForm.reset();
  }
};

// функциональное выражение меняет имя и род деятельности вверху страницы
const changeInfo = function (name, job) {
  const infoName = document.querySelector('.user-info__name');
  const infoJob = document.querySelector('.user-info__job');
  infoName.textContent = name;
  infoJob.textContent = job;
};

// функциональное выражение принимает данные от обработчика событий
// и отправляет их в целях изменения имени и рода деятельности вверху страницы
const changeNameAndJob = function(event) {
  event.preventDefault();
  const { name, about } = editForm.elements;

  if (name.value.length !== 0 || about.value.length !== 0) {
    changeInfo(name.value, about.value);
    popupHandler.popupProfileToggle();
    editForm.reset();
  }
};

// метод - обработчик для лайков, вывода картинок и удаления карточек
const cardHandler = function(event) {
  if (event.target.classList.contains('place-card__like-icon'))
    return event.target.classList.toggle('place-card__like-icon_liked');
  if (event.target.classList.contains('place-card__delete-icon'))
    return places.removeChild(event.target.closest('div.place-card'));
  if (event.target.classList.contains('place-card__image')) {
    const image = document.querySelector('.popup__image');
    const link = event.target.getAttribute('style').slice(22, -1).replace(/"/g, "");
    image.setAttribute('src', `${link}`);
    return popupHandler.popupImageToggle();
  }
};

// раздел ВАЛИДАЦИЯ ФОРМ
const name = document.querySelector('#name');
const about = document.querySelector('#about');
const placeName = document.querySelector('#name');
const url = document.querySelector('#about');

// функция валидации поля. Она принимает два аргумента: элемент поля и элемент ошибки.
// Если поле прошло валидацию, ошибку следует скрыть. Если не прошло — показать.
function checkInputValidity(inputElem, errorElem) {

  if (!inputElem.checkValidity() && inputElem.value.length < 1) {
    errorElem.setAttribute('style', 'opacity: 1');
    errorElem.textContent = 'Это обязательное поле';
    return false;
  }
  else if (inputElem.value.length == 1) {
    errorElem.textContent = 'Должно быть от 2 до 30 символов';
    return false;
  }
  else {
    errorElem.setAttribute('style', 'opacity: 0');
    return true;
  }
}

// функция, меняющая состояние кнопки сабмита. Состояние кнопки сабмита зависит от того,
// прошли все поля валидацию или нет. Определите самостоятельно, какие аргументы передавать этой функции.
function setSubmitButtonState(form) {
  const inputs = Array.from(form.elements);
  const submitButton = form.querySelector('#submit');

  let isValidForm = true;

  // TODO подумать над тем как кнопку заставить гаснуть если второе поле пустое
  inputs.forEach((elem) => {
    if (elem.id !== submit.id) {
      if (!checkInputValidity(elem, elem.nextElementSibling)) isValidForm = false;
    }
  });

  if (isValidForm) {
    submitButton.classList.add('popup__button_active');
  } else {
    submitButton.classList.remove('popup__button_active');
  }
}

// функция сброса формы и ошибок
function resetForm() {
  const crossButton = document.querySelectorAll('.popup__close');

  crossButton.forEach((elem) => {
    elem.addEventListener('click', function (event) {
      const errorElem = event.target.parentNode.querySelectorAll('.error-message');
      const form = event.target.parentNode.querySelector('.popup__form');
      errorElem.forEach((elem) => {
        elem.setAttribute('style', 'opacity: 0');
      });
      form.reset();
    });
  });
}

// функция добавления обработчиков. Принимает единственный аргумент — элемент попапа.
// Добавляет необходимые обработчики всем его полям.
// Эта функция в своём теле вызывает функции checkInputValidity и setSubmitButtonState
function setEventListeners(popupElem) {
  popupElem.addEventListener('input', function (event) {
    const input = event.target;
    const error = event.target.nextElementSibling;
    const form = event.target.closest('.popup__form');
    checkInputValidity(input, error);
    setSubmitButtonState(form);
  })
}

setEventListeners(name);
setEventListeners(about);
setEventListeners(placeName);
setEventListeners(url);
resetForm();

// слушатель события реализует функцию ставить лайки карточкам
places.addEventListener('click', cardHandler);

// слушатель события при открытии формы вызывает функцию popupToggle
// в целях добавления новой карточки
addCardButton.addEventListener('click', popupHandler.popupCardToggle);

// слушатель события при закрытии формы вызывает функцию popupToggle
// (удаление класса для закрытия формы)
popups.forEach((elem) => elem.addEventListener('click', popupHandler.popupClose));

// слушатель события при отправке формы вызывает функцию, которая добавляет
// новую не пустую карточку в разметку и закрывает форму
newCardForm.addEventListener('submit', addNewCard);

// слушатель события при отправке формы вызывает функцию, которая
// изменяет имя и род деятельности в шапке
editForm.addEventListener('submit', changeNameAndJob);

// слушатель события при открытии формы вызывает функцию popupHandler
// в целях изменения информации вверху страницы о человеке и роде деятельности
editInfoButton.addEventListener('click', popupHandler.popupProfileToggle);

// метод добавляет стартовые карточки в разметку
addStartCards();