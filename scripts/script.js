//Открытие и закрытие попапа
const profileEditButtonNode = document.querySelector(".profile__edit-button");
const addCardButtonNode = document.querySelector(".profile__add-button");
const popupProfileNode = document.querySelector(".popup_type_profile");
const popupCardNode = document.querySelector(".popup_type_card");

const popupProfileCloseButtonNode = popupProfileNode.querySelector(".popup__close-button");
const popupAddCardCloseButtonNode = popupCardNode.querySelector(".popup__close-button");

const profileTitleTextNode = document.querySelector(".profile__title-text");
const profileSubtitleTextNode = document.querySelector(".profile__subtitle");
const popupInputTitleNode = document.querySelector(".popup__input_profile-title");
const popupInputSubTitleNode = document.querySelector(".popup__input_profile-subtitle");
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

function closePopup(event) {
    event.target.parentElement.parentElement.classList.remove('popup_opened');
}

function openPopup(event) {
    const classOfPopup = event.target.classList.value;
    switch (classOfPopup) {
        case 'profile__edit-button':
            popupInputTitleNode.value = profileTitleTextNode.textContent;
            popupInputSubTitleNode.value = profileSubtitleTextNode.textContent;
            popupProfileNode.classList.add('popup_opened');
            break;
        case 'profile__add-button':
            popupCardNode.classList.add('popup_opened');
            break;
    }

    
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

popupAddCardCloseButtonNode.addEventListener('click',closePopup);
popupProfileCloseButtonNode.addEventListener('click',closePopup);

popupContainerNode.addEventListener('submit',submitChanges);

addCardButtonNode.addEventListener('click',openPopup);

//Наполняем дефолтными карточками
initDefaultCards();