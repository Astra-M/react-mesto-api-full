import React from "react";

function InfoTooltip ({isOpen, onClose, name, message, imageLink}) {
  return (
      <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}> 
        <button type="button" aria-label="закрыть окно" 
          className="popup__close popup__close_type_confirm"
          onClick={onClose}>
        </button>
        <div className="popup__container popup__container_confirm">
        <div className="popup__confirm-image"></div>
          <img src={imageLink} alt="иконка подтверждения"/>
          <h3 className="popup__title popup__title_modal">{message}</h3>
        </div>
      </div>
    )
}
export default InfoTooltip;