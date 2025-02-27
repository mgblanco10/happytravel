import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../services/axios';
import { useAuth } from '../contexts/AuthContext';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
	const { setUser, csrfToken } = useAuth();
	const [error, setError] = React.useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = e.target.elements;
		const body = {
			email: email.value,
			password: password.value,
		};
		await csrfToken();
		try {
			const resp = await axios.post('/login', body);
			if (resp.status === 200) {
				setUser(resp.data.user);
				toast.success(`¡Bienvenido, ${resp.data.user.name}!`, {
					position: "top-right",
					autoClose: 3000,
				  });
				return <Navigate to="/profile" />;


			}
		} catch (error) {
			if (error.response.status === 401) {
				setError(error.response.data.message);
			}
		}
	};

	return (
        <div className="auth-form-container">
            <div>{error}</div>
            <form className="login-form" onSubmit={handleSubmit} method="POST" action="#">
                <h2>Acceso de Usuario</h2>
                <hr className="divider" />
                <label htmlFor="email">E-mail</label>
                <input type="email" placeholder="Escribe tu correo..." id="email" className="form-auth" name="email" />
                <label htmlFor="password">Contraseña</label>
                <input  type="password" placeholder="Escribe tu contraseña..." id="password" className="form-auth" name="password" />
                <div className="container-btn">
                <button type="submit" className="btn btn-primary">Aceptar</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/register')}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}