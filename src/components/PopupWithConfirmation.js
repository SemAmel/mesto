import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._buttonConfirm = this._popup.querySelector('.popup__button');
    this._buttonConfirmText = this._buttonConfirm.textContent;
    this.renderLoading = this.renderLoading.bind(this);
  }

  open({handleDelete}) {
    super.open();
    this._handleDelete = handleDelete;
    this._buttonConfirm.addEventListener('click',this._handleDelete);
  }

  close() {
    super.close();
    this._buttonConfirm.removeEventListener('click',this._handleDelete);
  }

  renderLoading(isLoading, loadingText='Удаление...'){
    if (isLoading){
      this._buttonConfirm.textContent = loadingText;
    }
    else{
      this._buttonConfirm.textContent = this._buttonConfirmText;
    }
  }
}