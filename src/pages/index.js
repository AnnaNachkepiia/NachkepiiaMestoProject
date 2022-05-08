import "./index.css";
import {
    initialCards,
    popupEditElement,
    popupAddElement,
    popupImgElement,
    popupUpdateAvatarElement,
    popupOpenAddButttonElement,
    popupOpenButtonElement,
    popupFormElement,
    popupAddFormElement,
    nameInput,
    jobInput,
    profileTitle,
    profileSubtitle,
    listCards,
    formObj,
} from "../utils/Consts.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/Userinfo.js";

const editProfileValidator = new FormValidator(formObj, popupFormElement);
const addCardValidator = new FormValidator(formObj, popupAddFormElement);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// Информация профиля на странице

const profileInfo = new UserInfo({
    userNameSelector: profileTitle,
    userInfoSelector: profileSubtitle,
});

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

// const updateAvatarPopup = new PopupWithForm(popupUpdateAvatarElement, {
//         handleFormSubmit: (data)})

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

const cardSection = new Section({
        items: initialCards,
        renderer: (data) => {
            const cardItem = renderCard(data);
            cardSection.addItem(cardItem);
        },
    },
    listCards
);
cardSection.renderElements();