class FormValidator {

    // Класс для валидации полей формы. Его конструктор должен принимать один из двух аргументов:
    //     элемент формы,
    //     или элемент попапа, внутри которого находится эта форма.
    constructor(form) {
        this._form = form;
    }

    // чтобы валидировать поля.
    // Метод показывает ошибку, если инпуты не проходят валидацию.
    // Если проходят — скрывает ошибку.
    checkInputValidity() {
        let inputsArray = [...this._form.elements];
        inputsArray.pop();
        inputsArray.forEach((input) => {
            const errorElem = input.nextElementSibling;
            input.setCustomValidity('');

            if (input.validity.valueMissing) {
                input.setCustomValidity('Это обязательное поле');
            }
            if (input.validity.tooShort || input.validity.tooLong) {
                input.setCustomValidity('Должно быть от 2 до 30 символов');
            }
            if (input.validity.typeMismatch) {
                input.setCustomValidity('Здесь должна быть ссылка');
            }
            errorElem.textContent = input.validationMessage;
        });

    }

    // чтобы делать кнопку сабмита активной и неактивной.
    // Состояние кнопки сабмита зависит от того, прошли все поля валидацию или нет.
    // Этот метод должен вызываться при любом изменении данных формы.
    // Если поля в порядке, кнопка становится активной.
    // Если одно из полей не прошло валидацию, или пользователь его не заполнил, — кнопка неактивна
    setSubmitButtonState() {
        const submitButton = this._form.querySelector('.button');
        submitButton.disabled = !this._form.checkValidity();
    }

    // чтобы добавлять обработчики.
    // Добавляет необходимые для валидации обработчики всем полям формы
    setEventListeners = () => {
        this._form.addEventListener('input', () => {
            this.checkInputValidity();
            this.setSubmitButtonState();
        });
    }
}