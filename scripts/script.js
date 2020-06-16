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
const userInfo = new UserInfo(api, userName, userAbout);

// создание экземпляра класса AddCardPopup
const editInfoPopup = new EditInfoPopup(popupContainer, userInfo, formValidator, api);

// создание экземпляра класса Card без аргументов
const createCard = (...arg) => new Card(...arg);

// создание экземпляра Cardlist
const cardList = new Cardlist(document.querySelector('.places-list'), api.getInitialCards(), createCard, imagePopup.open);

// создание экземпляра класса AddCardPopup
const addCardPopup = new AddCardPopup(popupContainer, cardList, formValidator, api);

// слушатели событий
editInfoButton.addEventListener('click', editInfoPopup.open);
addCardButton.addEventListener('click', addCardPopup.open);

// отрисовка начальных имени, инфо и аватарки
userInfo.renderDefaultInfo();

// отрасовка начальных карточек
cardList.render();

/* DONE
    Неплохая работа, класс Api создан, запросы на сервер выполняются. Но к организации кода есть замечания:

    Надо исправить:
    - закрывать попап только если запрос на сервер выполнился успешно
    - небольшое замечание по прошлому спринту - в классе UserInfo передавать 
    элементы document.querySelector('.user-info__name')  document.querySelector('.user-info__job')
    как параметры конструктора класса, а не выполнять глобальный поиск на странице в классе

    Можно лучше: 
    - проверка ответа сервера и преобразование из json
    дублируется во всех методах класса Api, лучше вынести в отдельный метод
*/

/*
  Отлично, все замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/