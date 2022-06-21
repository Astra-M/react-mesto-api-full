class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    // this._headers = headers;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // getProfile() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     headers: this._headers,
  //     credentials: 'include',
  //   })    
  //   .then(res => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //       return Promise.reject(`Ошибка: ${res.status}`);
  //     })
  // }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      // headers: this._headers,
      credentials: 'include',
    })    
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        about,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      // headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  addCard(name,link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      // headers: this._headers,

      credentials: 'include',
      body: JSON.stringify({
        name,
        link,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}

const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
  baseUrl: 'http://localhost:3001',  
  // headers: {
  //   //authorization:`Bearer ${token}`,
  //   // 'Authorization': `Bearer ${token}`,
  //   // authorization: '09dce2b8-d324-4571-9bf8-0a691518360f',
  //   // 'Content-Type': 'application/json'
  // }
})

export default api;
