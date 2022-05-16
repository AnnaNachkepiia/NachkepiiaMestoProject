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
                popupEdit.closePopup();
            })
            .catch((err) => console.log(err))
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
        renderer: (item) => {
            cardSection.addItem(renderCard(item));
        }
    },
    listCards
);

const newCardPopup = new PopupWithForm(popupAddElement, {
    handleFormSubmit: (data) => {
        newCardPopup.showLoadingMessage(true);
        api
            .addNewCard(data)
            .then((data) => {
                cardSection.addItem(
                    renderCard(data));
                newCardPopup.closePopup();
            })
            .catch((err) => console.log(err))
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
                profileInfo.setUserInfo(res);
                updateAvatarPopup.closePopup()
            })
            .catch((err) => console.log(err))
            .finally(() => {
                updateAvatarPopup.showLoadingMessage(false);
            });

    },
});
updateAvatarPopup.setEventListeners();

// Открытие попапа редактирование аватара

function openPopupUpdate() {
    editAvatarValidator.disableSubmitButton();
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
    const placeCard = new Card(data, userId, "#cardTemplate", {
        handleImageClick: handleImageClick,

        handleLikeClick: (id) => {
            if (placeCard.userLike()) {
                api
                    .deleteLikeHandler(id)
                    .then((data) => placeCard.handleLike(data.likes))
                    .catch((err) => console.log(err));
            } else {
                api
                    .likeHandler(id)
                    .then((data) => placeCard.handleLike(data.likes))
                    .catch((err) => console.log(err));
            }
        },

        handleCardDelete: (id) => {
            popupConfirm.openPopup();
            popupConfirm.confirmHandler(() => {
                api
                    .deleteCard(id)
                    .then(() => {
                        placeCard.deleteYourCard();
                        popupConfirm.closePopup();
                    })
                    .catch((err) => console.log(err))

            });


        },
    }, api);

    const newCard = placeCard.generateCard();
    return newCard;
};


// Рендер начальных карточек

api
    .getInitialData()
    .then(([userData, item]) => {
        userId = userData._id;
        profileInfo.setUserInfo(userData);
        cardSection.renderItems(item);
    })
    .catch((err) => console.log(err));