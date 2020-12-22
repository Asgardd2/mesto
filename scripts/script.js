//Открытие и закрытие попапа
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const popupProfile = document.querySelector("#popup-profile");
const popupCard = document.querySelector("#popup-card");
const popupImg = document.querySelector("#popup-img");
const popupMain = document.querySelector(".popup");


const popupProfileCloseButton = popupProfile.querySelector(".popup__close-button");
const popupAddCardCloseButton = popupCard.querySelector(".popup__close-button");
const popupAddImgCloseButton = popupImg.querySelector(".popup__close-button");
const popupProfileSubmitButton = popupProfile.querySelector(".popup__form_type_profile");
const popupCardSubmitButton = popupCard.querySelector(".popup__form_type_card");
const popupImgEl = popupImg.querySelector(".popup__image");
const popupImgDescrEl = popupImg.querySelector(".popup__image-description");

const profileTitleText = document.querySelector(".profile__title-text");
const profileSubtitleText = document.querySelector(".profile__subtitle");

const popupInputProfileTitle = popupProfile.querySelector(
  ".popup__input_type_profile-title"
);
const popupInputProfileSubTitle = popupProfile.querySelector(
  ".popup__input_type_profile-subtitle"
);

const popupInputCardTitle = popupCard.querySelector(
  ".popup__input_type_card-title"
);
const popupInputCardLink = popupCard.querySelector(
  ".popup__input_type_card-img-link"
);

const templateCardElement = document.querySelector(".template-card");
const containerCards = document.querySelector(".elements");

function closePopup(event) {
  console.log(event);
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup__save-button')) {
    event.target.closest(".popup").classList.remove("popup_opened");
  }
  document.removeEventListener('keydown', closePopupByKey); 
  }
  

function closePopupByKey(evt) {
  let popupInActiveState = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && popupInActiveState) {
    popupInActiveState.classList.remove('popup_opened');
  };
}

function handleOpenForm(form) {
  form.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByKey); 
}

function handleOpenFormProfile() {
  setDefaultValuesToProfileForm();
  handleOpenForm(popupProfile);
}

function handleOpenFormCard() {
  popupInputCardTitle.value = "";
  popupInputCardLink.value = "";
  handleOpenForm(popupCard);
}

function handleOpenImg(event) {
  popupImgEl.src =  event.target.src;
  popupImgEl.alt =  event.target.alt;
  popupImgDescrEl.textContent = event.target.parentElement.querySelector(".element__rectangle").querySelector(".element__text").textContent;
  handleOpenForm(popupImg)
}

function deleteCard(event) {
  const parentOftarget = event.target.parentNode;
  const imageElement = parentOftarget.querySelector(".element__image");
  const elementHeart = parentOftarget.querySelector(".element__heart");
  const elementBin = parentOftarget.querySelector(".element__bin");
  elementBin.removeEventListener("click", deleteCard);
  imageElement.removeEventListener("click", handleOpenImg);
  elementHeart.removeEventListener("click", changeLikeHeart);
  event.target.closest(".element").remove();
}

function changeLikeHeart(evt) {
  evt.target.classList.toggle("element__heart_active");
}

function addCard(cardObject) {
  const newCard = templateCardElement.content.cloneNode(true);
  const titleElement = newCard.querySelector(".element__text");
  const imageElement = newCard.querySelector(".element__image");
  const elementHeart = newCard.querySelector(".element__heart");
  const elementBin = newCard.querySelector(".element__bin");
  titleElement.textContent = cardObject.name;
  imageElement.src =  cardObject.link;
  imageElement.alt =  cardObject.name;
  elementBin.addEventListener("click", deleteCard);
  imageElement.addEventListener("click", handleOpenImg);
  elementHeart.addEventListener("click", changeLikeHeart);
  containerCards.prepend(newCard);
}

function handleSubmitChangesProfile(evt) {
  evt.preventDefault();
  profileTitleText.textContent = popupInputProfileTitle.value;
  profileSubtitleText.textContent = popupInputProfileSubTitle.value;
  closePopup(evt);
}

function handleSubmitAddCard(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = popupInputCardTitle.value;
  newCard.link = popupInputCardLink.value;
  addCard(newCard);
  closePopup(evt);
}

function initDefaultCards() {
  initialCards.reverse().forEach(addCard);
}

function setDefaultValuesToProfileForm () {
  popupInputProfileTitle.value = profileTitleText.textContent;
  popupInputProfileSubTitle.value = profileSubtitleText.textContent;
}

function setDefaultValuesToProfileForm () {
  popupInputProfileTitle.value = profileTitleText.textContent;
  popupInputProfileSubTitle.value = profileSubtitleText.textContent;
}

setDefaultValuesToProfileForm();

profileEditButton.addEventListener("click", handleOpenFormProfile);
addCardButton.addEventListener("click", handleOpenFormCard);

popupAddCardCloseButton.addEventListener("click", closePopup);
popupProfileCloseButton.addEventListener("click", closePopup);
popupAddImgCloseButton.addEventListener("click", closePopup);

popupProfileSubmitButton.addEventListener("submit", handleSubmitChangesProfile);
popupCardSubmitButton.addEventListener("submit", handleSubmitAddCard);

popupProfile.addEventListener("mousedown",closePopup);
popupCard.addEventListener("mousedown",closePopup);

//Наполняем дефолтными карточками
initDefaultCards();
