let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form')

let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_about');
let closeIcon = popup.querySelector('.popup__close-button');
let saveButton = popup.querySelector('.popup__save-button');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');

let editIcon = document.querySelector('.profile__edit-button');

function popupOpenHandler () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupCloseHandler();
}

function popupCloseHandler () {
  popup.classList.remove('popup_opened');
}

editIcon.addEventListener('click', popupOpenHandler);
closeIcon.addEventListener('click', popupCloseHandler);
popupForm.addEventListener('submit', formSubmitHandler);