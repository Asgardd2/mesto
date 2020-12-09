//Открытие и закрытие попапа
const profileEditButtonNode = document.querySelector(".profile__edit-button");
const addCardButtonNode = document.querySelector(".profile__add-button");
const popupProfileNode = document.querySelector(".popup_type_profile");
const popupCardNode = document.querySelector(".popup_type_card");
const popupImgNode = document.querySelector(".popup_type_img");

const popupProfileCloseButtonNode = popupProfileNode.querySelector(".popup__close-button");
const popupAddCardCloseButtonNode = popupCardNode.querySelector(".popup__close-button");
const popupAddImgCloseButtonNode = popupImgNode.querySelector(".popup__close-button");
const popupProfileSubmitButtonNode = popupProfileNode.querySelector(".popup__container_type_form"); 
const popupCardSubmitButtonNode = popupCardNode.querySelector(".popup__container_type_form"); 
const popupImgElNode = popupImgNode.querySelector(".popup__image"); 
const popupImgDescrElNode = popupImgNode.querySelector(".popup__image-description"); 



const profileTitleTextNode = document.querySelector(".profile__title-text");
const profileSubtitleTextNode = document.querySelector(".profile__subtitle");

const popupInputProfileTitleNode = popupProfileNode.querySelector(".popup__input_type_profile-title");
const popupInputProfileSubTitleNode = popupProfileNode.querySelector(".popup__input_type_profile-subtitle");

const popupInputCardTitleNode = popupCardNode.querySelector(".popup__input_type_card-title");
const popupInputCardLinkNode = popupCardNode.querySelector(".popup__input_type_card-img-link");
 

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

function closePopup(popup_act) {
    if (popup_act.target.classList.contains('popup__close-button')) {
        popup_act.target.parentElement.parentElement.classList.remove('popup_opened');
    }
    else {
        popup_act.target.parentElement.classList.remove('popup_opened');
    }
    
}

function openPopup(event) {
    const classOfPopup = event.target.classList.value;
    switch (classOfPopup) {
        case 'profile__edit-button':
            popupInputProfileTitleNode.value = profileTitleTextNode.textContent;
            popupInputProfileSubTitleNode.value = profileSubtitleTextNode.textContent;
            popupProfileNode.classList.add('popup_opened');
            break;
        case 'profile__add-button':
            popupInputCardTitleNode.value = '';
            popupInputCardLinkNode.value ='';
            popupCardNode.classList.add('popup_opened');
            break;
        case 'element__image':
            popupImgElNode.setAttribute('src',event.target.src);
            popupImgDescrElNode.textContent = event.target.parentElement.querySelector('.element__rectangle').querySelector('.element__text').textContent;
            popupImgNode.classList.add('popup_opened');
            break;

        
    }
}

function submitChanges(evt) {

    evt.preventDefault();
    
    if (evt.target.parentNode.classList.contains('popup_type_profile')) {
        profileTitleTextNode.textContent = popupInputProfileTitleNode.value;
        profileSubtitleTextNode.textContent = popupInputProfileSubTitleNode.value;
        closePopup(evt);
    }

    if (evt.target.parentNode.classList.contains('popup_type_card')) {
        let newCard = {};
        newCard.name = popupInputCardTitleNode.value; 
        newCard.link = popupInputCardLinkNode.value;
        addCard(newCard);
        closePopup(evt);
    }

}

function addCard(cardObject) {
    const newCard = templateCardElement.content.cloneNode(true);
    const titleElement = newCard.querySelector('.element__text');
    const imageElement = newCard.querySelector('.element__image');
    const elementHeartNode = newCard.querySelector('.element__heart');
    const elementBinNode = newCard.querySelector('.element__bin');
    titleElement.textContent = cardObject.name;
    imageElement.setAttribute('src',cardObject.link);
    imageElement.setAttribute('alt',cardObject.name); 
    elementBinNode.addEventListener('click', deleteCard);
    imageElement.addEventListener('click', openPopup);
    elementHeartNode.addEventListener('click', function() {
        elementHeartNode.classList.toggle('element__heart_active');
    })

    containerCards.prepend(newCard);
}

function deleteCard(event) {
    event.target.closest('.element').remove()
}

function initDefaultCards() {
    const listCards = initialCards.reverse().forEach(addCard);
    
}

profileEditButtonNode.addEventListener('click',openPopup);
addCardButtonNode.addEventListener('click',openPopup);

popupAddCardCloseButtonNode.addEventListener('click',closePopup);
popupProfileCloseButtonNode.addEventListener('click',closePopup);
popupAddImgCloseButtonNode.addEventListener('click',closePopup);

popupProfileSubmitButtonNode.addEventListener('submit',submitChanges);
popupCardSubmitButtonNode.addEventListener('submit',submitChanges);

//Наполняем дефолтными карточками
initDefaultCards();