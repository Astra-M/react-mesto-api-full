import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [job, setJob] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setJob(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: job,
    });
  }

  function handleChangeName(e){
    setName(e.target.value)
  }

  function handleChangeJob(e) {
    setJob(e.target.value)
  }

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" 
                  buttonTitle="Сохранить" isOpen={isOpen} onClose={onClose} 
                  onSubmit={handleSubmit}>
      <input id="name" type="text" name="popup__name" required minLength="2" maxLength="40" 
            className="popup__input popup__input_type_name" placeholder="введите Ваше имя"
            value={name || ''} onChange={handleChangeName}/>
      <span id="name-error" className="popup__error"></span>
      <input id="job" type="text" name="popup__job" required minLength="2" maxLength="200" 
            className="popup__input popup__input_type_job" placeholder="введите Вашу профессию"
            value={job || ''} onChange={handleChangeJob}/>
      <span id="job-error" className="popup__error"></span>
    </PopupWithForm>
  )
}
export default EditProfilePopup;