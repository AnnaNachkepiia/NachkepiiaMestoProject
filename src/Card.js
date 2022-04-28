export class Card {

    constructor(data, templateSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = document
            .querySelector(templateSelector)
            .content;
        this._handleImageClick = handleImageClick;
    }

    _handleLikeIcon = () => {
        this._likeButton.classList.toggle("place__like-button_active")
    }

    _deleteCard = () => {
        this._placeCard.remove();
        this._placeCard = null;
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", this._handleLikeIcon);
        this._deleteButton.addEventListener("click", this._deleteCard);
        this._placeImageElement.addEventListener("click", () => this._handleImageClick(this._name, this._link));
    }

    _getCardElement() {
        this._placeCard = this._templateSelector
            .querySelector(".place")
            .cloneNode(true);
        return this._placeCard;
    }

    generateCard() {
        this._getCardElement();
        this._placeImageElement = this._placeCard.querySelector(".place__image");
        this._placeTitle = this._placeCard.querySelector(".place__title");

        this._placeTitle.textContent = this._name;
        this._placeImageElement.src = this._link;
        this._placeImageElement.alt = this._name;


        this._likeButton = this._placeCard.querySelector(".place__like-button");
        this._deleteButton = this._placeCard.querySelector(".place__delete-button");

        this._setEventListeners();

        return this._placeCard;
    }
}