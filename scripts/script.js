import "../pages/index.css";

const apiConfig = {
  baseUrl: 'https://praktikum.tk/cohort11',
  headers: {
    authorization: '6a4cb1c5-9817-4f1e-b991-c86219eada0b',
    'Content-Type': 'application/json'
  }
}
const userName = document.querySelector('.user-info__name');
const userAbout = document.querySelector('.user-info__job');
const userAva = document.querySelector('.user-info__photo');

const getUserInfo = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers
  })
    .then(res => this._getResponseData(res));
}

const renderDefaultInfo = (data) => {
  userName.textContent = data.name;
  userAbout.textContent = data.info;
  userAva.style.backgroundImage = `url(${data.ava})`;
}



Promise.all([
    getUserInfo()
    // api.getInitialCards()
])
    .then((data) => {
        // const [userData, initialCards] = values;
        // отрисовка начальных имени, инфо и аватарки
        renderDefaultInfo(data);
        // отрасовка начальных карточек
        // cardList.render(initialCards);
    })
    .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
    })


// // импорт переменных
// import {popupContainer, editInfoButton, addCardButton, userName, userAbout, userAva, addCardTemplate, avatarTemplate, cardTemplate, editInfoTemplate, imageTemplate, apiConfig} from "./variables.js";
//
// // импорт модуля класса Api
// import {Api} from './Api.js';
// // создание экземпляра класса Api
// const api = new Api(apiConfig);
//
// // импорт модуля класса FormValidator
// import {FormValidator} from "./FormValidator.js";
// // создание экземпляра класса FormValidator
// const formValidator = (...arg) => new FormValidator(...arg);
//
// // импорт модуля класса ImagePopup
// import {ImagePopup} from "./Image-popup.js";
// // создание экземпляра класса ImagePopup
// const imagePopup = new ImagePopup(popupContainer, imageTemplate);
//
// // импорт модуля класса UserInfo
// import {UserInfo} from "./UserInfo.js";
// // создание экземпляра класса UserInfo
// const userInfo = new UserInfo(userName, userAbout, userAva);
//
// // импорт модуля класса EditInfoPopup
// import {EditInfoPopup} from "./EditInfoPopup.js";
// // создание экземпляра класса AddCardPopup
// const editInfoPopup = new EditInfoPopup(popupContainer, editInfoTemplate, userInfo, formValidator, api);
//
// // импорт модуля класса Card
// import {Card} from "./Card.js";
// // создание экземпляра класса Card без аргументов
// const createCard = (...arg) => new Card(...arg);
//
// // импорт модуля класса Cardlist
// import {Cardlist} from "./Cardlist.js";
// // создание экземпляра Cardlist
// const cardList = new Cardlist(document.querySelector('.places-list'), createCard, cardTemplate, imagePopup.open, api);
//
// // импорт модуля класса AddCardPopup
// import {AddCardPopup} from "./AddCardPopup.js";
// // создание экземпляра класса AddCardPopup
// const addCardPopup = new AddCardPopup(popupContainer, cardList, addCardTemplate, formValidator, api);
//
// // импорт модуля класса AvatarPopup
// import {AvatarPopup} from "./AvatarPopup.js";
// //создание экземпляра класса AvatarPopup
// const avaPopup = new AvatarPopup(popupContainer, userInfo, avatarTemplate, formValidator, api);
//
// // слушатели событий
// editInfoButton.addEventListener('click', editInfoPopup.open);
// addCardButton.addEventListener('click', addCardPopup.open);
// userAva.addEventListener('click', avaPopup.open);
//
// console.log(api);
//
// Promise.all([
//     api.getUserInfo(),
//     api.getInitialCards()
// ])
//     .then((values) => {
//         const [userData, initialCards] = values;
//         // отрисовка начальных имени, инфо и аватарки
//         userInfo.renderDefaultInfo(userData);
//         // отрасовка начальных карточек
//         cardList.render(initialCards);
//     })
//     .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
//         console.log(err);
//     })

/*
  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/