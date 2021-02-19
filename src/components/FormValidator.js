class FormValidator {

    constructor(validationConfig,form,popupObj) {
        this._form = form;
        this._popupObj = popupObj;
        this._validationConfig = validationConfig;
        this._inputsList = this._form.querySelectorAll(validationConfig.inputSelector);
        this._submitButton = this._form.querySelector(validationConfig.submitButtonSelector);
    }

    _checkInputValidity (input) {
        if (!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }

    _showError (input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._validationConfig.inputErrorClass);
    }

    _hideError (input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = '';
        input.classList.remove(this._validationConfig.inputInvalidClass);
        input.classList.remove(this._validationConfig.inputErrorClass);
    }

    setButtonState(isActive) {
        if (isActive) {
            this._submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._validationConfig.inactiveButtonClass);
            this._submitButton.disabled = true; 
        }
    }

    resetValidation() {
        this._inputsList.forEach((input) => {
            this._hideError(input)
        })
        this._setButtonState(this._form.checkValidity());
    } 

    _setEventListeners(input) {
        input.addEventListener('input', () => {
            this._checkInputValidity(input);
            this.setButtonState(this._form.checkValidity());
        })
    }

    /*
    _submitForm (evt) {
        evt.preventDefault();
        this._popupObj.close();
    }
    */

    enableValidation () {
        this._inputsList.forEach((input) => {
            this._setEventListeners(input);
            //this._form.addEventListener('submit',this._submitForm.bind(this));

        });

    }

}

export {FormValidator};