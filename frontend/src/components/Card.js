import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card (props) {
  
  const userContext = React.useContext(CurrentUserContext);
  const isOwn = (userContext._id === props.card.ownerId); 
  const isLiked = props.card.likes.some(i => i === userContext._id);
  const cardDeleteButtonClassName = (`delete-btn ${isOwn ? '': 'delete-btn_hidden'}`);
  const cardLikeButtonClassName = `like-btn ${isLiked ? 'like-btn_active' : ''}`;

  function handleClick() {
    props.cardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
      <li className="place-card">
        <img className="place-card__photo"
          src={props.card.link}
          alt={props.card.title}
          onClick={handleClick}/>
        <div className="place-card__text">
          <h3 className="place-card__title">{props.card.title}</h3>
            <div className="place-card__info">
              <button type="button" 
                      className={cardLikeButtonClassName}
                      onClick={handleLikeClick}>
              </button>
              <span className="like-count">{props.card.likes.length}</span>
            </div>
        </div>
        <button type="button" 
                className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}>
        </button>
      </li>
  )
}
export default Card;