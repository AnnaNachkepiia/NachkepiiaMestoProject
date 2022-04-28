export class FormValidator {

    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
        this._inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);

    }

    _hasInvalidInput() {
        return this._inputs.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    disableSubmitButton() {
        const { submitButtonDisabledClass } = this._settings;

        this._buttonElement.classList.add(submitButtonDisabledClass);
        this._buttonElement.setAttribute('disabled', true);
    }

    _enableSubmitButton() {
        const { submitButtonDisabledClass } = this._settings;

        this._buttonElement.classList.remove(submitButtonDisabledClass);
        this._buttonElement.removeAttribute('disabled');
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton(this._buttonElement);
        } else {
            this._enableSubmitButton(this._buttonElement);
        }
    }

    _openErrorMessage(inputElement, errorMessage) {
        const { errorClass, errorClassActive } = this._settings;

        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(errorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClassActive);
    }

    _hideErrorMessage(inputElement) {
        const { errorClass, errorClassActive } = this._settings;

        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(errorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(errorClassActive);
    };


    _checkValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._openErrorMessage(inputElement, inputElement.validationMessage);
        } else {
            this._hideErrorMessage(inputElement);
        };
    };

    _setEventListeners() {
        this._toggleButtonState();
        this._inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkValidity(inputElement);
                this._toggleButtonState();
            });
        });

    };

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}