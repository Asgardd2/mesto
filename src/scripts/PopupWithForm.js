import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector,isDisabledSubmitButton,submitFunc) {
        super(popupSelector);
        this._submitFunc = submitFunc;
        this._isDisabledSubmitButton = isDisabledSubmitButton;
        this._getInputValues();
    }

    _getInputValues() {
        this._inputList = this._popupEl.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.id] = input.value);
        return this._formValues;
      }

    setEventListeners() {
        super.setEventListeners();
        this._popupEl.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFunc(this._getInputValues());
        })
    }
    
    setDefaultValues(defaultData) {
        if (defaultData.name) {
            this._popupEl.querySelector('#profile-name').value = defaultData.name;
        }

        if (defaultData.job) {
            this._popupEl.querySelector('#profile-about').value = defaultData.job;
        }
    }
    close () {
       
        this._inputErrors = this._popupEl.querySelectorAll('.popup__error');
        this._inputErrors.forEach(input => input.textContent = '');
        super.close();
    }

    open () {
        super.open();
        if (this._isDisabledSubmitButton) {
            this._popupEl.querySelector('.popup__save-button').classList.add('popup__save-button_disabled')
            this._popupEl.querySelector('.popup__save-button').disabled = true;
        }
        else {
            this._popupEl.querySelector('.popup__save-button').classList.remove('popup__save-button_disabled')
            this._popupEl.querySelector('.popup__save-button').disabled = false;
        }
    }
}