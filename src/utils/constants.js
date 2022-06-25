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

const validationParameters = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
	inactiveButtonAttribute: 'disabled'
}

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
const editIcon = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');


const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_about');

const gallery = document.querySelector('.gallery__items');
const cardTemplate = gallery.querySelector('#item').content;

const userNameSelector = '.profile__name';
const userDescriptionSelector = '.profile__about';

export {initialCards, validationParameters, profileName, profileJob, editIcon, buttonAddCard, nameInput, jobInput, cardTemplate, userNameSelector, userDescriptionSelector};