import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupImage = this._popup.querySelector(".popup__fulled-img");
        this._popupImageCaption = this._popup.querySelector(
            ".popup__picture-title"
        );
    }

    openPopup(name, link) {
        super.openPopup();
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupImageCaption.textContent = name;
    }
}