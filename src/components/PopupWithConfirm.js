import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
    constructor(popup) {
        super(popup);
        this._popupForm = this._popup.querySelector(".popup__form-container");

    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
            this.closePopup();
        });
    }
}