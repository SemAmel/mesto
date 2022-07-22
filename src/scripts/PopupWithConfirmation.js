import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({handleSubmitPopupWithConfirmation}, popupSelector){
    super(popupSelector);
    this._buttonSubmit = this._popup.querySelector('.popup__button');
    this._handleSubmitPopupWithConfirmation = handleSubmitPopupWithConfirmation;
  }
  
  setEventListeners(){
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click',this._handleSubmitPopupWithConfirmation);
  }
}