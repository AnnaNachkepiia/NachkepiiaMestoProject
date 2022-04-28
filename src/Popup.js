export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._closeButton = this._popupSelector.querySelector('.popup__close');
        this._closeByEscape = this._closeByEscape.bind(this);
        this._closePopupOverlay = this._closePopupOverlay.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    _closeByEscape(evt) {
        if (evt.key === "Escape") {
            this.closePopup();
        }
    };

    _closePopupOverlay(evt) {
        if (evt.target.classList.contains("popup_is-opened")) {
            this.closePopup();
        };
    }

    openPopup() {
        this._popupSelector.classList.add("popup_is-opened");
        document.addEventListener("keydown", this._closeByEscape);
    }

    closePopup() {
        this._popupSelector.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this._closeByEscape);
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', this.closePopup);
        this._popupSelector.addEventListener('mousedown', this._closePopupOverlay);
    }
}