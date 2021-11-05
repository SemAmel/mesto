function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function addCard (card){
  gallery.prepend(card);
}

function createCard(place, link){
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);
  cardElement.querySelector('.gallery__place').textContent = place;
  const image = cardElement.querySelector('.gallery__image');
  image.src = link;

  cardElement.querySelector('.gallery__trash').addEventListener('click', function(){
    const listItem = this.closest('.gallery__item');
    listItem.remove();
  });

  cardElement.querySelector('.gallery__heart').addEventListener('click', function(){
    this.classList.toggle('gallery__heart_active');
  });

  image.addEventListener('click', function(){
    openPopup(popupEnlargement);

    placeName.textContent = place;
    imageBig.src = link;

    buttonClosePopupEnlargement.addEventListener('click', function(){
      closePopup(popupEnlargement);
    });
  });
  return cardElement;
}


const gallery = document.querySelector('.gallery__items');
const cardTemplate = gallery.querySelector('#item').content;

// ДОБАВЛЕНИЕ МЕСТ ПРИ ЗАГРУЗКЕ САЙТА

initialCards.forEach((el)=>{
  const item = createCard(el.name, el.link);
  gallery.append(item);
});



const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
const editIcon = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');


const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const formPopupEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_about');
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__close-button');


const popupAddItem = document.querySelector('.popup_type_add-item');

const formPopupAddItem = popupAddItem.querySelector('.popup__form');
const placeInput = popupAddItem.querySelector('.popup__input_type_place-name');
const linkInput = popupAddItem.querySelector('.popup__input_type_link');
const buttonClosePopupAddItem = popupAddItem.querySelector('.popup__close-button');


const popupEnlargement = document.querySelector('.popup_type_enlargement');

const imageBig = popupEnlargement.querySelector('.popup__big-image');
const placeName = popupEnlargement.querySelector('.popup__place-name');
const buttonClosePopupEnlargement = popupEnlargement.querySelector('.popup__close-button');


// СОБЫТИЯ для popup "изменение профиля":

editIcon.addEventListener('click', function (){
  openPopup (popupEditProfile);
  nameInput.value =  profileName.textContent;
  jobInput.value = profileJob.textContent;
});

buttonClosePopupEditProfile.addEventListener('click', function(){
  closePopup (popupEditProfile);
});

formPopupEditProfile.addEventListener('submit', function(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup (popupEditProfile);
});

// СОБЫТИЯ для popup "добавление места":

buttonAddCard.addEventListener('click', function(){
  openPopup(popupAddItem);
  placeInput.value = null; 
  linkInput.value = null;
});

buttonClosePopupAddItem.addEventListener('click', function(){
  closePopup (popupAddItem);
});

formPopupAddItem.addEventListener('submit', function(evt){
  evt.preventDefault();
  const card = createCard(placeInput.value, linkInput.value);
  addCard(card);
  closePopup (popupAddItem);
});