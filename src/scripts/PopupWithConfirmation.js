import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({handleSubmitPopupWithConfirmation, handleCancellationPopupWithConfirmation}, popupSelector){
    super(popupSelector);
    this._buttonSubmit = this._popup.querySelector('.popup__button');
    this._handleSubmitPopupWithConfirmation = handleSubmitPopupWithConfirmation;
    this._handleCancellationPopupWithConfirmation = handleCancellationPopupWithConfirmation;
  }
  
  setEventListeners(){
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click',this._handleSubmitPopupWithConfirmation);
  }

  _handleClickClose(evt){
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')){
      this.close();
      this._handleCancellationPopupWithConfirmation();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape'){
      this.close();
      this._handleCancellationPopupWithConfirmation();
    }
  }

  close() {
    super.close();
    this._buttonSubmit.removeEventListener('click',this._handleSubmitPopupWithConfirmation);
  }
}