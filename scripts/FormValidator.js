class FormValidator {

    // Класс для валидации полей формы. Его конструктор должен принимать один из двух аргументов:
    //     элемент формы,
    //     или элемент попапа, внутри которого находится эта форма.
    constructor(formElement) {
        this._formElement = formElement;
    }

    // чтобы валидировать поля.
    // Метод показывает ошибку, если инпуты не проходят валидацию.
    // Если проходят — скрывает ошибку.
    checkInputValidity() {

    }

    // чтобы делать кнопку сабмита активной и неактивной.
    // Состояние кнопки сабмита зависит от того, прошли все поля валидацию или нет.
    // Этот метод должен вызываться при любом изменении данных формы.
    // Если поля в порядке, кнопка становится активной.
    // Если одно из полей не прошло валидацию, или пользователь его не заполнил, — кнопка неактивна
    setSubmitButtonState() {

    }

    // чтобы добавлять обработчики.
    // Добавляет необходимые для валидации обработчики всем полям формы
    setEventListeners() {

    }
}


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