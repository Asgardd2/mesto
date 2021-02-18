import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector,submitFunc,closeKey) {
        super(popupSelector,closeKey);
        this._submitFunc = submitFunc;

    }

    getInputValues() {
        this._inputList = this._popupEl.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.id] = input.value);
        return this._formValues;
      }

    setEventListeners() {
        super.setEventListeners();
        this._popupEl.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFunc(this.getInputValues());
        })
    }
    
    setDefaultValues(defaultData) {
        defaultData.forEach(el => {
            this._popupEl.querySelector(el[0]).value = el[1];
        })
    }
    close () {
       
        this._inputErrors = this._popupEl.querySelectorAll('.popup__error');
        this._inputErrors.forEach(input => input.textContent = '');
        super.close();
    }

    open () {
        super.open();
    }
}