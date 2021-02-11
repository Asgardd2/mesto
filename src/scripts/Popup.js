
export default class Popup {
    constructor(popupSelector,closeKey) {
        this._popupEl = document.querySelector(popupSelector);
        this._closeKey = closeKey;
    }

    open() {
        this._popupEl.classList.add("popup_opened");
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popupEl.classList.remove("popup_opened");
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
        if (evt.key === this._closeKey) {
            this.close(evt);
        }
    }   

    setEventListeners() {
        
        this._popupEl.addEventListener("mousedown",(evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) { 
                this.close();
            }
        });
    }
}
