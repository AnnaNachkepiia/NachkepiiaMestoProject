export class Card {
    constructor(
        templateSelector, { userId, data, handleImageClick, handleCardDelete }, api
    ) {
        this._name = data.name;
        this._link = data.link;
        this._cardId = data.id;
        this._likes = data.likes;
        this._ownerId = data.ownerId;
        this._userId = userId;
        this._template = document.querySelector(templateSelector).content;
        this._handleImageClick = handleImageClick;
        this._handleCardDelete = handleCardDelete;
        // this._handleCardLike = handleCardLike;
        this._api = api;
        this.deleteYourCard = this.deleteYourCard.bind(this);
    }


    _addLikeIcon = () => {
        this._likeButton.classList.add("place__like-button_active");
    };

    _removeLikeIcon = () => {
        this._likeButton.classList.remove("place__like-button_active");
    };

    deleteYourCard() {
        this._placeCard.remove();
        this._placeCard = null;
    };

    _setEventListeners() {
        this._likeButton.addEventListener("click", () =>
            this._countLikes()
        );
        this._deleteButton.addEventListener("click", () =>
            this._handleCardDelete()
        );
        this._placeImageElement.addEventListener("click", () =>
            this._handleImageClick(this._name, this._link)
        );
    }

    _getCardElement() {
        this._placeCard = this._template.querySelector(".place").cloneNode(true);
        return this._placeCard;
    }

    // cardIsLiked = () => {
    //     const cardLiked = this._likes.some((user) => user._id === this._userId);
    //     return cardLiked;
    // };

    cardIsLiked = () => {
        const cardLiked = this._likeButton.classList.contains("place__like-button_active");
        return cardLiked;
    }

    // countLikes = (likes) => {
    //     if (!this.cardIsLiked()) {
    //         this.addLikeIcon();
    //     } else {
    //         this.removeLikeIcon();
    //     }
    //     this._likeNumber.textContent = likes.length;
    // };

    _countLikes() {
        if (!this.cardIsLiked()) {
            this._api
                .likeHandler(this._cardId)
                .then((data) => {
                    this._likeNumber.textContent = data.likes.length;
                })
                .catch((err) => console.log(err))
            this._addLikeIcon();
        } else {
            this._api
                .deleteLikeHandler(this._cardId)
                .then((data) => {
                    this._likeNumber.textContent = data.likes.length;
                })
                .catch((err) => console.log(err))
            this._removeLikeIcon();
        }
    }

    _addDeleteButton() {
        if (this._ownerId !== this._userId) {
            this._deleteButton.style.display =
                "none";
        }
    }

    generateCard() {
        this._getCardElement();
        this._placeImageElement = this._placeCard.querySelector(".place__image");
        this._placeTitle = this._placeCard.querySelector(".place__title");

        this._placeTitle.textContent = this._name;
        this._placeImageElement.src = this._link;
        this._placeImageElement.alt = this._name;

        this._likeButton = this._placeCard.querySelector(".place__like-button");
        this._likeNumber = this._template.querySelector(".place__like-counter");
        this._deleteButton = this._placeCard.querySelector(".place__delete-button");

        this._likeNumber.textContent = this._likes.length;

        this._addDeleteButton();

        this.cardIsLiked();

        // if (this._likes.map((item) => item._id).includes(this._userId)) {
        //     this._likeButton.classList.add("place__like-button_active");
        // }

        this._setEventListeners();

        return this._placeCard;
    }
}