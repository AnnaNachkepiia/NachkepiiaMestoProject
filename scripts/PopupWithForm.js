import { Popup } from '../../scripts/Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._popupForm = document.querySelector('.popup__form-container');
        this._inputList = this._popupForm.querySelectorAll('.popup__edit-form');
        this._handleFormSubmit = handleFormSubmit;
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





    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.closePopup();
        });
    }
}