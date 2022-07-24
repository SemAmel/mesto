import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._imageBig = this._popup.querySelector('.popup__big-image');
    this._placeName = this._popup.querySelector('.popup__place-name');
  }

  open({ name, link }){
    this._placeName.textContent = name;
    this._imageBig.src = link;
    this._imageBig.alt = name;

    super.open();
  }
}