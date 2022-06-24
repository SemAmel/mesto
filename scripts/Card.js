export default class Card{
  constructor({place, link, cardTemplate, handleCardClick}){
    this._place = place;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  create(){
    this._cardElement = this._cardTemplate.querySelector('.gallery__item').cloneNode(true);
    this._cardElement.querySelector('.gallery__place').textContent = this._place;
    this._image = this._cardElement.querySelector('.gallery__image');
    this._image.src = this._link;
    this._image.alt = this._place;
    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.gallery__trash').addEventListener('click', () => {
      this._cardElement.remove();
      this._cardElement = null;
    });
  
    this._cardElement.querySelector('.gallery__heart').addEventListener('click', () => {
      this._cardElement.querySelector('.gallery__heart').classList.toggle('gallery__heart_active');
    });
  
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._place, this._link);
    });
  }
}