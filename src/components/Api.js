export default class Api {
    constructor({baseUrl,headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    } 

    _returnResult(result) {
      return Promise.resolve(result);
    } 

    changeAvatar(avatarUrl) {
      return fetch(this._baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarUrl
        })
      })
      .then(this._checkResponse)
      .then(this._returnResult); 
    }

    likeCard(cardId) {
      return fetch(this._baseUrl + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._checkResponse)
      .then(this._returnResult); 
    }

    disLikeCard(cardId) {
      return fetch(this._baseUrl + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse)
      .then(this._returnResult); 
    }

    deleteCard(cardId) {
      return fetch(this._baseUrl + '/cards/' + cardId, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse)
      .then(this._returnResult);    
    }

    addNewCard(nameOfCardInp,linkOfCardInp) {
      return fetch(this._baseUrl + '/cards', {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: nameOfCardInp,
          link: linkOfCardInp
        })
      })
      .then(this._checkResponse)
      .then(this._returnResult);  
    }

    getUserInfo() {
      return fetch(this._baseUrl + '/users/me', {
        headers: this._headers
      })
      .then(this._checkResponse)
      .then(this._returnResult);  
    }
  
    getInitialCards() {
      return fetch(this._baseUrl + '/cards', {
        headers: this._headers
      })
      .then(this._checkResponse)
      .then(this._returnResult);  
    }

    setProfileName(nameInp,aboutInp) {
      return fetch(this._baseUrl + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: nameInp,
          about: aboutInp
        })
      })
      .then(this._checkResponse)
      .then(this._returnResult); 
    }
 
  }
  
