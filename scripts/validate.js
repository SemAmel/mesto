
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass, ...rest}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass, ...rest}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass, inactiveButtonAttribute, ...rest}) => {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(inactiveButtonClass);
	buttonElement.setAttribute(inactiveButtonAttribute, true);
  } 
  else {
  buttonElement.classList.remove(inactiveButtonClass);
	buttonElement.removeAttribute(inactiveButtonAttribute);
  } 
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, rest);
  });
};

const disableButton = (popup, {submitButtonSelector, inactiveButtonClass, inactiveButtonAttribute, ...rest}) => {
	const buttonElement = popup.querySelector(submitButtonSelector);
	buttonElement.classList.add(inactiveButtonClass);
	buttonElement.setAttribute(inactiveButtonAttribute, true);
};

