export default class UserInfo{
  constructor({userNameSelector, userDescriptionSelector, userAvatarSelector}){
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo(){
    return {
      name: this._userName.textContent,
      about: this._userDescription.textContent,
      avatar: this._userAvatar
    };
  }

  getId(){
      return {
        _id: this._userId,
      };
  }

  setUserInfo({name, about, avatar, _id}){
    this._userName.textContent = name;
    this._userDescription.textContent = about;
    this._userAvatar.src = avatar;
    this._userId = _id;
  }
}