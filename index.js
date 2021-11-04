const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function popupOpenHandler (popup) {
  popup.classList.add('popup_opened');
}

function popupCloseHandler (popup) {
  popup.classList.remove('popup_opened');
}

function addItemHandler (place, link){
  const item = itemHandler(place, link);
  gallery.prepend(item);
}

function itemHandler(place, link){
  const item = itemTemplate.querySelector('.gallery__item').cloneNode(true);
  item.querySelector('.gallery__place').textContent = place;
  const image = item.querySelector('.gallery__image');
  image.src = link;

  item.querySelector('.gallery__trash').addEventListener('click', function(){
    const listItem = this.closest('.gallery__item');
    listItem.remove();
  });

  item.querySelector('.gallery__heart').addEventListener('click', function(){
    this.classList.toggle('gallery__heart_active');
  });

  image.addEventListener('click', function(){
    popupOpenHandler(popupEnlargement);

    placeName.textContent = place;
    bigImage.src = link;

    closeButton_popupEnlargement.addEventListener('click', function(){
      popupCloseHandler(popupEnlargement);
    });
  });
  return item;
}


const gallery = document.querySelector('.gallery__items');
const itemTemplate = gallery.querySelector('#item').content;

// ДОБАВЛЕНИЕ МЕСТ ПРИ ЗАГРУЗКЕ САЙТА

initialCards.forEach((el)=>{
  const item = itemHandler(el.name, el.link);
  gallery.append(item);
});



const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
const editIcon = document.querySelector('.profile__edit-button');
const addItemButton = document.querySelector('.profile__add-button');


const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const form_popupEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_about');
const closeButton_popupEditProfile = popupEditProfile.querySelector('.popup__close-button');


const popupAddItem = document.querySelector('.popup_type_add-item');

const form_popupAddItem = popupAddItem.querySelector('.popup__form');
const placeInput = popupAddItem.querySelector('.popup__input_type_place-name');
const linkInput = popupAddItem.querySelector('.popup__input_type_link');
const closeButton_popupAddItem = popupAddItem.querySelector('.popup__close-button');


const popupEnlargement = document.querySelector('.popup_type_enlargement');

const bigImage = popupEnlargement.querySelector('.popup__big-image');
const placeName = popupEnlargement.querySelector('.popup__place-name');
const closeButton_popupEnlargement = popupEnlargement.querySelector('.popup__close-button');


// СОБЫТИЯ для popup "изменение профиля":

editIcon.addEventListener('click', function (){
  popupOpenHandler (popupEditProfile);
  nameInput.value =  profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closeButton_popupEditProfile.addEventListener('click', function(){
  popupCloseHandler (popupEditProfile);
});

form_popupEditProfile.addEventListener('submit', function(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupCloseHandler (popupEditProfile);
});

// СОБЫТИЯ для popup "добавление места":

addItemButton.addEventListener('click', function(){
  popupOpenHandler(popupAddItem);
  placeInput.value = null; 
  linkInput.value = null;
});

closeButton_popupAddItem.addEventListener('click', function(){
  popupCloseHandler (popupAddItem);
});

form_popupAddItem.addEventListener('submit', function(evt){
  evt.preventDefault();
  addItemHandler(placeInput.value, linkInput.value);
  popupCloseHandler (popupAddItem);
});