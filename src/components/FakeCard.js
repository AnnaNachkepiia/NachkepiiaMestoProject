export class Card {
    constructor(data, userId,
        templateSelector, { handleImageClick, handleCardLike, handleCardDelete },
    ) {
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._likes = data.likes;
        this._ownerId = data.ownerId;
        this._userId = userId;
        this._template = document.querySelector(templateSelector).content;
        this._handleImageClick = handleImageClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this.setLikesInfo = this.setLikesInfo.bind(this);
        this.cardIsLiked = this.cardIsLiked.bind(this);
        // this._api = api;
        // this.deleteYourCard = this.deleteYourCard.bind(this);
    }

    _getCardElement() {
        this._placeCard = this._template.querySelector(".place").cloneNode(true);
        return this._placeCard;
    }


    setLikesInfo(data) {
        this._likes = data.likes;
        this.countLikes();
    }

    _addLikeIcon() {
        this._likeButton.classList.add("place__like-button_active");
    };

    _removeLikeIcon() {
        this._likeButton.classList.remove("place__like-button_active");
    };

    deleteYourCard() {
        this._placeCard.remove();
        this._placeCard = null;
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", () => this._handleCardLike(this._cardId));
        this._deleteButton.addEventListener("click", () =>
            this._handleCardDelete(this._cardId)
        );
        this._placeImageElement.addEventListener("click", () =>
            this._handleImageClick(this._name, this._link)
        );
    }


    // cardIsLiked = () => {
    //     const cardLiked = this._likeButton.classList.contains(
    //         "place__like-button_active"
    //     );
    //     return cardLiked;
    // };

    cardIsLiked = () => {
        const liked = this._likes.some((user) => user._id === this._userId);
        return liked;
    }

    countLikes(Likes) {
            this._likes = Likes;

            if (this.cardIsLiked()) {
                this._likeButton.classList.add("place__like-button_active");
            } else {
                this._likeButton.classList.remove("place__like-button_active");
            }

            this._likeNumber.textContent = this._likes.length;
        }
        // _countLikes() {
        //     if (!this.cardIsLiked()) {
        //         this._api
        //             .likeHandler(this._cardId)
        //             .then((data) => {
        //                 this._addLikeIcon(data.likes);
        //                 this._likeNumber.textContent = data.likes.length;
        //             })
        //             .catch((err) => console.log(err));

    //     } else {
    //         this._api
    //             .deleteLikeHandler(this._cardId)
    //             .then((data) => {
    //                 this._removeLikeIcon(data.likes);
    //                 this._likeNumber.textContent = data.likes.length;
    //             })
    //             .catch((err) => console.log(err));
    //     }
    // }
    _addDeleteButton() {
        if (this._ownerId !== this._userId) {
            this._deleteButton.style.display = "none";
        }
    }

    _fillDataCard() {
        this._placeTitle.textContent = this._name;
        this._placeImageElement.src = this._link;
        this._placeImageElement.alt = this._name;
        this.countLikes(this._likes);
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
        this._likeNumber = this._placeCard.querySelector(".place__like-counter");

        this._addDeleteButton();
        this._fillDataCard();
        // if (this._likes.map(item => item._id).includes(this._userId)) {
        //     this._addLikeIcon();
        // }
        this.countLikes(this._likes);

        this._setEventListeners();
        return this._placeCard;
    }
}