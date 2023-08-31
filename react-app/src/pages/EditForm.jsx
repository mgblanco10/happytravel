import React, { useState, useEffect } from 'react';
import "../css/CreateForm.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import folderImg from '../assets/file-icon.svg';
import { useParams } from 'react-router-dom';

export default function EditForm() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchTravelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/happy_travel/${id}`);
        const travelDetails = response.data; // Ajusta esto en función de la estructura de tu respuesta
        setName(travelDetails.name);
        setLocation(travelDetails.location);
        setDescription(travelDetails.description);
        // Si `image` también es un campo editable, establece su valor aquí
      } catch (error) {
        console.error('Error fetching travel details:', error);
      }
    };

    fetchTravelDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('description', description);
    // Si necesitas manejar la imagen, agrega el campo image al formData

    try {
      const response = await axios.put(`http://localhost:8000/api/happy_travel/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", 
          "Accept": "application/json",
        },
      });
      console.log('Response:', response.data);

      // Restablecer los campos después de la edición exitosa
      setName('');
      setLocation('');
      setDescription('');
      // Si necesitas restablecer el campo de imagen, agrega el código aquí
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
          {/* Agrega aquí el campo de imagen si es necesario */}
        </div>
        <div className="columna2">
          <label>¿Por qué quieres viajar allí?</label>
          <p id="error-description" className="error"></p>
          <textarea name="description" className="custom-textarea" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
      </div>
      <div className="btn-container">
        <Link to="/">
            <button className="btn-primary" type="submit">Aceptar</button>
        </Link>
        <button className="btn-secondary">Cancelar</button>
      </div>
    </form>
  );
}
