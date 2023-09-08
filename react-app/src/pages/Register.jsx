import React, { useState } from 'react';
import axios from '../services/axios';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../css/LoginRegister.css';

export default function Register() {
  const notify = () => {
    toast.success('Registro completado!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  const { setUser } = useAuth();
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = e.target.elements;
    const body = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    try {
      const resp = await axios.post('/register', body);
      if (resp.status === 200) {
        setUser(resp.data.user);
        setShowNotification(true);
        setNotificationMessage('Te has registrado correctamente');

        setTimeout(() => {
          setShowNotification(false);
          setNotificationMessage('');
        }, 3000);

        return <Navigate to="/dashboard" />;
      }
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error.response.data.errors);
        if (error.response.data.errors.name) {
          setNameError(error.response.data.errors.name[0]);
        } else {
          setNameError('');
        }
        if (error.response.data.errors.email) {
          setEmailError(error.response.data.errors.email[0]);
        } else {
          setEmailError('');
        }
        if (error.response.data.errors.password) {
          setPasswordError(error.response.data.errors.password[0]);
        } else {
          setPasswordError('');
        }
      }
    }
  };

  return (
    <div className="auth-form-container">
      <form className="register-form" onSubmit={handleSubmit} action="#" method="POST">
        <h2>Registro de Usuario</h2>
        <hr className="divider" />
        <label htmlFor="name">Nombre</label>
        <input name="name" id="name" placeholder="Escribe tu nombre..." className="form-auth" />
        {nameError && <p>{nameError}</p>}
        <label htmlFor="email">E-mail</label>
        <input type="email" placeholder="Escribe tu correo..." id="email" className="form-auth" name="email" />
        {emailError && <p className="text-sm text-red-600">{emailError}</p>}
        <label htmlFor="password">Contraseña</label>
        <input type="password" placeholder="Escribe tu contraseña..." id="password" className="form-auth" name="password" />
        {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
        <div className="container-btn">
          <button type="submit" className="btn btn-primary" onClick={notify}>
            Aceptar
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </form>
      <button className="link-btn" onClick={() => navigate('/login')}>
        Ya tiene cuenta? Accede aquí.
      </button>

      {showNotification && (
        <div className="notification">
          {notificationMessage}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
