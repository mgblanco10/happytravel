import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/NavBar.css";

import logoImage from '../assets/logo.svg';
import glassIcon from '../assets/glass-icon.svg';
import avatarIcon from '../assets/avatar-icon.svg';
import createIcon from '../assets/create-icon.svg';
import logoutIcon from '../assets/logout-icon.svg';
import homeIcon from '../assets/home-icon.svg';

const NavBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <nav>
      <div className="navbar-content">
        <div className="logo-container">
          <img src={logoImage} alt="imagen del Logo" />
        </div>
        <div className="search-input-container">
          <form onSubmit={handleSearch}>
            <div className="form-control-container">
              <input
                type="text"
                id="search"
                name="search"
                className="form-control"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <img
                id="search-icon"
                className="search-icon"
                src={glassIcon}
                alt="icono de búsqueda"
                onClick={handleSearch}
              />
            </div>
          </form>
        </div>
        <div className="navbar-icons">
          <Link to="/happy_travel/index" className="nav-link">
            <img className="icon-nav" src={homeIcon} alt="icono home" />
          </Link>
          
          {isUserRegistered && ( 
            <>
              <Link to="/happy_travel/create" className="nav-link">
                <img className="icon-nav" src={createIcon} alt="icono de agregar destino" />
              </Link>
              <Link to="/signout" className="nav-link">
                <img className="icon-nav" src={logoutIcon} alt="icono de cerrar sesión" />
              </Link>
            </>
          )}

          <Link to="/register-user" className="nav-link">
            <img className="icon-nav" src={avatarIcon} alt="icono perfil" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
