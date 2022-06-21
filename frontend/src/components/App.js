import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import api from '../utils/api';
import * as auth from '../utils/auth';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ConfirmImage from '../images/success-image.svg';
import ErrorImage from '../images/error-image.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmTooltipOpen, setIsConfirmTooltipOpen] = React.useState(false);
  const [isErrorTooltipOpen, setIsErrorTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null)
  const history = useHistory();

  React.useEffect(() => {
    api.getProfile()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(err))
    
    api.getCards()
      .then (res => {
        const data = res.map(item => {
          //
          console.log('item =>',item )
          return {
            link: item.link,
            likes: item.likes,
            title: item.name,
            key: item._id,
            id: item._id,
            // ownerId: item.owner._id,
            ownerId: item.owner,
          }
        })
        setCards(data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (loggedIn) {
        history.push("/");
        return;
    }
    // history.push('/sign-in');
    history.push('/signin');
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(null)
    setIsConfirmTooltipOpen(false)
    setIsErrorTooltipOpen(false)
  }
  
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick (cardData) {
    setSelectedCard(cardData)
  }

  function handleUpdateUser({name, about}) {
    api.editProfile(name, about)
      .then(res => {
        setCurrentUser(res);
        setIsEditProfilePopupOpen(false)
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar({avatar}) {
    api.editAvatar(avatar)
      .then(res => {
        setCurrentUser(res);
        setIsEditAvatarPopupOpen(false)
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete (card) {
    const isOwn = (currentUser._id === card.ownerId);

    if (isOwn) {
      api.deleteCard(card.id)
        .then(
          setCards(state => state.filter (item => item.id !== card.id))
        )
        .catch(err => console.log(err))
    }
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i === currentUser._id);


    // const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    const request = isLiked ? api.deleteLike(card.id) : api.addLike(card.id);
    request.then(res => {
      const newCard = {
          link: res.link,
          likes: res.likes,
          title: res.name,
          key: res._id,
          id: res._id,
          // ownerId: res.owner._id,
          ownerId: res.owner,
      }
      setCards(state => state.map (item => item.id === card.id ? newCard : item))
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addCard(name,link)
      .then(res => {

         //////////
console.log('res=>',res)

        const newCard = 
          {
            link: res.link,
            likes: res.likes,
            title: res.name,
            key: res._id,
            id: res._id,
            // ownerId: res.owner._id,
            ownerId: res.owner,
          }
        setCards([newCard, ...cards])
        setIsAddPlacePopupOpen(false)
      })
      .catch(err => console.log(err))
  }

  function handleRegister (email, password) {
    return auth
      .register(email, password)
        .then(() => {
          setIsConfirmTooltipOpen(true)
          history.push('/login')
        })
        .catch((err) => {
          setIsErrorTooltipOpen(true)
          console.log(err)
        })
}

const handleLogin = (email, password) => {
  return auth
    .authorize(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        tokenCheck();
        ///
        setLoggedIn(true)
      })
      .catch((err) => {
        setIsErrorTooltipOpen(true)
        console.log(err)
      })
}

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserData(null)
}

const tokenCheck = () => {
  if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth
        .getContent(token)
          .then((res) => {
              setUserData({
              email: res.email,
            });
              setLoggedIn(true);
            // console.log(res)
          })
          .catch(err => console.log(err))
    }
}

return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <div className="page__container">
        <Header handleSignOut={handleSignOut} userData={userData} />

        <InfoTooltip isOpen={isConfirmTooltipOpen} onClose={closeAllPopups}
                      message='Вы успешно зарегистрировались!' 
                      imageLink={ConfirmImage} name='confirm-modal'/>
        
        <InfoTooltip isOpen={isErrorTooltipOpen} onClose={closeAllPopups}
                      message='Что-то пошло не так! Попробуйте еще раз.'
                      imageLink={ErrorImage} name='error-modal'/>

        <Switch>
          {/* <Route path="/sign-in"> */}
          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
          
          {/* <Route path="/sign-up"> */}
          <Route path="/signup">
            <Register handleRegister={handleRegister}/>
          </Route>

          <ProtectedRoute path="/" loggedIn={loggedIn}>
              <Main 
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />

            <EditProfilePopup isOpen={isEditProfilePopupOpen}
                              onClose={closeAllPopups}
                              onUpdateUser={handleUpdateUser}/>

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} 
                            onClose={closeAllPopups}
                            onUpdateAvatar={handleUpdateAvatar}/>

            <AddPlacePopup isOpen={isAddPlacePopupOpen}
                            onClose={closeAllPopups}
                            onSubmitPlace={handleAddPlaceSubmit}/>

            <PopupWithForm name="delete-confirm" title="Вы уверены?" buttonTitle="Да"/>

            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          </ProtectedRoute>
        </Switch>
        <Footer />
      </div>
    </div>
  </CurrentUserContext.Provider>
  )
}
export default App;