import {
    initialCards,
    popupEditElement,
    popupAddElement,
    popupImgElement,
    popupOpenAddButttonElement,
    popupOpenButtonElement,
    popupAddFormElement,
    nameInput,
    jobInput,
    cardNameInput,
    cardLinkInput,
    profileTitle,
    profileSubtitle,
    listCards,
    editProfileValidator,
    addCardValidator
} from '../../scripts/Consts.js'

import { Card } from '../../scripts/Card.js'
import { Section } from '../../scripts/Section.js'
import { PopupWithForm } from '../../scripts/PopupWithForm.js'
import { PopupWithImage } from '../../scripts/PopupWithImage.js'
import { UserInfo } from '../../scripts/Userinfo.js'

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// Информация профиля на странице

const profileInfo = new UserInfo({
    userNameSelector: profileTitle,
    userInfoSelector: profileSubtitle,
})

// Попап формы редактирования профиля

const popupEdit = new PopupWithForm(
    popupEditElement, {
        handleFormSubmit: (data) => {
            profileInfo.setUserInfo({ data });
        }
    })
popupEdit.setEventListeners();

// Функция открытия попапа профиля

const openPopupEdit = () => {
    const userInfo = profileInfo.getUserInfo();
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.about;

    popupEdit.openPopup();
}

popupOpenButtonElement.addEventListener("click", openPopupEdit);

// Попап формы добавления карточки

const newCardPopup = new PopupWithForm(
    popupAddElement, {
        handleFormSubmit: (data) => {
            data.name = cardNameInput.value;
            data.link = cardLinkInput.value;
            cardSection.addItem(renderCard(data));
        }
    })
newCardPopup.setEventListeners();

// Функция открытия попапа добавления карточки

function openPopupAdd() {
    popupAddFormElement.reset();
    addCardValidator.disableSubmitButton();
    newCardPopup.openPopup();
}
popupOpenAddButttonElement.addEventListener("click", openPopupAdd);

// Открытие попапа с картинкой

const picturePopup = new PopupWithImage(popupImgElement);

const handleImageClick = (name, link) => {
    picturePopup.openPopup(name, link);
    picturePopup.setEventListeners()
};

// Функция добавления новой карточки

const renderCard = (data) => {
    const placeCard = new Card(data, '#cardTemplate', handleImageClick);
    const newCard = placeCard.generateCard()
    return newCard;
}

// Рендер начальных карточек

const cardSection = new Section({
    items: initialCards,
    renderer: (data) => {
        const cardItem = renderCard(data);
        cardSection.addItem(cardItem);
    }
}, listCards)
cardSection.renderElements();