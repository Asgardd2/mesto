export default class Card {

    constructor(cardObject, templateCardElement, handleOpenImg, handleDelCard, handleLikeCard) {
      this._handleOpenImg = handleOpenImg;
      this._handleDelCard = handleDelCard;  
      this._changeLikeHeart = handleLikeCard;
      this._cardObject = cardObject; 
      this._cardEl = templateCardElement.content.querySelector('.element').cloneNode(true);


    }

    setLike() {
      this._elementHeart.classList.add('element__heart_active');
    }

    getCardOwnerId() {
      return this._cardObject._idOwner;
    }

    getUserLikes() {
      return this._cardObject.likes;
    }
  
    _setHtmlMarkup(newCard) {
      this._titleElement.textContent = newCard.name;
      this._imageElement.src = newCard.link;
      this._imageElement.alt = newCard.name;
      this._elementCountOfLikes.textContent = newCard.likes.length;
    }
  
    _setCardEventListeners () {
      this._elementBin.addEventListener("click",(evt) => {
        this._handleDelCard(evt,this._cardObject._idCard);
      } );
      this._elementHeart.addEventListener("click", (evt) => {
        this._changeLikeHeart(evt,this._cardObject._idCard)
      });
      this._imageElement.addEventListener("click", () => { this._handleOpenImg(this._cardObject)}); 
    }

    /*
    _deleteCard (evt) {
      this._cardEl.remove();
    }
    */

  
    getFullObj (isWithBin)  {
      this._titleElement = this._cardEl.querySelector(".element__text");
      this._imageElement = this._cardEl.querySelector(".element__image");
      this._elementHeart = this._cardEl.querySelector(".element__heart");
      this._elementBin = this._cardEl.querySelector(".element__bin");
      if (!isWithBin) {
        this._elementBin.remove();
      }
      this._elementCountOfLikes = this._cardEl.querySelector(".element__heartLikes");
      this._setHtmlMarkup(this._cardObject);
      this._setCardEventListeners();
      return this._cardEl;
    }


    
  }

  export {Card};