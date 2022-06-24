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


const popupEnlargement = document.querySelector('.popup_type_enlargement');

const imageBig = popupEnlargement.querySelector('.popup__big-image');
const placeName = popupEnlargement.querySelector('.popup__place-name');

const userNameSelector = '.profile__name';
const userDescriptionSelector = '.profile__about';

export {validationParameters, profileName, profileJob, editIcon, buttonAddCard, nameInput, jobInput, gallery, cardTemplate, imageBig, placeName, userNameSelector, userDescriptionSelector};