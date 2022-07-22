
// ЛИЧНЫЕ ДАННЫЕ ДЛЯ РАБОТЫ С СЕРВЕРОМ
const url = 'https://mesto.nomoreparties.co/v1/cohort-45';
const token = '541a5b47-8b22-4068-8020-177c840b7796';

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
const buttonEditAvatar = document.querySelector('.profile__edit-avatar-button');


const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_about');

const gallery = document.querySelector('.gallery__items');
const cardTemplate = gallery.querySelector('#item').content;

const userNameSelector = '.profile__name';
const userDescriptionSelector = '.profile__about';
const userAvatarSelector = '.profile__avatar';

export {url, token, buttonEditAvatar, validationParameters, profileName, profileJob, editIcon, buttonAddCard, nameInput, jobInput, cardTemplate, userNameSelector, userDescriptionSelector, userAvatarSelector};