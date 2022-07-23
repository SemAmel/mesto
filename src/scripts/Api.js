export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authorization = headers.authorization;
  }

  _checkResponse(res){
    if(res.ok){
      return res.json();
    }
    else {
      //return Promise.reject(res);
      return res.text().then(text => {throw new Error(text)});
    }
  }

  getInitialUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then(this._checkResponse)
      .then((res) => {
        return res;
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then(this._checkResponse)
      .then((res) => {
        return res;
      });
  }

  editUserInfo(userName, userAbout){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    })
      .then(this._checkResponse)
      .then((res) => {
        return res;
      });
  }

  addNewCard(cardName, cardLink){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
      .then(this._checkResponse)
      .then((res) => {
        return res;
      });
  }

  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._authorization}`
      },
    })
      .then(this._checkResponse)
      .catch((err) => {
        // renderError(`Ошибка: ${err}`);
        console.log(`Ошибка в func "deleteCard": ${err}`);
        return false;
      });
  }

  likeCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `${this._authorization}`
      },
    })
      .then(this._checkResponse)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        // renderError(`Ошибка: ${err}`);
        console.log(`Ошибка в func "likeCard": ${err}`);
      });
  }

  deleteLikeCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then(this._checkResponse)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        // renderError(`Ошибка: ${err}`);
        console.log(`Ошибка в func "": ${err}`);
      });
  }

  editUserAvatar(link){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._checkResponse)
      .catch((err) => {
        // renderError(`Ошибка: ${err}`);
        console.log(`Ошибка в func "": ${err}`);
      });
  }
}