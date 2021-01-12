import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Открытие и закрытие попапа
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const popupProfile = document.querySelector("#popup-profile");
const popupCard = document.querySelector("#popup-card");
const popupImg = document.querySelector("#popup-img");

const popupProfileSubmit = popupProfile.querySelector(".popup__form_type_profile");
const popupCardSubmit = popupCard.querySelector(".popup__form_type_card");
const popupImgEl = popupImg.querySelector(".popup__image");
const popupImgDescrEl = popupImg.querySelector(".popup__image-description");

const profileTitleText = document.querySelector(".profile__title-text");
const profileSubtitleText = document.querySelector(".profile__subtitle");

const popupInputProfileTitle = popupProfile.querySelector(".popup__input_type_profile-title");
const popupInputProfileSubTitle = popupProfile.querySelector(".popup__input_type_profile-subtitle");
const popupInputCardTitle = popupCard.querySelector(".popup__input_type_card-title");
const popupInputCardLink = popupCard.querySelector(".popup__input_type_card-img-link");

const templateCardElement = document.querySelector(".template-card");
const containerCards = document.querySelector(".elements");

function handleClosePopup(event) {
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup__save-button')) {
    closePopup(event.target.closest(".popup"))
  }
  }

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closePopupByKey); 
  }
  
function closePopupByKey(evt) {
  const popupInActiveState = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && popupInActiveState) {
    closePopup(popupInActiveState);
  };
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByKey); 
}

function handleOpenFormProfile() {
  setDefaultValuesToProfileForm();
  profileValidator.resetValidation();
  openPopup(popupProfile);
}

function handleOpenFormCard() {
  popupInputCardTitle.value = "";
  popupInputCardLink.value = "";
  addCardValidator.resetValidation()
  openPopup(popupCard);
}

function handleOpenImg(data) {
  popupImgEl.src =  data.link
  popupImgEl.alt =  data.name
  popupImgDescrEl.textContent = data.name
  openPopup(popupImg);
}

function addCard(cardObject) {
  containerCards.prepend(cardObject);
}

function handleSubmitChangesProfile(evt) {
  evt.preventDefault();
  profileTitleText.textContent = popupInputProfileTitle.value;
  profileSubtitleText.textContent = popupInputProfileSubTitle.value;
}

function handleSubmitAddCard(evt) {
  evt.preventDefault();
  const newCardInputData = {};
  newCardInputData.name = popupInputCardTitle.value;
  newCardInputData.link = popupInputCardLink.value;
  const newCard = createCard(newCardInputData);
  addCard(newCard);
}

function createCard(item) {
  const newCard = new Card(item,templateCardElement, handleOpenImg);
  return newCard.getFullObj()
}

function initDefaultCards() {
  initialCards.reverse().forEach((val) => {
    const newCard = createCard(val)
    addCard(newCard);
  } );
}

function setDefaultValuesToProfileForm () {
  popupInputProfileTitle.value = profileTitleText.textContent;
  popupInputProfileSubTitle.value = profileSubtitleText.textContent;
}

const profileValidator = new FormValidator(validationConfig, popupProfileSubmit);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig, popupCardSubmit);
addCardValidator.enableValidation();

profileEditButton.addEventListener("click", handleOpenFormProfile);
addCardButton.addEventListener("click", handleOpenFormCard);
popupProfileSubmit.addEventListener("submit", handleSubmitChangesProfile);
popupCardSubmit.addEventListener("submit", handleSubmitAddCard);
popupProfile.addEventListener("mousedown",handleClosePopup);
popupCard.addEventListener("mousedown",handleClosePopup);
popupImg.addEventListener("mousedown",handleClosePopup);

//Наполняем дефолтными карточками
initDefaultCards();

