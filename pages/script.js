const places = document.querySelector('.places-list');
const popups = document.querySelectorAll('.popup');
const addCardButton = document.querySelector('.user-info__button');
const newCardForm = document.forms.new;
const editForm = document.forms.edit;
const editInfoButton = document.querySelector('.user-info__edit-button');

// функциональное выражение создает разметку карточек и возвращает эту разметку

/*Надо исправить: Стоит обратить внимание, что вставка данных с помощью интерполяции шаблонной строки и insertAdjacentHTML может привести к уязвимости XSS, т.к. данные вставляются на страницу как обычный html, а если они придут с сервера в данных может быть код злоумышленника и он будет вставлен на страницу как html и исполнится. Поэтому необходимо фильтровать html теги во вставляемых данных (такая процедура называется HTML sanitization пример как это сделать есть здесь
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

//Надо исправить: Сложная функция с дублированием кода.
/*
function popupToggle(popup) {
   popup.classList.toggle('popup_is-opened');
}
Стоит сократить так.
* */
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
        //Надо исправить: Используя parentElement мы сильно зависим от разметки, которая может измениться. Лучше использовать метод closest для поиска нужного нам родителя
        // https://learn.javascript.ru/searching-elements-dom
        //Так код выполниться корректно вне зависимости от уровня вложенности элемента, на котором произошло событие.
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
    //Можно лучше: Переменные стоит вынести из функции, чтобы при каждом вызове не искать элементы в DOM
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
        //Можно лучше: Логику внутри условий лучше вынести в отдельные функции с говорящими названиями.
        // Так логика будет разделена. Появится возможность переиспользовать код. А благодаря названиям функций код станет проще читать.
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
//Надо исправить: Функция работает некорректно. Для проверки валидации лучше воспользоваться встроенной HTML5 валидацией. Используем объект validity в условиях вместо собственных проверок.
// //https://developer.mozilla.org/ru/docs/Learn/HTML/Forms/%D0%92%D0%B0%D0%BB%D0%B8%D0%B4%D0%B0%D1%86%D0%B8%D1%8F_%D1%84%D0%BE%D1%80%D0%BC%D1%8B#API_%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B8_%D0%B2%D0%B0%D0%BB%D0%B8%D0%B4%D0%BD%D0%BE%D1%81%D1%82%D0%B8_HTML5
    if (!inputElem.checkValidity() && inputElem.value.length < 1) {
        errorElem.setAttribute('style', 'opacity: 1');
        errorElem.textContent = 'Это обязательное поле';
        //Можно лучше: Нам не нужно ничего возвращать из функции. Все return'ы можно удалить
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
    //Надо исправить: Функция не дизейблит поля. Всю, что нам нужно это узнать валидна форма или нет. И для этого у нас есть метод checkValidity().
    // Вся функция сводится к submitButton.disable = !form.checkValidity()
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
//Надо исправить: Функция должна работать точечно. Для этого передаем в неё форму и ищем ошибки только в ней.
function resetForm() {
    const crossButton = document.querySelectorAll('.popup__close');

    crossButton.forEach((elem) => {
        elem.addEventListener('click', function (event) {
            const errorElem = event.target.parentNode.querySelectorAll('.error-message');
            const form = event.target.parentNode.querySelector('.popup__form');
            errorElem.forEach((elem) => {
                //Можно лучше: Стилями стоит управлять в css. Тут лучше переключать класс.
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
        //Отлично: Функция обработчик сделана отлично.
        const input = event.target;
        //const error = input.nextElementSibling; так понятнее. Нашли инпут, дальше пляшем от него.
        const error = event.target.nextElementSibling;
        //const form = input.closest('.popup__form');
        const form = event.target.closest('.popup__form');
        checkInputValidity(input, error);
        setSubmitButtonState(form);
    })
}
//Надо исправить: Хардкодить все поля не нужно. Представьте, что в форме 50 полей. Или добавили ещё несколько. Мы не должны править из-за этого код.
//Функция setEventListeners должна динамически находить все инпуты в переданной форме и вешать обработчики.
setEventListeners(name);
setEventListeners(about);
setEventListeners(placeName);
setEventListeners(url);
//Надо исправить: При инициализации нам не нужно сбрасывать формы. Они и так пусты. Ошибки должны быть скрыты по умолчанию
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

//Можно лучше: В обработчиках стоит использовать коллбек функции, в которых проводить всю работу с event и вызывать необходимые нам функции.
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

// слушатель события при отправке формы вызывает функцию, которая
// изменяет имя и род деятельности в шапке
editForm.addEventListener('submit', changeNameAndJob);

// слушатель события при открытии формы вызывает функцию popupHandler
// в целях изменения информации вверху страницы о человеке и роде деятельности
editInfoButton.addEventListener('click', popupHandler.popupProfileToggle);

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
