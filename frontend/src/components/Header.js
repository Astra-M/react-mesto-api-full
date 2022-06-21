import logo from '../images/mesto_logo_white.svg';
import { Route, Switch, Link } from 'react-router-dom';

function Header ({handleSignOut, userData}) {
  let { email } = userData || {};
  return (
    <header className=" header">
      <a href="#" className="logo-link">
        <img src={logo} alt="лого Mesto" className="logo"/>
      </a>
      <Switch>
        <Route exact path="/">
          <div className="header__links-block">
            <p className="header__link header__link_type_light">{email}</p>
            {/* <Link to="sign-in" className="header__link header__link_type_dark" onClick={handleSignOut} >Выйти</Link> */}
            <Link to="signin" className="header__link header__link_type_dark" onClick={handleSignOut} >Выйти</Link>

          </div> 
        </Route>

        {/* <Route path="/sign-in">
          <Link to="sign-up" className="header__link header__link_type_light">Регистрация</Link>
        </Route> */}
         <Route path="/signin">
          <Link to="signup" className="header__link header__link_type_light">Регистрация</Link>
        </Route>

        {/* <Route path="/sign-up">
          <Link to="sign-in" className="header__link header__link_type_light">Войти</Link>
        </Route> */}
         <Route path="/signup">
          <Link to="signin" className="header__link header__link_type_light">Войти</Link>
        </Route>
      </Switch>
    </header>
  )
}

export default Header;

