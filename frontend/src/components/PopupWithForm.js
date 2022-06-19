function PopupWithForm ({onSubmit, name, isOpen, onClose, title, buttonTitle, children}) {
  return (
    <article className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
    <form onSubmit={onSubmit} name={name} className="popup__container">
      <button type="button" aria-label="закрыть окно" className="popup__close" onClick={onClose}></button>
      <div className="popup__text-container">
        <h3 className="popup__title">{title}</h3>
        <div className="popup__inputs">
          {children}
        </div>
      </div>
      <button type="submit" className="popup__save">{buttonTitle}</button>
    </form>
    </article>
  )
}
export default PopupWithForm;