export default class Card{
  constructor({name, link, likes, _id, owner, cardTemplate, handleCardClick, handleTrashClick, handleLikeClick}){
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardId = _id;
    this._ownerId = owner._id;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
  }

  create(){
    this._cardElement = this._cardTemplate.querySelector('.gallery__item').cloneNode(true);
    this._cardElement.querySelector('.gallery__place').textContent = this._name;
    this._image = this._cardElement.querySelector('.gallery__image');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._count = this._cardElement.querySelector('.gallery__count');
    if(this._likes.length > 0){
      this._count.textContent = this._likes.length;
    }
    this._heart = this._cardElement.querySelector('.gallery__heart');
    if(this._likes.some((el) => {return el['_id'] == 'b30421679741bcdf1fdbfff8'})){
      this._heart.classList.add('gallery__heart_active');
    }
    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    if(this._ownerId == 'b30421679741bcdf1fdbfff8'){
      this._cardElement.querySelector('.gallery__trash').addEventListener('click', () => {
        this._handleTrashClick().then(() => {
          this._cardElement.remove();
          this._cardElement = null;
        });
      });
    }
    else{
      this._cardElement.querySelector('.gallery__trash').remove();
    }
  
    this._heart.addEventListener('click', () => {
      this._handleLikeClick();
    });
  
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  renderLikes({likes}, status) {
    this._likes = likes;
    this._heart.classList.toggle('gallery__heart_active');
    console.dir(likes);
    if(!status && this._likes.length == 0){
      this._count.textContent = '';
    }
    else{
      this._count.textContent = this._likes.length;
    }
  }

  сheckLike(){
    // likes.some((el) => {return el['_id'] == 'b30421679741bcdf1fdbfff8'})
    return this._heart.classList.contains('gallery__heart_active');
  }
}