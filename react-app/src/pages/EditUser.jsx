import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/LoginRegister.css';

export default function EditUser() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name,
      email,
      password,
    };
    try {
      const resp = await axios.put(`/users/${user.id}`, body);
      if (resp.status === 200) {
        setUser(resp.data.user);
        navigate('/dashboard'); // Redirect to dashboard after successful edit
      }
    } catch (error) {
      if (error.response.status === 422) {
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
      <form className="register-form" onSubmit={handleSubmit} action="#" method="PUT">
        <h2>Edit Profile</h2>
        <hr className="divider" />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name..."
          className="form-auth"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p>{nameError}</p>}
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          placeholder="Enter your email..."
          id="email"
          className="form-auth"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="text-sm text-red-600">{emailError}</p>}
        <label htmlFor="password">New Password (Leave blank to keep current)</label>
        <input
          type="password"
          placeholder="Enter your new password..."
          id="password"
          className="form-auth"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
        <div className="container-btn">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
