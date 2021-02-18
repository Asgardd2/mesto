export default class Api {
    constructor({baseUrl,headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    changeAvatar(avatarUrl) {
      return fetch(this._baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarUrl
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      } )
      .then((result) => {
        return Promise.resolve(result);
        //console.log(result);
      }); 
    }

    likeCard(cardId) {
      return fetch(this._baseUrl + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      } )
      .then((result) => {
        return Promise.resolve(result);
        //console.log(result);
      });
    }

    disLikeCard(cardId) {
      return fetch(this._baseUrl + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      } )
      .then((result) => {
        return Promise.resolve(result);
        //console.log(result);
      });
    }

    deleteCard(cardId) {
      return fetch(this._baseUrl + '/cards/' + cardId, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      } )
      .then((result) => {
        return Promise.resolve(result);
        //console.log(result);
      });   

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
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      } )
      .then((result) => {
        return Promise.resolve(result);
        //console.log(result);
      }); 
    }

    getUserInfo() {
      return fetch(this._baseUrl + '/users/me', {
        headers: this._headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(`Ошибка: ${res.status}`);
        } )
        .then((result) => {
          return Promise.resolve(result);
          //console.log(result);
        }); 
    }
  
    getInitialCards() {
      return fetch(this._baseUrl + '/cards', {
        headers: this._headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        } )
        .then((result) => {
          return Promise.resolve(result);
          //console.log(result);
        }); 
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      } )
      .then((result) => {
        return Promise.resolve(result);
        //console.log(result);
      }); 
    }
  
    // другие методы работы с API
  }
  
  /*
  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
    headers: {
      authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
      'Content-Type': 'application/json'
    }
  }); 
  */