import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithQuestionDeleteCard from '../components/PopupWithQuestionDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import '../pages/index.css';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inactiveEditAvatarButtonClass: 'profile__avatar-button_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  containerCards: '.elements',
  popupProfile: '#popup-profile',
  popupAvatar: '#popup-avatar',
  popupCard: '#popup-card',
  popupImg: '#popup-img',
  popupQuestionDeleteCard: '#popup-card-delete',
  popupApproveButton: '.popup__approve-button',
  escKey: 'Escape',
  profileTitleClass: 'profile__title-text',
  profileSubtitleClass: 'profile__subtitle',
  profileAvatarPhotoClass: 'profile__avatar-photo'
};
 
//Определяем константы
const textForSaveButtonWait = 'Сохранение...';
const textForSaveButton = 'Сохранить';
const textForCreateButton = 'Создать';
const textForCreateButtonWait = 'Создание...';
const changeAvatarButton = document.querySelector(".profile__avatar-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const avatarPhoto = document.querySelector(".profile__avatar-photo");
const addCardButton = document.querySelector(".profile__add-button");
const popupProfile = document.querySelector(config.popupProfile);
const popupCard = document.querySelector(config.popupCard);
const popupAvatar = document.querySelector(config.popupAvatar);
const popupProfileSubmit = popupProfile.querySelector(".popup__form_type_profile");
const popupCardSubmit = popupCard.querySelector(".popup__form_type_card");
const popupAvatarSubmit = document.querySelector(".popup__form_type_avatar");
const templateCardElement = document.querySelector(".template-card");

function createCard(cardData,cardEl,openImgFunc,openDeleteCardPopupFunc,likeCardFunc) { 
   const newcard = new Card(cardData,cardEl,openImgFunc,openDeleteCardPopupFunc,likeCardFunc);
   return newcard;
}

function handleSubmitChangesProfile(submitData) {
  popupProfile.querySelector(config.submitButtonSelector).textContent = textForSaveButtonWait;
  api.setProfileName(submitData['profile-name'],submitData['profile-about']) 
  .then((result) => {
    userInfo.setUserInfo(submitData['profile-name'],submitData['profile-about']);
    })
  .catch((err) => {
    console.log('Ошибка на этапе загрузки данных в профиль: ' + err); // выведем ошибку в консоль
  })
  .finally(() => {
    popupProfile.querySelector(config.submitButtonSelector).textContent = textForSaveButton;
    popupProfile.close();});
}

function handleSubmitChangeAvatar() {
  popupAvatar.querySelector(config.submitButtonSelector).textContent = textForSaveButtonWait;
  api.changeAvatar(popupWithChangeAvatar.getInputValues()['avatar-url'])
  .then((result) => {
    userInfo.setUserAvatar(popupWithChangeAvatar.getInputValues()['avatar-url']);
    popupWithChangeAvatar.close();
    popupAvatar.querySelector(config.submitButtonSelector).textContent = textForSaveButton;
  })
  .catch((err) => {
    console.log('Ошибка на этапе замены аватарки: ' + err); // выведем ошибку в консоль
  })
  .finally(() => {
    popupAvatar.querySelector(config.submitButtonSelector).textContent = textForSaveButton;
    popupAvatar.close();});
  }

function handleSubmitAddCard(submitData) {
  popupCard.querySelector(config.submitButtonSelector).textContent = textForCreateButtonWait;
  const newCardInputData = {};
  newCardInputData.name = submitData['card-name'];
  newCardInputData.link = submitData['card-url'];
  api.addNewCard(newCardInputData.name,newCardInputData.link) 
  .then((result) => {
    console.log(result)
    newCardInputData._idCard = result._id;
    newCardInputData._idOwner = result.owner._id;
    newCardInputData.likes = result.likes;
    const newCard = createCard(newCardInputData,templateCardElement, popupWithImage.open.bind(popupWithImage),popupWithQuestionDeleteCard.open.bind(popupWithQuestionDeleteCard),handlLikeCard);
    cardsList.addItem(newCard.getFullObj(1));
    popupWithFormCard.close();
  })
  .catch((err) => {
    console.log('Ошибка на этапе добавления новой карточки: ' + err); // выведем ошибку в консоль
  })
  .finally(() => {
    popupWithFormCard.setDefaultValues([['#card-name',''],['#card-url','']]); 
    popupCard.querySelector(config.submitButtonSelector).textContent = textForCreateButton;
    popupWithFormCard.close();});
}

function handleApproveDeleteCard() {
  popupWithQuestionDeleteCard.close();
  api.deleteCard(popupWithQuestionDeleteCard.cardId)
  .then((result) => {
      popupWithQuestionDeleteCard.cardEl.remove();
      //console.log('asd');
  })
  .catch((err) => {
    console.log('Ошибка на этапе удаления карточки: ' + err); // выведем ошибку в консоль
  }); 
}

function handlLikeCard(evt,cardId) {
  let countOfLikes = evt.target.closest('.element__likes').querySelector('.element__heartLikes');
    
  if (evt.target.classList.contains('element__heart_active')) {
      api.disLikeCard(cardId)
      .then((result) => {
        evt.target.classList.remove("element__heart_active");
        countOfLikes.textContent =  result.likes.length;
        //console.log(result);
      })
      .catch((err) => {
        console.log('Ошибка на этапе снятия лайка карточки: ' + err); // выведем ошибку в консоль
      });

    }
    else {
      api.likeCard(cardId)
      .then((result) => {
        console.log(result);
        evt.target.classList.add("element__heart_active");
        countOfLikes.textContent =  result.likes.length;
      })
      .catch((err) => {
        console.log('Ошибка на этапе установки лайка карточки: ' + err); // выведем ошибку в консоль
      }); 
    }
}

const popupWithImage = new PopupWithImage(config.popupImg,config.escKey);
popupWithImage.setEventListeners();

const popupWithFormProfile = new PopupWithForm(config.popupProfile,handleSubmitChangesProfile,config.escKey);
popupWithFormProfile.setEventListeners();

const popupWithFormCard = new PopupWithForm(config.popupCard,handleSubmitAddCard,config.escKey);
popupWithFormCard.setEventListeners();

const popupWithChangeAvatar = new PopupWithForm(config.popupAvatar,handleSubmitChangeAvatar,config.escKey);
popupWithChangeAvatar.setEventListeners();

const popupWithQuestionDeleteCard = new PopupWithQuestionDeleteCard(config.popupQuestionDeleteCard,config.popupApproveButton,config.escKey,handleApproveDeleteCard);
popupWithQuestionDeleteCard.setEventListeners();

const profileValidator = new FormValidator(config, popupProfileSubmit,popupWithFormProfile);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, popupCardSubmit,popupWithFormCard);
addCardValidator.enableValidation();

const changeAvatarValidator = new FormValidator(config, popupAvatarSubmit,popupWithFormCard);
changeAvatarValidator.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: 'e87cef84-aebf-4af6-8585-82793372611f',
    'Content-Type': 'application/json'
  }
}); 

profileEditButton.addEventListener("click", () => {
  popupWithFormProfile.open();
  popupWithFormProfile.setDefaultValues([['#profile-name',userInfo.getUserInfo().userName],['#profile-about',userInfo.getUserInfo().userDescription]]); 
  profileValidator.setButtonState(true);
});

addCardButton.addEventListener("click",() => { 
  popupWithFormCard.open();
  addCardValidator.setButtonState(false);
});

changeAvatarButton.addEventListener("click",() => { 
  popupWithChangeAvatar.open();
  avatarPhoto.classList.remove('profile__avatar_type_hover');
  changeAvatarValidator.setButtonState(false);
});

api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result.name,result.about,result._id);
    userInfo.setUserAvatar(result.avatar);
  })
  .catch((err) => {
    console.log('Ошибка на этапе получения данных о пользователе: ' + err); // выведем ошибку в консоль
  }); 

  const cardsList = new Section(
    (item) => {
      const newcard = new Card(item,templateCardElement, popupWithImage.open.bind(popupWithImage),popupWithQuestionDeleteCard.open.bind(popupWithQuestionDeleteCard),handlLikeCard);
      if (userInfo.getUserInfo().userId !== newcard.getCardOwnerId()) { 
        const isWithBin = 0;
        cardsList.addItem(newcard.getFullObj(isWithBin));
      } else {
        const isWithBin = 1;
        cardsList.addItem(newcard.getFullObj(isWithBin));
      }
      
      if (newcard.getUserLikes().some((el) => { return el._id === userInfo.getUserInfo().userId})) {
        newcard.setLike();
      }
      
    },
    config.containerCards
  );
  
  const userInfo = new UserInfo(config.profileTitleClass,config.profileSubtitleClass,config.profileAvatarPhotoClass);

api.getInitialCards()
.then((result) => {
  const initialCards = [];
  result.forEach((el) => {
    initialCards.push({name: el.name, link: el.link, likes: el.likes, _idCard: el._id, _idOwner: el.owner._id});    
  })
  cardsList.renderItems(initialCards);
})
.catch((err) => {
  console.log('Ошибка на этапе получения карточек с сервера: ' + err); // выведем ошибку в консоль
}); 
