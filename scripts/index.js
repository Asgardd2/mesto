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

const popupProfileCloseButton = popupProfile.querySelector(".popup__close-button");
const popupAddCardCloseButton = popupCard.querySelector(".popup__close-button");
const popupAddImgCloseButton = popupImg.querySelector(".popup__close-button");
const popupProfileSubmit = popupProfile.querySelector(".popup__form_type_profile");
const popupProfileSubmitButton = popupProfileSubmit.querySelector(".popup__save-button");
const popupCardSubmit = popupCard.querySelector(".popup__form_type_card");
const popupCardSubmitButton = popupCardSubmit.querySelector(".popup__save-button");
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

function closePopup(event) {
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup__save-button')) {
    event.target.closest(".popup").classList.remove("popup_opened");
  }
  document.removeEventListener('keydown', closePopupByKey); 
  }
  
function closePopupByKey(evt) {
  const popupInActiveState = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && popupInActiveState) {
    popupInActiveState.classList.remove('popup_opened');
  };
}

function clearErrorsInInputFields(form) {
  const textElWithErrorsArray = Array.from(form.querySelectorAll('.popup__error'));
  textElWithErrorsArray.forEach((el) => {
    el.textContent = '';
  })
}

function handleOpenForm(form) {
  form.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByKey); 
  clearErrorsInInputFields(form);
}

function handleOpenFormProfile() {
  setDefaultValuesToProfileForm();
  if (popupProfileSubmitButton.classList.contains('popup__save-button_disabled')) {
    popupProfileSubmitButton.classList.remove('popup__save-button_disabled');
    popupProfileSubmitButton.setAttribute('disabled','false');
  }
  handleOpenForm(popupProfile);
}

function handleOpenFormCard() {
  popupInputCardTitle.value = "";
  popupInputCardLink.value = "";
  if (!popupCardSubmitButton.classList.contains('popup__save-button_disabled')) {
    popupCardSubmitButton.classList.add('popup__save-button_disabled');
    popupCardSubmitButton.setAttribute('disabled','true');
  }
  handleOpenForm(popupCard);
}

function handleOpenImg(event) {
  popupImgEl.src =  event.target.src;
  popupImgEl.alt =  event.target.alt;
  popupImgDescrEl.textContent = event.target.parentElement.querySelector(".element__rectangle").querySelector(".element__text").textContent;
  handleOpenForm(popupImg);
}

function addCard(cardObject) {
  cardObject.querySelector(".element__image").addEventListener("click", handleOpenImg);
  containerCards.prepend(cardObject);
}

function handleSubmitChangesProfile(evt) {
  evt.preventDefault();
  profileTitleText.textContent = popupInputProfileTitle.value;
  profileSubtitleText.textContent = popupInputProfileSubTitle.value;
  closePopup(evt);
}

function handleSubmitAddCard(evt) {
  evt.preventDefault();
  const newCardInputData = {};
  newCardInputData.name = popupInputCardTitle.value;
  newCardInputData.link = popupInputCardLink.value;
  const newCard = new Card(newCardInputData,templateCardElement);
   
  addCard(newCard.getFullObj());
  closePopup(evt);
}

function initDefaultCards() {
  initialCards.reverse().forEach((val) => {
    const newCard = new Card(val,templateCardElement);
    addCard(newCard.getFullObj());
  } );
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
      
      const newValidate = new FormValidator(config,form);
      newValidate.enableValidation();
      
  });
}

function setDefaultValuesToProfileForm () {
  popupInputProfileTitle.value = profileTitleText.textContent;
  popupInputProfileSubTitle.value = profileSubtitleText.textContent;
}

profileEditButton.addEventListener("click", handleOpenFormProfile);
addCardButton.addEventListener("click", handleOpenFormCard);
popupAddCardCloseButton.addEventListener("click", closePopup);
popupProfileCloseButton.addEventListener("click", closePopup);
popupAddImgCloseButton.addEventListener("click", closePopup);
popupProfileSubmit.addEventListener("submit", handleSubmitChangesProfile);
popupCardSubmit.addEventListener("submit", handleSubmitAddCard);
popupProfile.addEventListener("mousedown",closePopup);
popupCard.addEventListener("mousedown",closePopup);
popupImg.addEventListener("mousedown",closePopup);

//Наполняем дефолтными карточками
initDefaultCards();
//Включаем валидацию
enableValidation(validationConfig);

