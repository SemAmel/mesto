import './index.css';
import FormValidator from '../scripts/FormValidator.js';
import Card from '../scripts/Card.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithConfirmation from '../scripts/PopupWithConfirmation.js';
import Api from '../scripts/Api.js';
import {url, token, buttonEditAvatar, validationParameters, profileName, profileJob, editIcon, buttonAddCard, nameInput, jobInput, cardTemplate, userNameSelector, userDescriptionSelector, userAvatarSelector} from '../utils/constants.js';

let userId;

function createCard({ name, link, likes, _id, owner }, userId){
  const card = new Card({name, link, likes, _id, owner, userId, cardTemplate, 
    handleCardClick: (name, link) => {
      const popupWithImage = new PopupWithImage({name, link}, '.popup_type_enlargement');
      popupWithImage.setEventListeners();
      popupWithImage.open();
    },
    handleTrashClick: () => {
      return new Promise(function(resolve, reject){
        const popupDeleteCard = new PopupWithConfirmation({
          handleSubmitPopupWithConfirmation: () => {
            popupDeleteCard.close();
            resolve();
            handleDeleteCard(_id);
          },
          handleCancellationPopupWithConfirmation: () => {
            reject();
          }
        }, '.popup_type_delete');
      
        popupDeleteCard.setEventListeners();
        popupDeleteCard.open();
      });
      
    },
    handleLikeClick: () => {
      if(card.сheckLike()){
        api.deleteLikeCard(_id)
          .then((res) => {card.renderLikes(res, false);})
          .catch((err) => {
            console.log(`${err}`);
          });
      }
      else{
        api.likeCard(_id)
          .then((res) => {card.renderLikes(res, true);})
          .catch((err) => {
            console.log(`${err}`);
          });
      }
    }
  });
  const cardEl = card.create();
  return cardEl;
}

function openPopupEditProfile(){
  nameInput.value =  profileName.textContent;
  jobInput.value = profileJob.textContent;

  popupEditProfile.open();
}

function openPopupAddItem(){
  popupAddItem.open();
}

function openPopupEditAvatar(){
  popupEditAvatar.open();
}

function handleSetUserInfo(){
  api.getInitialUserInfo()
    .then(({name, about, avatar, _id}) => {
      userData.setUserInfo(name, about);
      userData.setAvatar(avatar);
      userData.setId(_id);
      userId = _id;
    })
    .catch((err) => {
      console.log(`${err}`);
    });
}

function handleRenderInitialCards(){
  api.getInitialCards()
    .then((res) => {
      cardsSection.renderItems(res.reverse());
    })
    .catch((err) => {
      console.log(`${err}`);
    });
}

function handleAddCard(cardName, cardLink, render){
  render(true);
  api.addNewCard(cardName, cardLink)
    .then((res) => {
      //const card = createCard(res);
      cardsSection.addItem(createCard(res, userId));
    })
    .catch((err) => {
      console.log(`${err}`);
    })
    .finally(() => {
      render(false);
    });
}

function handleEditUserAvatar(link, render){
  render(true);
  api.editUserAvatar(link)
    .catch((err) => {
      console.log(`${err}`);
    })
    .finally(() => {
      render(false);
    });
}

function handleEditUserInfo(name, about, render){
  render(true);
  api.editUserInfo(name, about)
    .then(({name, about}) => {
      userData.setUserInfo(name, about);
    })
    .catch((err) => {
      console.log(`${err}`);
    })
    .finally(() => {
      render(false);
    });
}

function handleDeleteCard(cardId){
  api.deleteCard(cardId)
    .catch((err) => {
      console.log(`${err}`);
    });
}

// Инициализация класса Api 

const api = new Api({
  baseUrl: url,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

// Инициализация класса UserInfo 

const userData = new UserInfo({userNameSelector, userDescriptionSelector, userAvatarSelector});

// Инициализация класса Section 

const cardsSection = new Section({ 
  renderer: (el) => {
    const card = createCard(el, userId);
    cardsSection.addItem(card);
  }
}, '.gallery__items');

// СОБЫТИЯ для popup "изменение профиля":

const popupEditProfile = new PopupWithForm({
  handleFormSubmit: ({name, about}) => {
    userData.setUserInfo(name, about);
    debugger;
    handleEditUserInfo(name, about, popupEditProfile.renderSaving);
    popupEditProfile.close();
  }
},'.popup_type_edit-profile');

popupEditProfile.setEventListeners();

editIcon.addEventListener('click', openPopupEditProfile);

buttonEditAvatar.addEventListener('click', openPopupEditAvatar);

// СОБЫТИЯ для popup "добавление места":

const popupAddItem = new PopupWithForm({
  handleFormSubmit: ({'place-name': name, link}) => {
    handleAddCard(name, link, popupAddItem.renderSaving);
    popupAddItem.close();
  }
},'.popup_type_add-item');

popupAddItem.setEventListeners();

buttonAddCard.addEventListener('click', openPopupAddItem);

// СОБЫТИЯ для popup "изменение фотки аватара":

const popupEditAvatar = new PopupWithForm({
  handleFormSubmit: ({link}) => {
    userData.setAvatar(link);
    handleEditUserAvatar(link, popupEditAvatar.renderSaving);
    popupEditAvatar.close();
  }
},'.popup_type_edit-avatar');

popupEditAvatar.setEventListeners();

// ДОБАВЛЕНИЕ СОБЫТИЙ ВСЕМ ФОРМАМ

const formList = Array.from(document.querySelectorAll(validationParameters.formSelector));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationParameters, formElement);
  formValidator.enableValidation();
  editIcon.addEventListener('click',() => {
    formValidator.disableButton();
    formValidator.disableErrors();
  });
  buttonAddCard.addEventListener('click',() =>{
    formValidator.disableButton();
    formValidator.disableErrors();
  });
  buttonEditAvatar.addEventListener('click',() =>{
    formValidator.disableButton();
    formValidator.disableErrors();
  });
});

// ЗАГРУЗКА МЕСТ И ИНФОРМАЦИИ О ПРОФИЛЕ ПРИ ЗАГРУЗКЕ САЙТА

handleSetUserInfo();
handleRenderInitialCards();