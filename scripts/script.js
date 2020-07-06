// создание переменных для слушателей
const popupContainer = document.querySelector('.popup-container');
const editInfoButton = document.querySelector('.user-info__edit-button');
const addCardButton = document.querySelector('.user-info__button');
const userName = document.querySelector('.user-info__name');
const userAbout = document.querySelector('.user-info__job');
const userAva = document.querySelector('.user-info__photo');
const apiConfig = {
    baseUrl: 'https://praktikum.tk/cohort11',
    headers: {
        authorization: '6a4cb1c5-9817-4f1e-b991-c86219eada0b',
        'Content-Type': 'application/json'
    }
}

// создание экземпляра класса Api
const api = new Api(apiConfig);

// создание экземпляра класса FormValidator
const formValidator = (...arg) => new FormValidator(...arg);

// создание экземпляра класса ImagePopup
const imagePopup = new ImagePopup(popupContainer);

// создание экземпляра класса UserInfo
const userInfo = new UserInfo(userName, userAbout);

// создание экземпляра класса AddCardPopup
const editInfoPopup = new EditInfoPopup(popupContainer, userInfo, formValidator, api);

// создание экземпляра класса Card без аргументов
const createCard = (...arg) => new Card(...arg);

// создание экземпляра Cardlist
const cardList = new Cardlist(document.querySelector('.places-list'), createCard, imagePopup.open, api);

// создание экземпляра класса AddCardPopup
const addCardPopup = new AddCardPopup(popupContainer, cardList, formValidator, api);

// слушатели событий
editInfoButton.addEventListener('click', editInfoPopup.open);
addCardButton.addEventListener('click', addCardPopup.open);


Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
    .then((values) => {
        const [userData, initialCards] = values;
        // отрисовка начальных имени, инфо и аватарки
        userInfo.renderDefaultInfo(userData);
        // отрасовка начальных карточек
        cardList.render(initialCards);
    })
    .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
    })

/*
  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/