import React, { useState } from 'react';
import axios from 'axios';
import "../css/CreateForm.css";
import Imgfile from "../assets/file-icon.svg"
import { Navigate } from 'react-router-dom';

export default function CreateForm() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [redirectToDashboard, setRedirectToDashboard] = useState(false); 
  
    // const handleFileInputChange = (e) => {
    //   // Manejar la selección de archivos aquí
    //   const selectedFile = e.target.files[0];
    //   if (selectedFile) {
    //     // Realiza acciones con el archivo seleccionado aquí
    //     console.log('Archivo seleccionado:', selectedFile);
    //   }
    // };


    const handleSubmit = async (e) => {
      e.preventDefault();
    console.log("holaaa")
      const formData = new FormData();
      formData.append('name', name);
      formData.append('location', location);
      formData.append('image', image);
      formData.append('description', description);
    
      try {
        const response = axios.post('http://localhost:8000/api/happy_travel', formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", 
            "Accept": "application/json",
          },
        });
        console.log('Response:', response.data);
    
        setName('');
        setLocation('');
        setDescription('');
        setImage(null);
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
      <div className="box-line"><h3>Crear Destino</h3></div>
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
          
          
          <div className="add-file">
                        <label className="form-label">Imagen</label>
                        <div className="input-group">
                            <label className="input-group-text" htmlFor="fileInput">
                                 <input className="form-control-input" type="file" onChange={(e) => setImage(e.target.files[0])} />
                            </label>
                            <input className="form-control-input"   onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        
                        <p id="error-image" className="error"></p>
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
};
