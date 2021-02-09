import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

    }

    open (data) {
        this._popupEl.querySelector(".popup__image").src =  data.link;
        this._popupEl.querySelector(".popup__image").alt =  data.name;
        this._popupEl.querySelector(".popup__image-description").textContent = data.name;
        super.open();
    }
}
