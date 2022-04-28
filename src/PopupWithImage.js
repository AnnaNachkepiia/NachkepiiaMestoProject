import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupSelector.querySelector('.popup__fulled-img');
        this._popupImageCaption = this._popupSelector.querySelector('.popup__picture-title');
    }

    openPopup(name, link) {
        super.openPopup();
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupImageCaption.textContent = name;
    }
}