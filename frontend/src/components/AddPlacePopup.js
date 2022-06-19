import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onSubmitPlace}) {
  const [placeName, setPlaceName] = React.useState('');
  const [placeUrl, setPlaceUrl] = React.useState('');

  React.useEffect( () => {
    setPlaceUrl('')
    setPlaceName('')
  }, [isOpen])

  function handleAddPlaceName (e){
    setPlaceName(e.target.value)
  }
  function handleAddPlaceUrl(e){
    setPlaceUrl(e.target.value)
  }

  function handlePlaceSubmit(e) {
    e.preventDefault();
    onSubmitPlace({
      name: placeName,
      link: placeUrl,
    });
  }

  return (
    <PopupWithForm name="add-place" title="Новое место"
                  buttonTitle="Создать" isOpen={isOpen}
                  onClose={onClose} onSubmit={handlePlaceSubmit}>
          <input id="place" type="text" name="popup__place" 
                  required minLength="2" maxLength="30" value={placeName}
                  className="popup__input popup__input_type_place-name"
                  placeholder="Название" onChange={handleAddPlaceName}/>
          <span id="place-error" className="popup__error"></span>
          <input id="url" type="url" name="popup__link" required 
                  className="popup__input popup__input_type_place-link" value={placeUrl}
                  placeholder="Ссылка на картинку" onChange={handleAddPlaceUrl}/>
          <span id="url-error" className="popup__error"></span>
     </PopupWithForm>
  )
}
export default AddPlacePopup;