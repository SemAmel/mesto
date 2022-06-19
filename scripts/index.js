import {initialCards} from './array.js';
import {validationParameters} from './object.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {openPopup, closePopup} from './popup.js';
import {profileName, profileJob, editIcon, buttonAddCard, popupEditProfile, formPopupEditProfile, nameInput, jobInput, popupAddItem, formPopupAddItem, placeInput, linkInput, gallery, cardTemplate} from './variables.js';


function createCard(name, link){
  const card = new Card(name, link, cardTemplate).create();
  return card;
}

function addCard (card){
  gallery.prepend(card);
}

function openPopupEditProfile(){
  nameInput.value =  profileName.textContent;
  jobInput.value = profileJob.textContent;

  const formValidator = new FormValidator(validationParameters, formPopupEditProfile);
  formValidator.disableButton();

  openPopup(popupEditProfile);
}

function submitPopupEditProfile(){
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup (popupEditProfile);
}

function openPopupAddItem(){
  const formValidator = new FormValidator(validationParameters, formPopupAddItem);
  formValidator.disableButton();
  formPopupAddItem.reset();

  openPopup(popupAddItem);
}

function submitPopupAddItem(){
  const card = createCard(placeInput.value, linkInput.value);
  addCard(card);
  closePopup (popupAddItem);
}

// СОБЫТИЯ для popup "изменение профиля":

editIcon.addEventListener('click', openPopupEditProfile);

formPopupEditProfile.addEventListener('submit', submitPopupEditProfile);

// СОБЫТИЯ для popup "добавление места":

buttonAddCard.addEventListener('click', openPopupAddItem);

formPopupAddItem.addEventListener('submit', submitPopupAddItem);

// ДОБАВЛЕНИЕ СОБЫТИЙ ВСЕМ ФОРМАМ

const formList = Array.from(document.querySelectorAll(validationParameters.formSelector));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationParameters, formElement);
  formValidator.enableValidation();
});
// ДОБАВЛЕНИЕ МЕСТ ПРИ ЗАГРУЗКЕ САЙТА

initialCards.forEach((el)=>{
  const card = createCard(el.name, el.link);
  gallery.append(card);
});