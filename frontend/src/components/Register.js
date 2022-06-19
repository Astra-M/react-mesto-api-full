import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register ({handleRegister}) {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
      let { email, password } = state;
      handleRegister(email, password)
          .catch(() => {
            setState(prev => ({
            ...prev,
            }))
          });
  }

  return (
    <div className="register">
      <form className="popup__container popup__container_theme-dark" onSubmit={handleSubmit}>
        <div className="popup__text-container">
          <h3 className="popup__title popup__title_login">Регистрация</h3>
          <div className="popup__inputs">
            
            <input id="email" name="email" type="email" 
            required minLength="3" maxLength="40" 
            className="popup__input popup__input_type_email" 
            placeholder="Email" value={state.email} onChange={handleInputChange} />

            <input id="password" name="password" type="password" 
              required minLength="2" maxLength="200" 
              className="popup__input popup__input_type_password" 
              placeholder="Пароль" value={state.password} onChange={handleInputChange} />
          
          </div>
        </div>
        <button type="submit" className="popup__save popup__save_theme-dark">Зарегистрироваться</button> 
      </form>
      <div className="register__signin">
          <p className="register__login-text">Уже зарегистрированы?</p>
          <Link to="login" className="register__login-link">Войти</Link>
      </div>
    </div>
  )
}
export default Register;