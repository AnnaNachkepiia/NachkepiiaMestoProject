/* const formObj = {
    formSelector: '.popup__form-container',
    inputSelector: '.popup__edit-form',
    submitButtonSelector: '.popup__submit',
    submitButtonDisabled: '.popup__submit-disabled',
    errorClass: '.popup_edit-form-error',
    errorClassActive: '.popup_edit-form-error_active'
}

const showErrorMessage = (formElement, inputElement, errorMessage) => {
    // const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    const errorElement = inputElement
        .closest(formObj.formSelector)
        .querySelector(formObj.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formObj.errorClassActive);
};

const hideErrorMessage = (formElement, inputElement, formObj) => {
    // const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    const errorElement = inputElement
        .closest(formObj.formSelector)
        .querySelector(formObj.errorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(formObj.errorClassActive);
    console.log(errorElement);
};


const checkValidity = (formElement, inputElement, formObj) => {
    const isInputNoValid = !inputElement.validity.valid;
    console.log(inputElement.name, isInputNoValid, inputElement.validity);

    if (isInputNoValid) {
        const errorMessage = inputElement.validationMessage;
        showErrorMessage(formElement, inputElement, errorMessage, formObj);
        /* Нужно написать две функции hide и show 
} else {
    hideErrorMessage(formElement, inputElement, formObj);
}
}

const setEventListeners = (formElement, formObj) => {
    const inputs = Array.from(formElement.querySelectorAll(formObj.inputSelector));
    inputs.forEach(inputElement => {
        inputElement.addEventListener('input', function(evt) {
            checkValidity(formElement, inputElement, formObj);
        });
    });
};

const enableValidation = (formObj) => {
    const forms = Array.from(document.querySelectorAll(formObj.formSelector));
    forms.forEach(formElement => {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault()
        });
        setEventListeners(formElement, formObj);

    });

};
enableValidation(formObj);  */