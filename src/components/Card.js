export class Card {
    constructor(data,
        userId,
        templateSelector, { handleImageClick, handleLikeClick, handleCardDelete }
    ) {
        this._id = data._id;
        this._userId = userId;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._handleImageClick = handleImageClick;
        this._handleLikeClick = handleLikeClick;
        this._handleCardDelete = handleCardDelete;
        this._template = document.querySelector(templateSelector).content;

    }

    _getCardElement() {
        this._placeCard = this._template.querySelector(".place").cloneNode(true);
        return this._placeCard;
    }

    userLike() {
        const liked = this._likes.some((user) => user._id === this._userId);
        return liked;
    }

    handleLike(like) {
        this._likes = like;

        if (this.userLike()) {
            this._likeButton.classList.add("place__like-button_active");
        } else {
            this._likeButton.classList.remove("place__like-button_active");
        }

        this._likeNumber.textContent = this._likes.length;
    }

    deleteYourCard() {
        this._placeCard.remove();
        this._placeCard = null;
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", () =>
            this._handleLikeClick(this._id)
        );

        this._deleteButton.addEventListener("click", () =>
            this._handleCardDelete(this._id)
        );

        this._placeImageElement.addEventListener("click", () =>
            this._handleImageClick(this._name, this._link)
        );
    }

    _setDataCard() {
        this._placeTitle.textContent = this._name;
        this._placeImageElement.src = this._link;
        this._placeImageElement.alt = this._name;
        this.handleLike(this._likes);
    }

    _addDeleteButton() {
        if (this._ownerId !== this._userId) {
            this._deleteButton.style.display = "none";
        }
    }

    generateCard() {
        this._getCardElement();

        this._placeImageElement = this._placeCard.querySelector(".place__image");
        this._placeTitle = this._placeCard.querySelector(".place__title");

        this._likeButton = this._placeCard.querySelector(".place__like-button");
        this._deleteButton = this._placeCard.querySelector(".place__delete-button");
        this._likeNumber = this._placeCard.querySelector(".place__like-counter");

        this._addDeleteButton();
        this._setDataCard();
        this.handleLike(this._likes);
        this._setEventListeners();

        return this._placeCard;
    }
}