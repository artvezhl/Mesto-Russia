const places = document.querySelector('.places-list');
const popup = document.querySelector('.popup');
const addCardButton = document.querySelector('.user-info__button');
const closePopupButton = document.querySelector('.popup__close');
const form = document.forms.new;
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

// функциональное выражение  используется для добавления стартовых карточек в разметку
const addStartCards = function() {
  for (let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i].name, initialCards[i].link);
  };
};

// функциональное выражение добавляет/удаляет класс у формы, чтобы реализовать ее открытие/закрытие
const popupToggle = () => popup.classList.toggle('popup_is-opened');

// метод - обработчик попапа, меняющий текст плейсхолдеров в зависимости от того какая кнопка нажата в зависимости от того какая кнопка нажата
const popupHandler = function (event) {
  const name = document.querySelector('.popup__input_type_name');
  const job = document.querySelector('.popup__input_type_link-url');
  if (event.target.classList.contains('user-info__edit-button')) {
    name.setAttribute('placeholder', 'Имя');
    job.setAttribute('placeholder', 'О себе');
    job.setAttribute('name', 'about');
  };
  if (event.target.classList.contains('user-info__button')) {
    name.setAttribute('placeholder', 'Название');
    job.setAttribute('placeholder', 'Ссылка на картинку');
    job.setAttribute('name', 'link');
  };
  popupToggle();
};

// метод добавляет новую карточку
const addNewCard = function(event) {
  event.preventDefault();
  const { name, link } = form.elements;
  if (name.value.length !== 0 || link.value.length !== 0) {
    addCard(name.value, link.value);
    popupToggle();
    form.reset();
  };
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
  const { name, about } = form.elements;
  if (name.value.length !== 0 || about.value.length !== 0) {
    changeInfo(name.value, about.value);
    popupToggle();
    form.reset();
  };
};

// метод - обработчик для лайков и удаления карточек
const cardHandler = function(event) {
  if (event.target.classList.contains('place-card__like-icon'))
    return event.target.classList.toggle('place-card__like-icon_liked');
  if (event.target.classList.contains('place-card__delete-icon'))
    return places.removeChild(event.target.closest('div.place-card'));
};

// метод - обработчик форм, который запускает определенное функциональное выражение
// в зависимости от того, меняется ли имя на странице или добавляется новая карточка
const formHandler = function(event) {
  const attribute = event.target.children[1].getAttribute('placeholder');

  if (attribute === 'О себе')
    changeNameAndJob(event);
  if (attribute === 'Ссылка на картинку')
      addNewCard(event);
};

// слушатель события реализует функцию ставить лайки карточкам
places.addEventListener('click', cardHandler);

// слушатель события при открытии формы вызывает функцию popupToggle (добавление класса для открытия формы)
addCardButton.addEventListener('click', popupHandler);

// слушатель события при закрытии формы вызывает функцию popupToggle (удаление класса для закрытия формы)
closePopupButton.addEventListener('click', popupToggle);

// слушатель события при отправке формы вызывает функцию, которая добавляет новую не пустую карточку в разметку и закрывает форму
form.addEventListener('submit', formHandler);

editInfoButton.addEventListener('click', popupHandler);

// метод добавляет стартовые карточки в разметку
addStartCards();