import '../pages/index.css';
import {initialCards} from './array.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';
// import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {validationParameters, profileName, profileJob, editIcon, buttonAddCard, nameInput, jobInput, gallery, cardTemplate, userNameSelector, userDescriptionSelector} from './constants.js';


function createCard(name, link){
  const card = new Card({place: name, link, cardTemplate, 
    handleCardClick: (name, link) => {
      const popupWithImage = new PopupWithImage({name, link}, '.popup_type_enlargement');
      popupWithImage.setEventListeners();
      popupWithImage.open();
    }
  }).create();
  return card;
}

function openPopupEditProfile(){
  nameInput.value =  profileName.textContent;
  jobInput.value = profileJob.textContent;

  popupEditProfile.open();
}

function openPopupAddItem(){
  popupAddItem.open();
}

// СОБЫТИЯ для popup "изменение профиля":

const popupEditProfile = new PopupWithForm({
  handleFormSubmit: ({name, about}) => {
    const userData = new UserInfo({userNameSelector, userDescriptionSelector});
    userData.setUserInfo({name, about});

    popupEditProfile.close();
  }
},'.popup_type_edit-profile');

popupEditProfile.setEventListeners();

editIcon.addEventListener('click', openPopupEditProfile);

// СОБЫТИЯ для popup "добавление места":

const popupAddItem = new PopupWithForm({
  handleFormSubmit: ({'place-name': name, link}) => {
    const card = createCard(name, link);
    cardsSection.addItem(card);

    popupAddItem.close();
  }
},'.popup_type_add-item');

popupAddItem.setEventListeners();

buttonAddCard.addEventListener('click', openPopupAddItem);

// ДОБАВЛЕНИЕ СОБЫТИЙ ВСЕМ ФОРМАМ

const formList = Array.from(document.querySelectorAll(validationParameters.formSelector));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationParameters, formElement);
  formValidator.enableValidation();
  editIcon.addEventListener('click',() => {
    formValidator.disableButton();
  });
  buttonAddCard.addEventListener('click',() =>{
    formValidator.disableButton();
  });
});

// ДОБАВЛЕНИЕ МЕСТ ПРИ ЗАГРУЗКЕ САЙТА

const cardsSection = new Section({items: initialCards, 
  renderer: (el) => {
    const card = createCard(el.name, el.link);
    cardsSection.addItem(card);
  }
}, '.gallery__items');

cardsSection.renderItems();