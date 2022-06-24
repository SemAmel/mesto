import Popup from './Popup.js';
import {imageBig, placeName} from './constants.js';

export default class PopupWithImage extends Popup {
  constructor({name, link}, popupSelector){
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open(){
    placeName.textContent = this._name;
    imageBig.src = this._link;
    imageBig.alt = this._name;

    super.open();
  }
}