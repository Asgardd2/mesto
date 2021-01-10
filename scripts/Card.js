
class Card {

    constructor(cardObject, templateCardElement) {   
      this._cardEl = templateCardElement.content.cloneNode(true);
      this._popupImg = document.querySelector("#popup-img");
      this._popupImgEl = this._popupImg.querySelector(".popup__image");
      this._titleElement = this._cardEl.querySelector(".element__text");
      this._imageElement = this._cardEl.querySelector(".element__image");
      this._elementHeart = this._cardEl.querySelector(".element__heart");
      this._elementBin = this._cardEl.querySelector(".element__bin");
      this._setHtmlMarkup(cardObject);
      this._setCardEventListeners();
    }
  
    _setHtmlMarkup(newCard) {
      this._titleElement.textContent = newCard.name;
      this._imageElement.src = newCard.link;
      this._imageElement.alt = newCard.name;
    }
  
    _setCardEventListeners () {
      this._elementBin.addEventListener("click", this._deleteCard);
      this._elementHeart.addEventListener("click", this._changeLikeHeart);
    }

    _deleteCard (evt) {
      const parentOftarget = evt.target.parentNode;
      const imageElement = parentOftarget.querySelector(".element__image");
      const elementHeart = parentOftarget.querySelector(".element__heart");
      const elementBin = parentOftarget.querySelector(".element__bin");
      elementBin.removeEventListener("click", this._deleteCard);
      elementHeart.removeEventListener("click", this._changeLikeHeart);
      evt.target.closest(".element").remove();
    }
  
    _changeLikeHeart (evt) {
      evt.target.classList.toggle("element__heart_active");
    }
  
    getFullObj ()  {
      return this._cardEl;
    }
    
  }

  export {Card};