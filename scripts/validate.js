const formObj = {
    formSelector: '.popup__form-container',
    inputSelector: '.popup__edit-form',
    submitButtonSelector: '.popup__submit',
    submitButtonDisabled: '.popup__submit-disabled',
    errorClass: '.popup_form-error',
    errorClassActive: '.popup_form-error_active'
}


// const inputs = Array.from(form.querySelectorAll(inputSelector));
//         inputs.forEach(input => {
//             input.addEventListener('input', function(evt) {
//                 if (input.validity.valid) {


//                 } else {
//                     const inputName = input.getAttribute('name');
//                     const errorPlace = document.getElementById(`${inputName}-error`);
//                     errorPlace.textContent = input.validationMessage;
//                     errorPlace.classList.add(errorClassActive);
//                 }
//             })
//         })
const showErrorMessage = (formElement, inputElement, errorMessage) => {
    const errorElement = inputElement
        .closest('.popup__form-container')
        .querySelectorAll('.popup_form-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup_form-error_active');
};

const hideErrorMessage = (formElement, inputElement) => {
    const errorElement = inputElement
        .closest('.popup__form-container')
        .querySelectorAll('.popup_form-error');
    errorElement.textContent = "";
    // errorElement.classList.remove('popup_form-error_active');
};


const checkValidity = (formElement, inputElement) => {
    const isInputNoValid = inputElement.validity.valid;
    if (isInputNoValid) {
        const errorMessage = inputElement.validationMessage;
        showErrorMessage(formElement, inputElement, errorMessage);
        /* Нужно написать две функции hide и show */
    } else {
        hideErrorMessage(formElement, inputElement);
    }
}

const setEventListeners = (formElement) => {
    const inputs = Array.from(formElement.querySelectorAll('.popup__edit-form'));
    inputs.forEach(inputElement => {
        inputElement.addEventListener('input', function(evt) {
            checkValidity(formElement, inputElement);
        });
    });

};

const enableValidation = () => {
    const forms = Array.from(document.querySelectorAll('.popup__form-container'));
    forms.forEach(formElement => {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault()
        });
        setEventListeners(formElement);

    });

};
enableValidation();