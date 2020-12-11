//Открытие и закрытие попапа
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_card");
const popupImg = document.querySelector(".popup_type_img");

const popupProfileCloseButton = popupProfile.querySelector(
  ".popup__close-button"
);
const popupAddCardCloseButton = popupCard.querySelector(
  ".popup__close-button"
);
const popupAddImgCloseButton = popupImg.querySelector(
  ".popup__close-button"
);
const popupProfileSubmitButton = popupProfile.querySelector(
  ".popup__container_type_form-profile"
);
const popupCardSubmitButton = popupCard.querySelector(
  ".popup__container_type_form-card"
);
const popupImgEl = popupImg.querySelector(".popup__image");
const popupImgDescrEl = popupImg.querySelector(
  ".popup__image-description"
);

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

function closePopupForm(event) {
  event.target.closest("div").classList.remove(
    "popup_opened"
  );
}

<<<<<<< HEAD
function openPopup(event) {
  const classOfPopup = event.target.classList.value;
  switch (classOfPopup) {
    case "profile__edit-button":
      popupInputProfileTitleNode.value = profileTitleTextNode.textContent;
      popupInputProfileSubTitleNode.value = profileSubtitleTextNode.textContent;
      popupProfileNode.classList.add("popup_opened");
      break;
    case "profile__add-button":
      popupInputCardTitleNode.value = "";
      popupInputCardLinkNode.value = "";
      popupCardNode.classList.add("popup_opened");
      break;
    case "element__image":
      popupImgElNode.setAttribute("src", event.target.src);
      popupImgElNode.setAttribute("alt", event.target.alt);
      popupImgDescrElNode.textContent = event.target.parentElement
        .querySelector(".element__rectangle")
        .querySelector(".element__text").textContent;
      popupImgNode.classList.add("popup_opened");
      break;
  }
=======
function closePopupImg(event) {
  event.target.closest("div").parentElement.classList.remove(
    "popup_opened"
  );
>>>>>>> develop
}

function handleOpenFormProfile() {
  popupInputProfileTitle.value = profileTitleText.textContent;
  popupInputProfileSubTitle.value = profileSubtitleText.textContent;
  popupProfile.classList.add("popup_opened");
}

function handleOpenFormCard() {
  popupInputCardTitle.value = "";
  popupInputCardLink.value = "";
  popupCard.classList.add("popup_opened");
}

function handleOpenImg(event) {
  popupImgEl.src =  event.target.src;
  popupImgEl.alt =  event.target.alt;
  popupImgDescrEl.textContent = event.target.parentElement
        .querySelector(".element__rectangle")
        .querySelector(".element__text").textContent;
  popupImg.classList.add("popup_opened");
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
<<<<<<< HEAD
  imageElement.setAttribute("src", cardObject.link);
  imageElement.setAttribute("alt", cardObject.name);
  elementBinNode.addEventListener("click", deleteCard);
  imageElement.addEventListener("click", openPopup);
  elementHeartNode.addEventListener("click", changeLikeHeart);

  containerCards.prepend(newCard);
}

function deleteCard(event) {
  const imageElement = event.target.parentNode.querySelector(".element__image");
  const elementHeartNode = event.target.parentNode.querySelector(".element__heart");
  const elementBinNode = event.target.parentNode.querySelector(".element__bin");
  elementBinNode.removeEventListener("click", deleteCard);
  imageElement.removeEventListener("click", openPopup);
  elementHeartNode.removeEventListener("click", changeLikeHeart);
  event.target.closest(".element").remove();
=======
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
  closePopupForm(evt);
}

function handleSubmitAddCard(evt) {
  evt.preventDefault();
  let newCard = {};
  newCard.name = popupInputCardTitle.value;
  newCard.link = popupInputCardLink.value;
  addCard(newCard);
  closePopupForm(evt);
>>>>>>> develop
}

function initDefaultCards() {
  initialCards.reverse().forEach(addCard);
}

profileEditButton.addEventListener("click", handleOpenFormProfile);
addCardButton.addEventListener("click", handleOpenFormCard);

popupAddCardCloseButton.addEventListener("click", closePopupForm);
popupProfileCloseButton.addEventListener("click", closePopupForm);
popupAddImgCloseButton.addEventListener("click", closePopupImg);

popupProfileSubmitButton.addEventListener("submit", handleSubmitChangesProfile);
popupCardSubmitButton.addEventListener("submit", handleSubmitAddCard);

//Наполняем дефолтными карточками
initDefaultCards();
