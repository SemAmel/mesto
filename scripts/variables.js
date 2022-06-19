const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
const editIcon = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');


const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const formPopupEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_about');


const popupAddItem = document.querySelector('.popup_type_add-item');

const formPopupAddItem = popupAddItem.querySelector('.popup__form');
const placeInput = popupAddItem.querySelector('.popup__input_type_place-name');
const linkInput = popupAddItem.querySelector('.popup__input_type_link');

const gallery = document.querySelector('.gallery__items');
const cardTemplate = gallery.querySelector('#item').content;


const popupEnlargement = document.querySelector('.popup_type_enlargement');

const imageBig = popupEnlargement.querySelector('.popup__big-image');
const placeName = popupEnlargement.querySelector('.popup__place-name');

export {profileName, profileJob, editIcon, buttonAddCard, popupEditProfile, formPopupEditProfile, nameInput, jobInput, popupAddItem, formPopupAddItem, placeInput, linkInput, gallery, cardTemplate, popupEnlargement, imageBig, placeName};