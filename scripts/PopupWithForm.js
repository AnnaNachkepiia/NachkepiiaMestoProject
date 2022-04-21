import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._popupForm = document.querySelector('.popup__form-container');
        this._inputList = this._form.querySelectorAll('.popup__edit-form');
        this._formSubmit = formSubmit;

    }

    close() {
        super.close();
        this._popupForm.reset();
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => { this._formValues[input.name] = input.value });
        return this._formValues;
    }

    _handleFormSubmit(evt) {
        evt.preventDefault();
        this._formSubmit(this._getInputValues);

        this.closePopup();
    };



    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._handleFormSubmit);
    }
}