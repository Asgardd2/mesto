import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector,closeKey) {
        super(popupSelector,closeKey);        
        this._popupImgEl = this._popupEl.querySelector(".popup__image");
        this._popupImgDescrEl = this._popupEl.querySelector(".popup__image-description");
    }

    open (data) {
        this._popupImgEl.src =  data.link;
        this._popupImgEl.alt =  data.name;
        this._popupImgDescrEl.textContent = data.name;
        super.open();
    }
}
