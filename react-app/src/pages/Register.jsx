import React, { useEffect } from "react";
import axios from '../axios';
import "../css/LoginRegister.css";
import { useAuth } from '../contexts/AuthContext';
import {  useNavigate } from 'react-router-dom';

export default function Register() {
	const { setUser } = useAuth();
	const [nameError, setNameError] = React.useState('');
	const [emailError, setEmailError] = React.useState('');
	const [passwordError, setPasswordError] = React.useState('');
	const navigate = useNavigate();

	// register user
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
				navigate('/dashboard'); 
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
            <input name="name" id="name" placeholder="Escribe tu nombre..." className="form-auth"/>
			{nameError && (
									<p>{nameError}</p>
								)}
            <label htmlFor="email">E-mail</label>
            <input type="email" placeholder="Escribe tu correo..." id="email" className="form-auth" name="email" />
			{emailError && (
									<p className="text-sm text-red-600">{emailError}</p>
								)}
            <label htmlFor="password">Contraseña</label>
            <input type="password" placeholder="Escribe tu contraseña..." id="password" className="form-auth" name="password" />
			{passwordError && (
									<p className="text-sm text-red-600">{passwordError}</p>
								)}
            <div className="container-btn">
            <button type="submit" className="btn btn-primary">Aceptar</button>
            <button className="btn btn-secondary">Cancelar</button>
            </div>
        </form>
        <button className="link-btn" onClick={() => navigate('/login')}>
    Ya tiene cuenta? Accede aqui.
</button>

    </div>
    )
	
    
} 