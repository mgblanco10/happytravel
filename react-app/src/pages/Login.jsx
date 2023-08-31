import React, { useState } from "react";
import "../css/LoginRegister.css";
export default function Login (props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Acceso de Usuario</h2>
                <hr className="divider" />
                <label htmlFor="email">E-mail</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Escribe tu correo..." id="email" className="form-auth" name="email" />
                <label htmlFor="password">Contraseña</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Escribe tu contraseña..." id="password" className="form-auth" name="password" />
                <div className="container-btn">
                <button type="submit" className="btn btn-primary">Aceptar</button>
                <button type="submit" className="btn btn-secondary">Cancelar</button>
                </div>
            </form>
        </div>
    )
}