import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/NavBar.css";

import logoImage from '../assets/logo.svg';
import glassIcon from '../assets/glass-icon.svg';
import avatarIcon from '../assets/avatar-icon.svg';
import createIcon from '../assets/create-icon.svg';
import logoutIcon from '../assets/logout-icon.svg';
import homeIcon from '../assets/home-icon.svg';
import { useAuth } from '../contexts/AuthContext';

const NavBar = ({ onLogout }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const { user, setUser } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/search?search=${searchValue}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  if (!user) {
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
};
<div className="search-results">
        {searchResults.map((result) => (
          <div key={result.id} className="search-result">
            <h3>{result.title}</h3>
            <p>{result.location}</p>
          </div>
        ))}
      </div>
};
  
    


export default NavBar;
