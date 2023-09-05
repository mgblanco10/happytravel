import React, { useState, useEffect } from 'react';
import "../css/CreateForm.css";
import axios from 'axios';
import folderImg from '../assets/file-icon.svg';
import { useParams, Navigate  } from 'react-router-dom';
import { fetchCardDetails } from '../services/ApiGetCardDetails'

export default function EditForm() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false); 

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const travelDetails = await fetchCardDetails(id);
        setName(travelDetails.name);
        setLocation(travelDetails.location);
        setDescription(travelDetails.description);
      } catch (error) {
        console.error('Error fetching travel details:', error);
      }
    };
  
    fetchDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('description', description);

  try {
    const response = await axios.put(`http://localhost:8000/api/happy_travel/${id}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log('Solicitud PUT enviada');
    console.log('Datos del formulario:', formData);
    console.log('Respuesta del servidor:', response.data);
  
    setName(response.data.name);
    setLocation(response.data.location);
    setDescription(response.data.description);
    setRedirectToDashboard(true);

  } catch (error) {
    console.error('Error:', error);
  }
};

if (redirectToDashboard) {
  return <Navigate to="/dashboard" />;
}

  return (
    <form className="full-container-form" onSubmit={handleSubmit}>
      <div className="box-line"><h3>Editar destino</h3></div>
      <div className="form-create">
        <div className="columna1">
          <div className="label-and-input-container">
            <label htmlFor="title">Título</label>
            <input id="title" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            <p id="error-title" className="error"></p>
          </div>
          <div className="label-and-input-container">
            <label htmlFor="location">Ubicación</label>
            <input id="location" className="form-control" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            <p id="error-location" className="error"></p>
          </div>
          
        </div>
        <div className="columna2">
          <label>¿Por qué quieres viajar allí?</label>
          <p id="error-description" className="error"></p>
          <textarea name="description" className="custom-textarea" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
      </div>
      <div className="btn-container">
     
            <button className="btn-primary" type="submit">Aceptar</button>
         
        <button className="btn-secondary">Cancelar</button>
      </div>
    </form>
  );
}