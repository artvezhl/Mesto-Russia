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

export {popupContainer, editInfoButton, addCardButton, userName, userAbout, userAva, apiConfig}