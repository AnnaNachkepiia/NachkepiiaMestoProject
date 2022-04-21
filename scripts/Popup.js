export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _closeByEscape(event) {
        if (event.key === "Escape") {
            const popupIsOpened = document.querySelector(".popup_is-opened");
            this.closePopup(popupIsOpened);
        }
    };

    _closePopupOverlay(event) {
        if (event.target !== event.currentTarget) {
            return;
        }
        this.closePopup();
    };

    openPopup() {
        this._popup.classList.add("popup_is-opened");
        document.addEventListener("keydown", this._closeByEscape);
    }

    closePopup() {
        this._popup.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this._closeByEscape);

    }

    setEventListeners() {
        this._popup.addEventListener('click', this._closePopupOverlay);
        this._popup.querySelector('.popup__close').addEventListener('click', this.closePopup);
    }
}