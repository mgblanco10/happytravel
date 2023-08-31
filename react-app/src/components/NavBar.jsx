import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

import "../css/NavBar.css";


import logoImage from '../assets/logo.svg';
import avatarIcon from '../assets/avatar-icon.svg';
import createIcon from '../assets/create-icon.svg';
import logoutIcon from '../assets/logout-icon.svg';
import homeIcon from '../assets/home-icon.svg';
import { useAuth } from '../contexts/AuthContext';


export default function NavBar ({handleSearchSubmit}) {
  // const [isUserRegistered, setIsUserRegistered] = useState(false);
  const { user, setUser } = useAuth();


  if (!user) {
    return (
      <nav>
        <div className="navbar-content">
          <div className="logo-container">
            <img src={logoImage} alt="imagen del Logo" />
          </div>

          <Search handleSearchSubmit={handleSearchSubmit} />

          <div className="navbar-icons">
            <Link to="/happy_travel/index" className="nav-link">
              <img className="icon-nav" src={homeIcon} alt="icono home" />
            </Link>

            <Link to="/register" className="nav-link">
              <img className="icon-nav" src={avatarIcon} alt="icono perfil" />
            </Link>
          </div>
        </div>
      </nav>
    );
  };

  if (user) {
    return (
      <nav>
        <div className="navbar-content">
          <div className="logo-container">
            <img src={logoImage} alt="imagen del Logo" />
          </div>

          <Search handleSearchSubmit={handleSearchSubmit} />

          <div className="navbar-icons">
            <Link to="/happy_travel/index" className="nav-link">
              <img className="icon-nav" src={homeIcon} alt="icono home" />
            </Link>


            <Link to="/happy_travel/create" className="nav-link">
              <img className="icon-nav" src={createIcon} alt="icono de agregar destino" />
            </Link>
            <Link to="/signout" className="nav-link">
              <img className="icon-nav" src={logoutIcon} alt="icono de cerrar sesión" />
            </Link>


            <Link to="/register-user" className="nav-link">
              <img className="icon-nav" src={avatarIcon} alt="icono perfil" />
            </Link>
          </div>
        </div>
      </nav>

    );
  };
};


{/* <div className="search-results">
      {searchResults.map((result) => (
        <div key={result.id} className="search-result">
          <h3>{result.title}</h3>
          <p>{result.location}</p>
        </div>
      ))}
    </div> */}