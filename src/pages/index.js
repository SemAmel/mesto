import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';
import {url, token, buttonEditAvatar, validationParameters, profileName, profileJob, editIcon, buttonAddCard, nameInput, jobInput, cardTemplate, userNameSelector, userDescriptionSelector, userAvatarSelector} from '../utils/constants.js';

let userId;

function createCard({ name, link, likes, _id, owner }, userId){
  const card = new Card({name, link, likes, _id, owner, userId, cardTemplate, 
    handleCardClick: (name, link) => {
      popupWithImage.open({name, link});
    },
    handleTrashClick: () => {
      return new Promise(function(resolve, reject){
        popupDeleteCard.open({
          handleDelete: () => {
            if(handleDeleteCard(_id, popupDeleteCard.renderLoading)){
              resolve();
            }
            else {
              reject();
            }
          }});
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
  return card.create();
}

function openPopupEditProfile(){
  popupEditProfile.setInputValues(userData.getUserInfo());
  popupEditProfile.open();
}

function openPopupAddItem(){
  popupAddItem.open();
}

function openPopupEditAvatar(){
  popupEditAvatar.open();
}

function handleAddCard(cardName, cardLink, render){
  render(true);
  api.addNewCard(cardName, cardLink)
    .then((res) => {
      cardsSection.addItem(res);
      popupAddItem.close();
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
    .then((res) => {
      userData.setUserInfo(res);
      popupEditAvatar.close();
    })
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
    .then((res) => {
      userData.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(`${err}`);
    })
    .finally(() => {
      render(false);
    });
}

function handleDeleteCard(cardId, render){
  render(true);
  return api.deleteCard(cardId)
    .then(() => {
      popupDeleteCard.close();
      return true;
    })
    .catch((err) => {
      console.log(`${err}`);
      return false;
    })
    .finally(() => {
      render(false);
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
    return createCard(el, userId);
  }
}, '.gallery__items');

// ДОБАВЛЕНИЕ СОБЫТИЙ ВСЕМ ФОРМАМ

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

    // в объект записываем под именем формы её валидацию
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationParameters);

// СОБЫТИЯ для popup "изменение профиля":

const popupEditProfile = new PopupWithForm({
  handleFormSubmit: ({name, about}) => {
    handleEditUserInfo(name, about, popupEditProfile.renderLoading );
  }
},'.popup_type_edit-profile');
popupEditProfile.setEventListeners();

editIcon.addEventListener('click', () => {
  openPopupEditProfile();
  formValidators['form_edit-profile'].resetValidation();
});

buttonEditAvatar.addEventListener('click', () => {
  openPopupEditAvatar();
  formValidators['form_edit-avatar'].resetValidation();
});

// СОБЫТИЯ для popup "добавление места":

const popupAddItem = new PopupWithForm({
  handleFormSubmit: ({'place-name': name, link}) => {
    handleAddCard(name, link, popupAddItem.renderLoading );
  }
},'.popup_type_add-item');
popupAddItem.setEventListeners();

buttonAddCard.addEventListener('click',() => {
  openPopupAddItem();
  formValidators['form_add-item'].resetValidation();
});

// СОБЫТИЯ для popup "изменение фотки аватара":

const popupEditAvatar = new PopupWithForm({
  handleFormSubmit: ({link}) => {
    handleEditUserAvatar(link, popupEditAvatar.renderLoading );
  }
},'.popup_type_edit-avatar');
popupEditAvatar.setEventListeners();

// СОБЫТИЯ для popup "изображение карточки":

const popupWithImage = new PopupWithImage('.popup_type_enlargement');
popupWithImage.setEventListeners();

// СОБЫТИЯ для popup "удаление карточки":

const popupDeleteCard = new PopupWithConfirmation('.popup_type_delete');
popupDeleteCard.setEventListeners();

// ЗАГРУЗКА МЕСТ И ИНФОРМАЦИИ О ПРОФИЛЕ ПРИ ЗАГРУЗКЕ САЙТА

Promise.all([api.getInitialUserInfo(), api.getInitialCards()])
  .then(([UserInfo, InitialCards]) => {
    userData.setUserInfo(UserInfo);
    userId = UserInfo._id;

    cardsSection.renderItems(InitialCards.reverse());
  })
  .catch((err) => {
    console.log(`${err}`);
  });