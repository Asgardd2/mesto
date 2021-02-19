import Popup from './Popup.js';
export default class PopupWithQuestionDeleteCard extends Popup {
    constructor(popupSelector,buttonSelector,closeKey,approveFunc) {
        super(popupSelector,closeKey);
        this._approveFunc = approveFunc;
        this._buttonEl = document.querySelector(popupSelector).querySelector(buttonSelector);

    }

    setEventListeners() {
        super.setEventListeners();
        this._buttonEl.addEventListener('click', (evt) => {
            this._approveFunc();
        })
    }

    open(evt,cardId) {
        super.open();
        this.cardId = cardId;
        this.cardEl = evt.target.closest('.element');
    }

}