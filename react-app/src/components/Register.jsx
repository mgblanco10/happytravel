import React, { useState } from "react";



export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }


    return (
            <div className="auth-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
            <h2>Registro de Usuario</h2>
            <hr className="divider" />
            <label htmlFor="name">Nombre</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Escribe tu nombre..." class="form-auth"/>
            <label htmlFor="email">E-mail</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Escribe tu correo..." id="email" class="form-auth" name="email" />
            <label htmlFor="password">Contraseña</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Escribe tu contraseña..." id="password" class="form-auth" name="password" />
            <div className="container-btn">
            <button type="submit" class="btn btn-primary">Aceptar</button>
            <button type="submit" class="btn btn-secondary">Cancelar</button>
            </div>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Ya tiene cuenta? Accede aqui.</button>
    </div>
    )

    
} 