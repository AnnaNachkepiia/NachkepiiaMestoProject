import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
    constructor(popup) {
        super(popup);
        this._form = this._popup.querySelector(".popup__form-container");
    }

    confirmHandler = (act) => {
        this._newSubmit = act;
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._newSubmit();
            // this.closePopup();
        });
    }

    closePopup() {
        super.closePopup();
    }
}