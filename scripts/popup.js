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

function closePopupEscape(evt) {
  if (evt.key === 'Escape'){
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function closePopupClick(evt){
  const popup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')){
    closePopup(popup);
  }
}

export {openPopup, closePopup};