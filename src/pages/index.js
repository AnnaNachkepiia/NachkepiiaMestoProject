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

// Попап формы редактирования профиля

const popupEdit = new PopupWithForm(popupEditElement, {
    handleFormSubmit: (data) => {
        popupEdit.showLoadingMessage(true);
        api.editUserData(data)
            .then((data) => {
                profileInfo.setUserInfo(data);
            })
            .finally(() => {
                popupEdit.showLoadingMessage(false);
            })
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
        newCardPopup.showLoadingMessage(true);
        api.addNewCard(data)
            .then((data) => {
                const cardSection = new Section({
                    items: data,
                    renderer: (item) => {
                        cardSection.addItem(renderCard({
                            name: item.name,
                            link: item.link,
                            likes: item.likes,
                            id: item._id,
                            userId: userId,
                            ownerId: item.owner._id
                        }));
                    },
                }, listCards)
            })
            .finally(() => {
                newCardPopup.showLoadingMessage(false);
            })

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
        console.log(item);
        api.editUserAvatar(item)
            .then(() => {
                profileInfo.setUserAvatar(item);
            })
            .finally(() => {
                updateAvatarPopup.showLoadingMessage(false);
            })
    }
})
updateAvatarPopup.setEventListeners();

// Открытие попапа редактирование аватара

function openPopupUpdate() {
    updateAvatarPopup.openPopup();
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


let userId;

// Рендер начальных карточек

api
    .getInitialCards()
    .then((data) => {
        const cardSection = new Section({
                items: data,
                renderer: (item) => {
                    cardSection.addItem(renderCard({
                        name: item.name,
                        link: item.link,
                        likes: item.likes,
                        id: item._id,
                        userId: userId,
                        ownerId: item.owner._id
                    }));
                },
            },
            listCards
        );
        cardSection.renderElements();
    })
    .catch((err) => alert(err))

//Отрисовка данных пользователя на странице
api
    .getUserData()
    .then((data) => {
        profileInfo.setUserInfo(data);
        profileInfo.setUserAvatar(data.avatar);
        userId = data._id;
    })
    .catch((err) => alert(err))