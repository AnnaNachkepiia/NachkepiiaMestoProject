
// Переменные
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupSubmitButtonElement = popupElement.querySelector('.popup__edit-form_button_submit');
const popupFormElement = popupElement.querySelector('.popup__edit-container');
const nameInput = popupFormElement.querySelector('.popup__edit-form_type_name');
const jobInput = popupFormElement.querySelector('.popup__edit-form_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');



nameInput.value = profileTitle.textContent;
jobInput.value = profileSubtitle.textContent;


// Фунцкии

const openPopup = function () {
    popupElement.classList.add('popup_is-opened');
}

const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
}

const closePopupOverlay = function (event) {
    console.log(event.target, event.currentTarget);
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup();
}


const formSubmitHandler = function (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup();
}


// Обработчики событий
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupOverlay);
popupFormElement.addEventListener('submit', formSubmitHandler);
