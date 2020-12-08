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
const templateCardElement = document.querySelector(".template-card"); 
const containerCards = document.querySelector(".elements"); 

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

function addCard(cardObject) {
    const newCard = templateCardElement.content.cloneNode(true);
    const titleElement = newCard.querySelector('.element__text');
    const imageElement = newCard.querySelector('.element__image');
    titleElement.textContent = cardObject.name;
    imageElement.setAttribute('src',cardObject.link);
    imageElement.setAttribute('alt',cardObject.name);
    containerCards.append(newCard);
}

function initDefaultCards() {
    const listCards = initialCards.forEach(addCard);
}

profileEditButtonNode.addEventListener('click',openPopup);

popupCloseButtonNode.addEventListener('click',closePopup);

popupContainerNode.addEventListener('submit',submitChanges);

//Наполняем дефолтными карточками
initDefaultCards();