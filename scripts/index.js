
// Переменные
const popupElements = document.querySelector('.popup');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupAddElement = document.querySelector('.popup_type_add-card');
const popupImgElement = document.querySelector('.popup_type_open-image');
const popupOpenAddButttonElement = document.querySelector('.profile__add-button');
const popupEditCloseButtonElement = document.querySelector('.popup__close_edit');
const popupAddCloseButtonElement = document.querySelector('.popup__close_add');
const popupImgCloseButtonElement = document.querySelector('.popup__close_img');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupSubmitButtonElement = popupEditElement.querySelector('.popup__edit-form_button_submit');
const popupFormElement = popupEditElement.querySelector('.popup__edit-container');
const nameInput = popupFormElement.querySelector('.popup__edit-form_type_name');
const jobInput = popupFormElement.querySelector('.popup__edit-form_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const listCards = document.querySelector('.places');



const placeDescription = document.querySelector('.place__description');
const placeDeleteButtonElement = document.querySelector('.place__delete-button');


nameInput.value = profileTitle.textContent;
jobInput.value = profileSubtitle.textContent;



const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// Фунцкии

function openPopupEdit() {
    popupEditElement.classList.add('popup_is-opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}


function closeEditPopup() {
    popupEditElement.classList.remove('popup_is-opened');
}


function openPopupAdd() {
    popupAddElement.classList.add('popup_is-opened');
}

function closeAddPopup() {
    popupAddElement.classList.remove('popup_is-opened');
}

function openPopupImg() {
    popupImgElement.classList.add('popup_is-opened');
}

function closePopupImg() {
    popupImgElement.classList.remove('popup_is-opened');
} 


const closePopupOverlay = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    closeEditPopup();
    closeAddPopup();
    closePopupImg();
}


const formSubmitHandler = function (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closeEditPopup();
    closeAddPopup();
}



// функция добавления новой карточки
function renderCard(cardImg, cardName) {
    const placeTemplateElement = document.querySelector('.template-place').content;
    const placeCard = placeTemplateElement.querySelector('.place').cloneNode(true);
    const placeImageElement = placeCard.querySelector('.place__image');
    const placeTitle = placeCard.querySelector('.place__title');

    placeImageElement.src = cardImg;
    placeImageElement.alt = cardName;
    placeTitle.textContent = cardName;
    // document.querySelector('.popup__picture-title') = cardName;

    placeCard.querySelector('.place__like-button').addEventListener('click', function(event){
        event.target.classList.toggle('place__like-button_active');
    });

    listCards.prepend(placeCard);


    return placeCard;
}

// функция добавления карточки из массива
function addCard(cardImg, cardName) {

    listCards.prepend(renderCard(cardImg, cardName));

};


// заполнение начальными карточками
initialCards.forEach(function (item) {
    addCard(item.link, item.name);
});



// Обработчики событий
popupOpenButtonElement.addEventListener('click', openPopupEdit);
popupOpenAddButttonElement.addEventListener('click', openPopupAdd);
popupEditCloseButtonElement.addEventListener('click', closeEditPopup);
popupAddCloseButtonElement.addEventListener('click', closeAddPopup);
popupImgCloseButtonElement.addEventListener('click', closePopupImg);
popupEditElement.addEventListener('click', closePopupOverlay);
popupFormElement.addEventListener('submit', formSubmitHandler);
popupAddElement.addEventListener('click', closePopupOverlay);

