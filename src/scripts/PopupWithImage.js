import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector,closeKey) {
        super(popupSelector,closeKey);
       
    }

    open (data) {
        const popupImgEl = this._popupEl.querySelector(".popup__image");
        const popupImgDescrEl = this._popupEl.querySelector(".popup__image-description");
        popupImgEl.src =  data.link;
        popupImgEl.alt =  data.name;
        popupImgDescrEl.textContent = data.name;
        super.open();
    }
}
