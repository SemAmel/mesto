export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
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
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    document.addEventListener('click', (evt) => {
      this._handleClickClose(evt);
    });
  }

  _removeEventListeners(){
    document.removeEventListener('keydown', () => {
      this._handleEscClose();
    });
    document.removeEventListener('click', () => {
      this._handleClickClose();
    });
  }
}