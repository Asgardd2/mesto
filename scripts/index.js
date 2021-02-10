import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

import '../pages/index.css';

/*
const archiz = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chekyabinsk = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url)

const kamchatka = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url)
const holmogorsk = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"', import.meta.url)
const baikal = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url)


const initialCards = [
  {
    name: "Архыз",
    link: archiz
  },
  {
    name: "Челябинская область",
    link: chekyabinsk
  },
  {
    name: "Иваново",
    link: ivanovo
  },
  {
    name: "Камчатка",
    link: kamchatka
  },
  {
    name: "Холмогорский район",
    link: holmogorsk
  },
  {
    name: "Байкал",
    link: baikal
  },
];
*/

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

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  containerCards: '.elements',
  popupProfile: '#popup-profile',
  popupCard: '#popup-card',
  popupImg: '#popup-img'
};

//Открытие и закрытие попапа
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileTitleText = document.querySelector(".profile__title-text");

const popupProfile = document.querySelector(config.popupProfile);
const popupCard = document.querySelector(config.popupCard);

const profileSubtitleText = document.querySelector(".profile__subtitle");
const popupProfileSubmit = popupProfile.querySelector(".popup__form_type_profile");
const popupCardSubmit = popupCard.querySelector(".popup__form_type_card");

const templateCardElement = document.querySelector(".template-card");
const containerCards = document.querySelector(".elements");

const nameEditProfile = document.querySelector('#profile-name');
const jobEditProfile = document.querySelector('#profile-about');

function handleSubmitChangesProfile(submitData) {
  userInfo.setUserInfo(submitData['profile-name'],submitData['profile-about']);
  const tekUserInfo = userInfo.getUserInfo();
  profileTitleText.textContent = tekUserInfo.name;
  profileSubtitleText.textContent = tekUserInfo.job;
}

function handleSubmitAddCard(submitData) {
  const newCardInputData = {};
  newCardInputData.name = submitData['card-name'];
  newCardInputData.link = submitData['card-url'];
  const newCard = new Card(newCardInputData,templateCardElement, popupWithImage.open.bind(popupWithImage)).getFullObj();
  containerCards.prepend(newCard);
}

const userInfo = new UserInfo(nameEditProfile,jobEditProfile);

const profileValidator = new FormValidator(config, popupProfileSubmit);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, popupCardSubmit);
addCardValidator.enableValidation();

const popupWithImage = new PopupWithImage(config.popupImg);
popupWithImage.setEventListeners();

const popupWithFormProfile = new PopupWithForm(config.popupProfile,false,handleSubmitChangesProfile);
popupWithFormProfile.setEventListeners();

const popupWithFormCard = new PopupWithForm(config.popupCard,true,handleSubmitAddCard);
popupWithFormCard.setEventListeners();

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newcard = new Card(item,templateCardElement, popupWithImage.open.bind(popupWithImage)).getFullObj();
    cardsList.addItem(newcard);
    },
  },
  config.containerCards
);

cardsList.renderItems();

profileEditButton.addEventListener("click", () => {
  popupWithFormProfile.open();
  popupWithFormProfile.setDefaultValues(userInfo.getUserInfo()); 
});
addCardButton.addEventListener("click", popupWithFormCard.open.bind(popupWithFormCard));