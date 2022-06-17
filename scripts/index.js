import {initialCards} from './array.js';
import {validationParameters} from './object.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';

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


function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
  document.addEventListener('click', closePopupClick);
}

function closePopup (popup) {
  document.removeEventListener('keydown', closePopupEscape);
  document.removeEventListener('click', closePopupClick);
  popup.classList.remove('popup_opened');
}

function addCard (card){
  gallery.prepend(card);
}

function closePopupEscape(evt) {
  if (evt.key === 'Escape'){
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function openPopupEditProfile(){
  nameInput.value =  profileName.textContent;
  jobInput.value = profileJob.textContent;

  disableButton(popupEditProfile, validationParameters);

  openPopup(popupEditProfile);
}

function closePopupEditProfile(){
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup (popupEditProfile);
}

function openPopupAddItem(){
  disableButton(popupAddItem, validationParameters);
  formPopupAddItem.reset();

  openPopup(popupAddItem);
}

function closePopupAddItem(){
  const card = createCard(placeInput.value, linkInput.value);
  addCard(card);
  closePopup (popupAddItem);
}

function closePopupClick(evt){
  const popup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')){
    closePopup(popup);
  }
}

function disableButton(popup, {submitButtonSelector, inactiveButtonClass, inactiveButtonAttribute, ...rest}) {
  const buttonElement = popup.querySelector(submitButtonSelector);
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute(inactiveButtonAttribute, true);
}

// СОБЫТИЯ для popup "изменение профиля":

editIcon.addEventListener('click', openPopupEditProfile);

formPopupEditProfile.addEventListener('submit', closePopupEditProfile);

// СОБЫТИЯ для popup "добавление места":

buttonAddCard.addEventListener('click', openPopupAddItem);

formPopupAddItem.addEventListener('submit', closePopupAddItem);

// ДОБАВЛЕНИЕ СОБЫТИЙ ВСЕМ ФОРМАМ

const formList = Array.from(document.querySelectorAll(validationParameters.formSelector));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationParameters, formElement);
  formValidator.enableValidation();
});
// ДОБАВЛЕНИЕ МЕСТ ПРИ ЗАГРУЗКЕ САЙТА

initialCards.forEach((el)=>{
  const card = new Card(el.name, el.link, cardTemplate).create();
  gallery.append(card);
});

export {openPopup};