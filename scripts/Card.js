import {openPopup} from './index.js';

export default class Card{
  constructor(place, link, cardTemplate){
    this._place = place;
    this._link = link;
    this._cardTemplate = cardTemplate;
  }

  create(){
    this._cardElement = this._cardTemplate.querySelector('.gallery__item').cloneNode(true);
    this._cardElement.querySelector('.gallery__place').textContent = this._place;
    this._image = this._cardElement.querySelector('.gallery__image');
    this._image.src = this._link;
    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.gallery__trash').addEventListener('click', () => {
      this._cardElement.remove();
    });
  
    this._cardElement.querySelector('.gallery__heart').addEventListener('click', () => {
      this._cardElement.querySelector('.gallery__heart').classList.toggle('gallery__heart_active');
    });
  
    this._image.addEventListener('click', () => {
      this._openPopupEnlargement();
    });
  }
  
  _openPopupEnlargement(){
    this._popupEnlargement = document.querySelector('.popup_type_enlargement');
    this._imageBig = this._popupEnlargement.querySelector('.popup__big-image');
    this._placeName = this._popupEnlargement.querySelector('.popup__place-name');
    this._placeName.textContent = this._place;
    this._imageBig.src = this._link;
    openPopup(this._popupEnlargement);
  }

}