export default class FormValidator {
  constructor(validationParameters, formElement){
    this._validationParameters = validationParameters;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._validationParameters.submitButtonSelector);
  }

  enableValidation(){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationParameters.inputSelector));
    this._toggleButtonState();
    this._inputList.forEach((_inputElement) => {
      _inputElement.addEventListener('input', () => {
        this._checkInputValidity(_inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._validationParameters.inactiveButtonClass);
      this._buttonElement.setAttribute(this._validationParameters.inactiveButtonAttribute, true);
    } 
    else {
      this._buttonElement.classList.remove(this._validationParameters.inactiveButtonClass);
      this._buttonElement.removeAttribute(this._validationParameters.inactiveButtonAttribute);
    } 
  }

  _hasInvalidInput () {
    return this._inputList.some((_inputElement) => {
      return !_inputElement.validity.valid;
    });
  }

  _checkInputValidity(_inputElement) {
    if (!_inputElement.validity.valid) {
      this._showInputError(_inputElement, _inputElement.validationMessage);
    } else {
      this._hideInputError(_inputElement);
    }
  }

  _showInputError(_inputElement, _errorMessage) {
    const _errorElement = this._formElement.querySelector(`.${_inputElement.id}-error`);
    _inputElement.classList.add(this._validationParameters.inputErrorClass);
    _errorElement.textContent = _errorMessage;
    _errorElement.classList.add(this._validationParameters.errorClass);
  }
  
  _hideInputError(_inputElement) {
    const _errorElement = this._formElement.querySelector(`.${_inputElement.id}-error`);
    _inputElement.classList.remove(this._validationParameters.inputErrorClass);
    _errorElement.classList.remove(this._validationParameters.errorClass);
    _errorElement.textContent = '';
  }

  disableButton() {
    this._buttonElement.classList.add(this._validationParameters.inactiveButtonClass);
    this._buttonElement.setAttribute(this._validationParameters.inactiveButtonAttribute, true);
  }

  disableErrors(){
    this._inputList.forEach((_inputElement) => {
      this._hideInputError(_inputElement);
    });
  }
}