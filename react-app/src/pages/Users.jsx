import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import editIcon from '../assets/edit-icon.svg';
import deleteIcon from '../assets/delete-icon.svg';
import createIcon from '../assets/create-icon.svg';

import {  useNavigate } from 'react-router-dom';

function UserList() {
    const { user, hasRole } = useAuth();	const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    useEffect(() => {
<<<<<<< Updated upstream
        axios.get('/api/users')
=======
        axios.get('http://localhost:8000/api/users', {
            withCredentials: true,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            const usersData = response.data.users;
            setUsers(usersData);
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        });
    }, []);
    const deleteUser = (id) => {
        try {
            axios.delete(`http://localhost:8000/api/users/${id}`, {
                withCredentials: true,
                headers: {
                    "Accept": "application/json",
                },
            })
>>>>>>> Stashed changes
            .then((response) => {
                if (response.status === 200) {
                    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
                } else {
                    console.error('Failed to delete user.');
                }
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    return (
        <div>
        {user && hasRole('SuperAdmin') && (
                    <>
                        <h1>Lista de Usuarios</h1>
                        <a href="/createUser"><img className="icon-nav" src={createIcon} alt="icono de agregar destino" /></a>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Roles</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.roles.map((role) => (
                                                <span key={role} className="badge badge-success">{role}</span>
                                            ))}
                                        </td>
                                        <td>
                                            <button className="link-btn" onClick={() => navigate(`/editUser/${user.id}`)}><img className="icon-delete" src={editIcon} alt="icono borrar" /></button>  
                                            <button onClick={() => deleteUser(user.id)}><img className="icon-delete" src={deleteIcon} alt="icono borrar" /></button>                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </> 
                    
                )}
                {!user || !hasRole('SuperAdmin') && (
                    <>       <p style={{ fontSize: '28px', textAlign: 'center' }}>Oops! Parece que no tienes acceso a esta página. 😢</p>             </> 
                    
                    )}
        </div>
    );
}

export default UserList;