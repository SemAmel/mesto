export default class UserInfo{
  constructor({userNameSelector, userDescriptionSelector}){
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
  }

  getUserInfo(){
    const userData = {};

    userData.name = this._userName.textContent;
    userData.description = this._userDescription.textContent;

    return userData;
  }

  setUserInfo({name, about}){
    this._userName.textContent = name;
    this._userDescription.textContent = about;
  }
}