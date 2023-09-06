import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import "../css/Profile.css";

import avatarIcon from '../assets/avatar-icon.svg';
import createIcon from '../assets/create-icon.svg';

export default function Profile() {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(user.avatar); // El estado para la imagen de perfil

  const handleImageChange = (event) => {
    const newAvatar = event.target.files[0];
    setAvatar(newAvatar);

    // Aquí agregar código para subir la imagen a la base de datos.
    // Ejemplo,  usar FormData .
    // formData.append('image', newAvatar);
    // Después de subir la imagen,que actualiza el avatar en la base de datos y en el estado local.
    // También se puede mostrar un indicador de carga mientras se sube la imagen.

    // Limpia el campo de entrada de archivo para que se pueda seleccionar una imagen diferente si es necesario.
    event.target.value = '';
  };

  return (
    <div className="container-profile">
      <img className="icon-nav profile" src={avatarIcon} alt="icono perfil" />
      <label className="fileInput-create-avatar" htmlFor="fileInput">
	  <img className="icon-nav profileAvatar" src={createIcon} alt="icono de agregar fotografía" />
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
