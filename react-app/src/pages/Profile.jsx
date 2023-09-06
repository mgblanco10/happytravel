import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import "../css/Profile.css";
import axios from 'axios'; 

import avatarIcon from '../assets/avatar-icon.svg';
import createIcon from '../assets/create-icon.svg';

export default function Profile() {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(user.avatar);

  const handleImageChange = async (event) => {
    const newAvatar = event.target.files[0];
    console.log('Nueva imagen seleccionada:', newAvatar); 
    setAvatar(URL.createObjectURL(newAvatar)); 

    const formData = new FormData();
    formData.append('avatar', newAvatar);

    try {

      await axios.post('http://localhost:8000/api/happy_travel/update-avatar', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      console.log('Avatar subido con éxito');
    } catch (error) {
      console.error('Error al subir el avatar:', error);
    }
  };

  return (
    <div className="container-profile">
      <img className="icon-nav profile" src={avatarIcon} alt="icono perfil" />
      <label className="fileInput-create-avatar" htmlFor="fileInput">
        <img
          className="icon-nav profileAvatar"
          src={createIcon}
          alt="icono de agregar fotografía"
        />
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </label>
      <h2 className="info-perfil title-profile">{user.name}</h2>
      <div className="info-perfil">
        Email: <span>{user.email}</span>
      </div>
    </div>
  );
}

