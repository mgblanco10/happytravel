import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import "../css/NavBar.css";

import logoImage from '../assets/logo.svg';
import glassIcon from '../assets/glass-icon.svg';
import avatarIcon from '../assets/avatar-icon.svg';
import createIcon from '../assets/create-icon.svg';
import logoutIcon from '../assets/logout-icon.svg';
import homeIcon from '../assets/home-icon.svg';

const NavBar = ({ onLogout, hideSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const { user, setUser } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/search?query=${searchValue}`;
  };

  if (!user) {
    return (
    <nav>
      <div className="navbar-content">
        <div className="logo-container">
          <img src={logoImage} alt="imagen del Logo" />
        </div>
        <div className="navbar-icons">
          <Link to="/" className="nav-link">
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
        {!hideSearch &&(
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
        )}
        <div className="navbar-icons">
          <Link to="/" className="nav-link">
            <img className="icon-nav" src={homeIcon} alt="icono home" />
          </Link>
              <Link to="/create" className="nav-link">
                <img className="icon-nav" src={createIcon} alt="icono de agregar destino" />
              </Link>
              <a onClick={onLogout} href="#">
                <img className="icon-nav" src={logoutIcon} alt="icono de cerrar sesión" />
              </a>    
          <Link to="/profile" className="nav-link">
            <img className="icon-nav" src={avatarIcon} alt="icono perfil" />
          </Link>
        </div>
      </div>
    </nav> 
  ); 
}
};


export default NavBar;

  