let formElement = document.querySelector('.popup');

let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__about');
let closeIcon = formElement.querySelector('.popup__close-button');
let saveButton = formElement.querySelector('.popup__save-button');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');

let editIcon = document.querySelector('.profile__edit-button');

nameInput.value = 'Жак-Ив Кусто';
jobInput.value = 'Исследователь океана';

function formOpenHandler () {
  formElement.classList.add('popup_opened');
}

function formSubmitHandler () {
  console.log(nameInput.value);
  console.log(jobInput.value);
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  formElement.classList.remove('popup_opened');
}

function formCloseHandler () {
  formElement.classList.remove('popup_opened');
}

editIcon.addEventListener('click', formOpenHandler);
closeIcon.addEventListener('click', formCloseHandler);
saveButton.addEventListener('click', formSubmitHandler);