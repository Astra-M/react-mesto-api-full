import React, { useState } from 'react';

const Login = ({handleLogin}) => {
  const [inputs, setInputs] = useState({
      email: '',
      password: '',
  });

  const handleChange = (e) => {
      const {name, value} = e.target;
      setInputs((prev) => ({
          ...prev,
          [name]: value,
      }));
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      let { email, password } = inputs;
      if (!email || !password) {
        return;
      }
      handleLogin(email, password)
  }

  return (
    <div className="register">
      <form className="popup__container popup__container_theme-dark" onSubmit={handleSubmit}>
        <div className="popup__text-container">
          <h3 className="popup__title popup__title_login">Вход</h3>
          <div className="popup__inputs">
            <input id="email" name="email" type="email" 
              required minLength="3" maxLength="40" 
            className="popup__input popup__input_type_email" 
            placeholder="Email" value={inputs.email} onChange={handleChange} />

            <input id="password" name="password" type="password" 
              required minLength="2" maxLength="200" 
              className="popup__input popup__input_type_password" 
              placeholder="Пароль" value={inputs.password} onChange={handleChange} />
          </div>
        </div>
        <button type="submit" className="popup__save popup__save_theme-dark">Войти</button> 
      </form>
    </div>
  )
}
export default Login