//Открытие и закрытие попапа
const profileEditButtonNode = document.querySelector(".profile__edit-button");
const popupCloseButtonNode = document.querySelector(".popup__close-button");
const popupNode = document.querySelector(".popup");
const profileTitleTextNode = document.querySelector(".profile__title-text");
const profileSubtitleTextNode = document.querySelector(".profile__subtitle");
const popupInputTitleNode = document.querySelector(".popup__input_title");
const popupInputSubTitleNode = document.querySelector(".popup__input_subtitle");
const popupSaveButtonNode = document.querySelector(".popup__save-button");
const popupContainerNode = document.querySelector(".popup__container");  
const elementHeartNode = document.querySelector(".element__heart");  


function closePopup() {
    popupNode.classList.remove('popup_opened');
}

profileEditButtonNode.addEventListener('click', function () {
    popupNode.classList.add('popup_opened');
    popupInputTitleNode.value = profileTitleTextNode.textContent;
    popupInputSubTitleNode.value = profileSubtitleTextNode.textContent;
});

popupCloseButtonNode.addEventListener('click', closePopup);

popupContainerNode.addEventListener('submit', function (evt) {
    evt.preventDefault();
    let nameInput = document.querySelector(".popup__input_title"); 
    let jobInput = document.querySelector(".popup__input_subtitle");
    profileTitleTextNode.textContent = nameInput.value;
    profileSubtitleTextNode.textContent = jobInput.value;
    closePopup();
});

elementHeartNode.addEventListener('click', function() {
    elementHeartNode.classList.toggle('element__heart_active');
})




/*
// Находим форму в DOM
let formElement = // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = // Воспользуйтесь инструментом .querySelector()
    let jobInput = // Воспользуйтесь инструментом .querySelector()

    // Получите значение полей из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 
*/