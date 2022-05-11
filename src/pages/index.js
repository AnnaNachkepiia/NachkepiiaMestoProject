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
    nameInput,
    jobInput,
    profileTitle,
    profileSubtitle,
    listCards,
    formObj,
    profileAvatar,
} from "../utils/Consts.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/Userinfo.js";
import { Api } from "../components/API";

const editProfileValidator = new FormValidator(formObj, popupFormElement);
const addCardValidator = new FormValidator(formObj, popupAddFormElement);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// Запрос на сервер

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40/',
    headers: {
        authorization: 'a21500ca-3216-4c89-8f3a-5037d5204e6f',
        'Content-Type': 'application/json'
    }
});



// Информация профиля на странице


const profileInfo = new UserInfo({
    userNameSelector: profileTitle,
    userInfoSelector: profileSubtitle,
    userAvatarSelector: profileAvatar,
});

// const profileInfo = new UserInfo({
//     userNameSelector: profileTitle,
//     userInfoSelector: profileSubtitle,
// });

// Попап формы редактирования профиля

const popupEdit = new PopupWithForm(popupEditElement, {
    handleFormSubmit: (data) => {
        profileInfo.setUserInfo(data);
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

// Попап формы добавления карточки

const newCardPopup = new PopupWithForm(popupAddElement, {
    handleFormSubmit: (data) => {
        cardSection.addItem(renderCard(data));
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
    handleFormSubmit: () => {}
})
updateAvatarPopup.setEventListeners();

// Открытие попапа редактирование аватара

function openPopupUpdate() {
    popupUpdateAvatarElement.openPopup();
};

popupUpdateButtonElement.addEventListener("click", openPopupUpdate);



// Открытие попапа с картинкой

const picturePopup = new PopupWithImage(popupImgElement);

const handleImageClick = (name, link) => {
    picturePopup.openPopup(name, link);
};
picturePopup.setEventListeners();


// Функция добавления новой карточки

const renderCard = (data) => {
    const placeCard = new Card(data, "#cardTemplate", handleImageClick);
    const newCard = placeCard.generateCard();
    return newCard;
};

// Рендер начальных карточек

api
    .getInitialCards()
    .then((data) => {
        const cardSection = new Section({
                items: data,
                renderer: (item) => {
                    cardSection.addItem(renderCard(item));
                },
            },
            listCards
        );
        cardSection.renderElements();
    })
    .catch((err) => alert(err))

api
    .getUserData()
    .then((data) => {
        profileInfo.setUserInfo(data);
        profileInfo.setUserAvatar(data.avatar)
    })
    .catch((err) => alert(err))