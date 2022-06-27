export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._setEventListenerEscClose();
  }
 
  close() {
    this._removeEventListeners();
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape'){
      this.close();
    }
  }

  _handleClickClose(evt){
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')){
      this.close();
    }
  }

  setEventListeners(){
    this._setEventListenerClickClose();
  }

  _setEventListenerClickClose(){
    document.addEventListener('click', (evt) => {
      this._handleClickClose(evt);
    });
  }

  _setEventListenerEscClose(){
    document.addEventListener('keydown', this._handleEscClose);
  }

  _removeEventListeners(){
    this._removeEventListenerEscClose();
  }

  _removeEventListenerEscClose(){
    document.removeEventListener('keydown', this._handleEscClose);
  }
}