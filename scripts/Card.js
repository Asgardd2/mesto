class Card {

    constructor(cardObject, templateCardElement, handleOpenImg) {
      this._handleOpenImg = handleOpenImg; 
      this._cardObject = cardObject; 
      this._cardEl = templateCardElement.content.cloneNode(true);
    }
  
    _setHtmlMarkup(newCard) {
      this._titleElement.textContent = newCard.name;
      this._imageElement.src = newCard.link;
      this._imageElement.alt = newCard.name;
    }
  
    _setCardEventListeners () {
      this._elementBin.addEventListener("click", this._deleteCard);
      this._elementHeart.addEventListener("click", this._changeLikeHeart);
      this._imageElement.addEventListener("click", () => { this._handleOpenImg(this._cardObject)}); 
    }

    _deleteCard (evt) {
      evt.target.closest(".element").remove();
    }
  
    _changeLikeHeart (evt) {
      evt.target.classList.toggle("element__heart_active");
    }
  
    getFullObj ()  {
      this._titleElement = this._cardEl.querySelector(".element__text");
      this._imageElement = this._cardEl.querySelector(".element__image");
      this._elementHeart = this._cardEl.querySelector(".element__heart");
      this._elementBin = this._cardEl.querySelector(".element__bin");
      this._setHtmlMarkup(this._cardObject);
      this._setCardEventListeners();
      return this._cardEl;
    }


    
  }

  export {Card};