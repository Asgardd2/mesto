//Открытие и закрытие попапа
const profileEditButtonNode = document.querySelector(".profile__edit-button");
const popupCloseButtonNode = document.querySelector(".popup__close-button");
const popupNode = document.querySelector(".popup");
const profileTitleTextNode = document.querySelector(".profile__title-text");
const profileSubtitleTextNode = document.querySelector(".profile__subtitle");
const popupInputTitleNode = document.querySelector(".popup__input_type_title");
const popupInputSubTitleNode = document.querySelector(".popup__input_type_subtitle");
const popupContainerNode = document.querySelector(".popup__container");  
const elementHeartNode = document.querySelector(".element__heart");  

function closePopup() {
    popupNode.classList.remove('popup_opened');
}

function openPopup() {
    popupInputTitleNode.value = profileTitleTextNode.textContent;
    popupInputSubTitleNode.value = profileSubtitleTextNode.textContent;
    popupNode.classList.add('popup_opened');
}

function submitChanges(evt) {
    evt.preventDefault();
    profileTitleTextNode.textContent = popupInputTitleNode.value;
    profileSubtitleTextNode.textContent = popupInputSubTitleNode.value;
    closePopup();
}

profileEditButtonNode.addEventListener('click',openPopup);

popupCloseButtonNode.addEventListener('click',closePopup);

popupContainerNode.addEventListener('submit',submitChanges);
