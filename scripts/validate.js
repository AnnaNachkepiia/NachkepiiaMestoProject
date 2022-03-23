const formObj = {
    formSelector: '.popup__form-container',
    inputSelector: '.popup__edit-form',
    submitButtonSelector: '.popup__submit',
    submitButtonDisabled: 'popup__submit-disabled',
    errorClass: 'popup_edit-form-error',
    errorClassActive: 'popup__edit-form-error_active'
}

const openErrorMessage = (formElement, inputElement, errorMessage, object) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(object.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(object.errorClassActive);
}

const hideErrorMessage = (formElement, inputElement, object) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(object.errorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(object.errorClassActive);
};

const checkValidity = (formElement, inputElement, object) => {
    if (!inputElement.validity.valid) {
        openErrorMessage(formElement, inputElement, inputElement.validationMessage, object);
    } else {
        hideErrorMessage(formElement, inputElement, object);
    };
};

const hasInvalidInput = (inputs) => {
    return inputs.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputs, buttonElement, object) => {
    if (hasInvalidInput(inputs)) {
        buttonElement.classList.add(object.submitButtonDisabled);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(object.submitButtonDisabled);
        buttonElement.removeAttribute('disabled');
    }
}

function setEventListeners(formElement, object) {
    const inputs = Array.from(formElement.querySelectorAll(object.inputSelector));
    const buttonElement = formElement.querySelector(object.submitButtonSelector);
    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement, object);
            toggleButtonState(inputs, buttonElement, object);
        });
    });
    toggleButtonState(inputs, buttonElement, object);
};

function enableValidation(object) {
    // Создание массива из форм
    const forms = Array.from(document.querySelectorAll(object.formSelector));
    forms.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, object);
    });
}
enableValidation(formObj);