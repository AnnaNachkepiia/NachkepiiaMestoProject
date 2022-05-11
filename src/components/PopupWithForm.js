import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popup, { handleFormSubmit }) {
        super(popup);
        this._popupForm = this._popup.querySelector(".popup__form-container");
        this._inputList = this._popup.querySelectorAll(".popup__edit-form");
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._popup.querySelector(".popup__submit");
        this._submitButtonText = this._submitButton.textContent;
    }

    closePopup() {
        super.closePopup();
        this._popupForm.reset();
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.closePopup();
        });
    }
    showLoadingMessage(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = "Сохранение...";
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }
}