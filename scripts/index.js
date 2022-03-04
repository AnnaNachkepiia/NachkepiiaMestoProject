// Переменные
const popupEditElement = document.querySelector(".popup_type_edit");
const popupAddElement = document.querySelector(".popup_type_add-card");
const popupImgElement = document.querySelector(".popup_type_open-image");
const popupOpenAddButttonElement = document.querySelector(
  ".profile__add-button"
);
const popupEditCloseButtonElement =
  document.querySelector(".popup__close_edit");
const popupAddCloseButtonElement = document.querySelector(".popup__close_add");
const popupImgCloseButtonElement = document.querySelector(".popup__close_img");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
const popupSubmitButtonElement = popupEditElement.querySelector(
  ".popup__edit-form_button_submit"
);
const popupFormElement = popupEditElement.querySelector(
  ".popup__form-container_type_edit"
);
const popupAddFormElement = popupAddElement.querySelector(
  ".popup__form-container_type_add"
);
const nameInput = popupFormElement.querySelector(".popup__edit-form_type_name");
const jobInput = popupFormElement.querySelector(".popup__edit-form_type_about");
const cardNameInput = popupAddElement.querySelector(
  ".popup__edit-form_type_card-name"
);
const cardLinkInput = popupAddElement.querySelector(
  ".popup__edit-form_type_link"
);
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupPicture = document.querySelector(".popup__picture");
const popupOpenPicture = document.querySelector(".popup__fulled-img");
const popupOpenPictureCapture = popupPicture.querySelector(
  ".popup__picture-title"
);

const listCards = document.querySelector(".places");
const placeTemplateElement = document.querySelector(".template-place").content;

const placeDescription = document.querySelector(".place__description");

// Фунцкии

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

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
  closePopup(popupAddElement);
}

function openPopupImg() {
  openPopup(popupImgElement);
}

function closePopupImg() {
  closePopup(popupImgElement);
}

const closePopupOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(event.target);
};

const closeByEscape = function (event) {
    // let key = event.key;
    if (event.key === "Escape") {
        closePopup(event.target);
    }
}

const handleFormEditSubmit = function (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupAddElement);
  closePopup(popupEditElement);
};

// функция добавления новой карточки
function renderCard(cardImg, cardName) {
  const placeCard = placeTemplateElement
    .querySelector(".place")
    .cloneNode(true);
  const placeImageElement = placeCard.querySelector(".place__image");
  const placeTitle = placeCard.querySelector(".place__title");

  placeImageElement.src = cardImg;
  placeImageElement.alt = cardName;
  placeTitle.textContent = cardName;

  placeCard
    .querySelector(".place__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("place__like-button_active");
    });

  placeCard
    .querySelector(".place__delete-button")
    .addEventListener("click", function (evt) {
      placeCard.remove();
    });

  placeImageElement.addEventListener("click", function (evt) {
    openPopupImg(popupPicture);
    popupOpenPicture.src = cardImg;
    popupOpenPicture.alt = cardName;
    popupOpenPictureCapture.textContent = cardName;
  });

  return placeCard;
}

// функция добавления карточки из массива
function addCard(cardImg, cardName) {
  listCards.prepend(renderCard(cardImg, cardName));
}

// заполнение начальными карточками
initialCards.forEach(function (item) {
  addCard(item.link, item.name);
});

// функция submit
const handleFormAddCreate = (evt) => {
  evt.preventDefault();
  addCard(cardLinkInput.value, cardNameInput.value);
  closeAddPopup();

  cardLinkInput.value = "";
  cardNameInput.value = "";
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
popupEditElement.addEventListener("keydown", closeByEscape);
