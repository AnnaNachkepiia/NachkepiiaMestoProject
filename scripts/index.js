import {
    initialCards,
    popupEditElement,
    popupAddElement,
    popupImgElement,
    popupOpenAddButttonElement,
    popupEditCloseButtonElement,
    popupAddCloseButtonElement,
    popupImgCloseButtonElement,
    popupOpenButtonElement,
    popupSubmitButtonElement,
    popupSubmitButtonAdd,
    popupFormElement,
    popupAddFormElement,
    nameInput,
    jobInput,
    cardNameInput,
    cardLinkInput,
    profileTitle,
    profileSubtitle,
    popupPicture,
    popupOpenPicture,
    popupOpenPictureCapture,
    listCards,
    formObj,
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


const profileInfo = new UserInfo({
    userNameSelector: profileTitle,
    userInfoSelector: profileSubtitle,
})

const popupEdit = new PopupWithForm({
        popupSelector: popupEditElement,
        formSubmit: (data) => {
            profileInfo.setUserInfo({ data });
        }
    })
    // console.log(popupEdit);
popupEdit.setEventListeners();

const openPopupEdit = () => {
    const userInfo = profileInfo.getUserInfo();
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.about;
    popupEdit.openPopup();

}

popupOpenButtonElement.addEventListener("click", openPopupEdit);


const newCardPopup = new PopupWithForm({
    popupSelector: popupAddElement,
    formSubmit: (data) => {
        const newCard = renderCard(data);
        cardSection.addItem(newCard);
    }
})
newCardPopup.setEventListeners();



const picturePopup = new PopupWithImage(popupImgElement);


const handleImageClick = (name, link) => {
    picturePopup.open(name, link);
    picturePopup.setEventListeners()
};


const renderCard = (data) => {
    const placeCard = new Card(data, '#cardTemplate', handleImageClick);
    const newCard = placeCard.generateCard()
    return newCard;
}


const cardSection = new Section({
    items: initialCards,
    renderer: (data) => {
        const cardItem = renderCard(data);
        cardSection.addItem(cardItem);
    }
}, listCards)
cardSection.renderElements();


// Функции

// function openPopup(popup) {
//     popup.classList.add("popup_is-opened");
//     document.addEventListener("keydown", closeByEscape);
// }

// function closePopup(popup) {
//     popup.classList.remove("popup_is-opened");
//     document.removeEventListener("keydown", closeByEscape);

// }




function openPopupAdd() {
    newCardPopup.openPopup();
}
popupOpenAddButttonElement.addEventListener("click", openPopupAdd);

// function openPopupImg() {
//     openPopup(popupImgElement);
// }

// function closeAddPopup() {
//     popupAddFormElement.reset();
//     addCardValidator.disableSubmitButton();
//     closePopup(popupAddElement);
// }
// popupAddCloseButtonElement.addEventListener("click", closeAddPopup);




// const closePopupOverlay = function(event) {
//     if (event.target !== event.currentTarget) {
//         return;
//     }
//     closePopup(event.target);
// };

// const closeByEscape = function(event) {
//     if (event.key === "Escape") {
//         const popupIsOpened = document.querySelector(".popup_is-opened");
//         closePopup(popupIsOpened);
//     }
// };





// const handleFormEditSubmit = function(evt) {
//     evt.preventDefault();
//     profileTitle.textContent = nameInput.value;
//     profileSubtitle.textContent = jobInput.value;

//     closePopup(popupEditElement);
// };








// функция добавления карточки из массива
// const addCard = (data) => {
//     const placeCard = renderCard(data);
//     listCards.prepend(placeCard);
// }

// // заполнение начальными карточками
// initialCards.forEach((data) => {
//     addCard(data);
// });

// функция submit
// const handleFormAddCreate = (evt) => {
//     evt.preventDefault();
//     addCard({
//         name: cardNameInput.value,
//         link: cardLinkInput.value,
//     });
//     closeAddPopup();
// };

// Обработчики событий
// popupEditCloseButtonElement.addEventListener("click", closeEditPopup);
// popupImgCloseButtonElement.addEventListener("click", closePopupImg);
// // popupFormElement.addEventListener("submit", handleFormSubmit);
// popupAddFormElement.addEventListener("submit", handleFormAddCreate);
// popupEditElement.addEventListener("click", closePopupOverlay);
// // popupAddElement.addEventListener("click", closePopupOverlay);
// // popupImgElement.addEventListener("click", closePopupOverlay);
// popupAddFormElement.addEventListener("submit", handleFormAddCreate);
// popupEditElement.addEventListener("click", closePopupOverlay);
// popupAddElement.addEventListener("click", closePopupOverlay);
// popupImgElement.addEventListener("click", closePopupOverlay);