export default class Popup {
    constructor(popupSelector) {
        this._popupEl = document.querySelector(popupSelector);
    }

    open() {
        this._popupEl.classList.add("popup_opened");
    }

    close() {
        this._popupEl.classList.remove("popup_opened");
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close(evt);
        }
    }   

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popupEl.addEventListener("mousedown",(evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup__save-button')) {
                this.close();
            }
        });
    }
}
