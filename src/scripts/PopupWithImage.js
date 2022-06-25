import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor({name, link}, popupSelector){
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._imageBig = this._popup.querySelector('.popup__big-image');
    this._placeName = this._popup.querySelector('.popup__place-name');
  }

  open(){
    this._placeName.textContent = this._name;
    this._imageBig.src = this._link;
    this._imageBig.alt = this._name;

    super.open();
  }
}