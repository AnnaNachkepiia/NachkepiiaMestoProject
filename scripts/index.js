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



editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// Функции

// function openPopup(popup) {
//     popup.classList.add("popup_is-opened");
//     document.addEventListener("keydown", closeByEscape);
// }

// function closePopup(popup) {
//     popup.classList.remove("popup_is-opened");
//     document.removeEventListener("keydown", closeByEscape);

// }

function openPopupEdit() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(popupEditElement);
}

function closeEditPopup() {
    closePopup(popupEditElement);
}

function openPopupAdd() {
    openPopup(popupAddElement);
}

function closeAddPopup() {
    popupAddFormElement.reset();
    addCardValidator.disableSubmitButton();
    closePopup(popupAddElement);
}

function openPopupImg() {
    openPopup(popupImgElement);
}

function closePopupImg() {
    closePopup(popupImgElement);
}

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

const handleFormEditSubmit = function(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    closePopup(popupEditElement);
};


const handleImageClick = (cardName, cardImg) => {
    popupOpenPicture.src = cardImg;
    popupOpenPicture.alt = cardName;
    popupOpenPictureCapture.textContent = cardName;
    openPopupImg(popupPicture);
};

const renderCard = (data) => {

        const placeCard = new Card(data, '#cardTemplate', handleImageClick);
        const newCard = placeCard.generateCard()
        return newCard;
    }
    // функция добавления карточки из массива
const addCard = (data) => {
    const placeCard = renderCard(data);
    listCards.prepend(placeCard);
}

// заполнение начальными карточками
initialCards.forEach((data) => {
    addCard(data);
});

// функция submit
const handleFormAddCreate = (evt) => {
    evt.preventDefault();
    addCard({
        name: cardNameInput.value,
        link: cardLinkInput.value,
    });
    closeAddPopup();
};

// Обработчики событий
popupOpenButtonElement.addEventListener("click", openPopupEdit);
popupOpenAddButttonElement.addEventListener("click", openPopupAdd);
popupEditCloseButtonElement.addEventListener("click", closeEditPopup);
popupAddCloseButtonElement.addEventListener("click", closeAddPopup);
popupImgCloseButtonElement.addEventListener("click", closePopupImg);
popupFormElement.addEventListener("submit", handleFormEditSubmit);
popupAddFormElement.addEventListener("submit", handleFormAddCreate);
popupEditElement.addEventListener("click", closePopupOverlay);
popupAddElement.addEventListener("click", closePopupOverlay);
popupImgElement.addEventListener("click", closePopupOverlay);
popupAddFormElement.addEventListener("submit", handleFormAddCreate);
popupEditElement.addEventListener("click", closePopupOverlay);
popupAddElement.addEventListener("click", closePopupOverlay);
popupImgElement.addEventListener("click", closePopupOverlay);