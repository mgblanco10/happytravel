import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function EditUser() {
    const { user, hasRole } = useAuth();
    const { userId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '', 
        roles: '',
    });

    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/users/${userId}`, {
                withCredentials: true,
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                },
              })
            .then((response) => {
                const userData = response.data.user;
                setFormData({
                    name: userData.name,
                    email: userData.email,
                    password: '', 
                    roles: userData.roles, 
                });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [userId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;
        setFormData({ ...formData, roles: selectedRole });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedFormData = { ...formData };

        if (!updatedFormData.password) {
            delete updatedFormData.password;
        }
        axios
            .put(`http://localhost:8000/api/users/${userId}`, updatedFormData, {
                withCredentials: true,
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                },
              })
            .then((response) => {
                setSuccessMessage('User updated successfully.');
                setErrors([]);

            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.errors) {
                    setErrors(Object.values(error.response.data.errors).flat());
                } else {
                    setErrors(['An error occurred while updating the user.']);
                }
            });
            
    };
    return (
        <div>
            {user && hasRole('SuperAdmin') && (
                    <>
            <div className="row">
                <div className="col-lg-12 margin-tb">
                    <div className="pull-left">
                        <h2>Editar Usuario</h2>
                    </div>
                    <div className="pull-right">
                        <a className="btn btn-primary" href="/admin">Volver</a>
                    </div>
                </div>
            </div>

            {errors.length > 0 && (
                <div className="alert alert-danger">
                    <strong>Whoops!</strong> Hay algunas problemas con tu input.<br />
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Nombre:</strong>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Email:</strong>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Contraseña:</strong>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">

                        <strong>Roles:</strong><br />
                        <label>
                            <input
                                type="radio"
                                name="roles"
                                value="SuperAdmin"
                                checked={formData.roles === "SuperAdmin" && true}
                                onChange={handleRoleChange}
                            />
                            SuperAdmin
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="roles"
                                value="Admin"
                                checked={formData.roles === "Admin" && true}
                                onChange={handleRoleChange}
                            />
                            Admin
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="roles"
                                value="User"
                                
                                checked ={formData.roles === "User" && true}
                                onChange={handleRoleChange}
                            />
                            User
                        </label>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                        <button type="submit" className="btn btn-primary">
                            Aceptar
                        </button>
                    </div>
                </div>
            </form>
            </>
                )}
                {!user || !hasRole('SuperAdmin') && (
                    <>       <p style={{ fontSize: '28px', textAlign: 'center' }}>Oops! Parece que no tienes acceso a esta página. 😢</p>             </> 
                    
                    )}
        </div>
    );
}

export default EditUser;
