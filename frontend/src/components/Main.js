import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';


export default function Main (props) {
  const userContext = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="user-profile">
        <div className="user-form">
          <div 
            className="user-form__avatar" 
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${userContext.avatar})` }}>
          </div>
          <div className="input">
            <div className="input__block">
              <h1 className="input__name">{userContext.name}</h1>
              <button type="button" onClick={props.onEditProfile} className="edit-btn"></button>
            </div>
            <p className="input__job">{userContext.about}</p>
          </div>
        </div>
        <button type="button" onClick={props.onAddPlace} className="add-btn"></button>
      </section>

      <section className="places-gallery">
        <ul className="places-gallery__list">
          {
            props.cards.map((item) =>(
                <Card
                card={item}
                key={item.key}
                cardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}/>
            ))
          }
        </ul>
      </section>
    </main>
  )
}