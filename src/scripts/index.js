import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from'./init.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

import '../pages/index.css';

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
  popupImg: '#popup-img',
  escKey: 'Escape'
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
  this.close();
  /*
  const tekUserInfo = userInfo.getUserInfo();
  profileTitleText.textContent = tekUserInfo.name;
  profileSubtitleText.textContent = tekUserInfo.job;
  */
}

function handleSubmitAddCard(submitData) {
  const newCardInputData = {};
  newCardInputData.name = submitData['card-name'];
  newCardInputData.link = submitData['card-url'];
  const newCard = new Card(newCardInputData,templateCardElement, popupWithImage.open.bind(popupWithImage)).getFullObj();
  cardsList.addItem(newCard);
  popupWithFormCard.setDefaultValues([['#card-name',''],['#card-url','']]); 
  this.close();
  //containerCards.prepend(newCard);
}

const userInfo = new UserInfo(nameEditProfile.value,jobEditProfile.value,profileTitleText,profileSubtitleText);

const popupWithImage = new PopupWithImage(config.popupImg,config.escKey);
popupWithImage.setEventListeners();

const popupWithFormProfile = new PopupWithForm(config.popupProfile,handleSubmitChangesProfile,config.escKey);
popupWithFormProfile.setEventListeners();

const popupWithFormCard = new PopupWithForm(config.popupCard,handleSubmitAddCard,config.escKey);
popupWithFormCard.setEventListeners();

const profileValidator = new FormValidator(config, popupProfileSubmit,popupWithFormProfile);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, popupCardSubmit,popupWithFormCard);
addCardValidator.enableValidation();

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
  popupWithFormProfile.setDefaultValues([['#profile-name',userInfo.getUserInfo().name],['#profile-about',userInfo.getUserInfo().job]]); 
  profileValidator.setButtonState(true);
});
addCardButton.addEventListener("click",() => { 
  popupWithFormCard.open();
  addCardValidator.setButtonState(false);
});