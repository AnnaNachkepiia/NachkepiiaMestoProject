import "./index.css";
import {
    initialCards,
    popupEditElement,
    popupAddElement,
    popupImgElement,
    popupUpdateAvatarElement,
    popupOpenAddButttonElement,
    popupOpenButtonElement,
    popupUpdateButtonElement,
    popupFormElement,
    popupAddFormElement,
    popupEditAvatarFormElement,
    nameInput,
    jobInput,
    profileTitle,
    profileSubtitle,
    listCards,
    formObj,
    profileAvatar,
    popupConfirmElement,
} from "../utils/Consts.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/Userinfo.js";
import { Api } from "../components/API.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";

const editProfileValidator = new FormValidator(formObj, popupFormElement);
const addCardValidator = new FormValidator(formObj, popupAddFormElement);
const editAvatarValidator = new FormValidator(formObj, popupEditAvatarFormElement);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatarValidator.enableValidation();

// Запрос на сервер

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-40/",
    headers: {
        authorization: "a21500ca-3216-4c89-8f3a-5037d5204e6f",
        "Content-Type": "application/json",
    },
});


let userId;


// Информация профиля на странице

const profileInfo = new UserInfo({
    userNameSelector: profileTitle,
    userInfoSelector: profileSubtitle,
    userAvatarSelector: profileAvatar,
});

// Попап формы редактирования профиля

const popupEdit = new PopupWithForm(popupEditElement, {
    handleFormSubmit: (data) => {
        popupEdit.showLoadingMessage(true);
        api
            .editUserData(data)
            .then((data) => {
                profileInfo.setUserInfo(data);
            })
            .finally(() => {
                popupEdit.showLoadingMessage(false);
            });
    },
});
popupEdit.setEventListeners();

// Функция открытия попапа профиля

const openPopupEdit = () => {
    const userInfo = profileInfo.getUserInfo();
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.about;
    popupEdit.openPopup();
};

popupOpenButtonElement.addEventListener("click", openPopupEdit);

// Попап подтверждения удаления карточки
const popupConfirm = new PopupWithConfirm(popupConfirmElement);

popupConfirm.setEventListeners();

// Попап формы добавления карточки

const cardSection = new Section({
        items: [],
        renderer: (item) => {
            cardSection.addItem(renderCard(item));
        },
    },
    listCards
);

const newCardPopup = new PopupWithForm(popupAddElement, {
    handleFormSubmit: (data) => {
        newCardPopup.showLoadingMessage(true);
        api
            .addNewCard(data)
            .then((item) => {
                cardSection.addItem(
                    renderCard({
                        name: item.name,
                        link: item.link,
                        likes: item.likes,
                        id: item._id,
                        userId: userId,
                        ownerId: item._ownerId,
                    })
                );
            })

        .finally(() => {
            newCardPopup.showLoadingMessage(false);
        });
    },
});
newCardPopup.setEventListeners();

// Функция открытия попапа добавления карточки

function openPopupAdd() {
    addCardValidator.disableSubmitButton();
    newCardPopup.openPopup();
}
popupOpenAddButttonElement.addEventListener("click", openPopupAdd);

// Попап редактирования аватара

const updateAvatarPopup = new PopupWithForm(popupUpdateAvatarElement, {
    handleFormSubmit: (item) => {
        updateAvatarPopup.showLoadingMessage(true);
        api
            .editUserAvatar(item)
            .then((res) => {
                console.log(res);

                profileInfo.setUserAvatar(res.avatar);
            })
            .finally(() => {
                updateAvatarPopup.showLoadingMessage(false);
            });
    },
});
updateAvatarPopup.setEventListeners();

// Открытие попапа редактирование аватара

function openPopupUpdate() {
    updateAvatarPopup.openPopup();
}

popupUpdateButtonElement.addEventListener("click", openPopupUpdate);

// Открытие попапа с картинкой

const picturePopup = new PopupWithImage(popupImgElement);

const handleImageClick = (name, link) => {
    picturePopup.openPopup(name, link);
};
picturePopup.setEventListeners();

// Функция добавления новой карточки

const renderCard = (data) => {
    const placeCard = new Card("#cardTemplate", {
        userId: userId,
        data: data,
        handleImageClick: handleImageClick,
        handleCardDelete: () => {
            popupConfirm.openPopup();
            popupConfirm.confirmHandler(() => {
                api
                    .deleteCard(data.id)
                    .then(() => {
                        placeCard.deleteYourCard()
                    })
                    .catch((err) => console.log(err))

            });


        },
        // handleCardLike: () => {
        //     if (placeCard.cardIsLiked()) {
        //         api
        //             .deleteLikeHandler(data._id)
        //             .then((data) => {
        //                 placeCard.countLikes(data.likes)
        //             })
        //             .catch((err) => console.log(err))
        //     } else {
        //         api
        //             .likeHandler(data._id)

        //         .then((data) => {
        //                 placeCard.countLikes(data.likes)
        //             })
        //             .catch((err) => console.log(err))

        //     }
        // }
    }, api);

    const newCard = placeCard.generateCard();
    return newCard;
};


// Рендер начальных карточек

api
    .getInitialCards()
    .then((data) => {
        const cardSection = new Section({
                items: data,
                renderer: (data) => {
                    cardSection.addItem(
                        renderCard({
                            name: data.name,
                            link: data.link,
                            likes: data.likes,
                            id: data._id,
                            userId: userId,
                            ownerId: data.owner._id,
                        })
                    );
                },
            },
            listCards
        );
        cardSection.renderElements();
    })
    .catch((err) => console.log(err));

//Отрисовка данных пользователя на странице
api
    .getUserData()
    .then((data) => {
        profileInfo.setUserInfo(data);
        profileInfo.setUserAvatar(data.avatar);
        userId = data._id;
    })
    .catch((err) => console.log(err));