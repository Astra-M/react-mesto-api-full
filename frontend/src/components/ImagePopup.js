function ImagePopup (props) {
  return (
    <div className={`popup popup_type_place-image ${props.card?.link && 'popup_opened'}`}>
    <figure className="popup__content">
      <button type="button" 
              aria-label="закрыть окно" 
              className="popup__close popup__close_type_place"
              onClick={props.onClose}>
      </button>
      <img className="popup__image" src={props.card?.link} alt={props.card?.title}/>
      <figcaption className="popup__image-caption">{props.card?.title}</figcaption>
    </figure>
    </div>
  )
}
export default ImagePopup;

