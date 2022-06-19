import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {
  const inputRef = React.useRef('');

  function handleAvatarSubmit(e) {
    e.preventDefault();
    onUpdateAvatar ({
      avatar: inputRef.current.value
    })
  }
  
  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" 
                  buttonTitle="Сохранить" isOpen={isOpen} 
                  onClose={onClose} onSubmit={handleAvatarSubmit}>
            <input ref={inputRef} id="avatar" type="url" name="avatar__link" 
                  required className="popup__input popup__input_type_place-link" 
                  placeholder="Ссылка на картинку"/>
            <span id="avatar-error" className="popup__error"></span>
    </PopupWithForm>
  )
}
export default EditAvatarPopup;