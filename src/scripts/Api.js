export default class Api {
  constructor({baseUrl, authorization}) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }

  getInitialUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        else {
          return Promise.reject(res.status);
        }
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        // renderError(`Ошибка: ${err}`);
        console.log(`Ошибка в func "getInitialUserInfo": ${err}`);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        else {
          return Promise.reject(res.status);
        }
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        // renderError(`Ошибка: ${err}`);
        console.log(`Ошибка в func "getInitialCards": ${err}`);
      });
  }

  editUserInfo(userName, userAbout){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        else {
          return Promise.reject(res.status);
        }
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        // renderError(`Ошибка: ${err}`);
        console.log(`Ошибка в func "editUserInfo": ${err}`);
      });
  }

  addNewCard(cardName, cardLink){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        else {
          return Promise.reject(res.status);
        }
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        // renderError(`Ошибка: ${err}`);
        console.log(`Ошибка в func "addNewCard": ${err}`);
      });
  }

  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._authorization}`
      },
    })
      .then(res => {
        if(res.ok){
          return true;
        }
        else {
          return Promise.reject(res.status);
        }
      })
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
      .then(res => {
        if(res.ok){
          return res.json();
        }
        else {
          return Promise.reject(res.status);
        }
      })
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
      .then(res => {
        if(res.ok){
          return res.json();
        }
        else {
          return Promise.reject(res.status);
        }
      })
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
      headers: {
        authorization: `${this._authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => {
        if(res.ok){
          return true;
        }
        else {
          return Promise.reject(res.status);
        }
      })
      .catch((err) => {
        // renderError(`Ошибка: ${err}`);
        console.log(`Ошибка в func "": ${err}`);
      });
  }
}

// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
//   headers: {
//     authorization: '541a5b47-8b22-4068-8020-177c840b7796',
//     'Content-Type': 'application/json'
//   }
// }); 