import React, { useState, useEffect } from 'react';
import "../css/CreateForm.css";
import axios from 'axios';
import Imgadd from '../assets/file-icon.svg';
import { useParams, Navigate  } from 'react-router-dom';
import { fetchCardDetails } from '../services/ApiGetCardDetails'
import {editCard} from '../services/ApiEditTravel'
import {  useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditForm() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false); 
	const navigate = useNavigate();

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

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log('Archivo seleccionado:', selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('description', description);

    try {
      const response = await editCard(id, formData); 
      console.log('Solicitud PUT enviada');
      console.log('Datos del formulario:', formData);
      console.log('Respuesta del servidor:', response);

      toast.success('Destino editado: ' + name);

      setName(response.name);
      setLocation(response.location);
      setDescription(response.description);
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

          <div className="add_file mb-5">
              <label htmlFor="validationTextarea" className="form-label">Imagen</label>
              <div className="input-group">
                <label className="input-group-text" htmlFor="fileInput">
                  <img
                    className="img_add"
                    src={Imgadd}
                    alt="Icono de carpeta"
                    width="30"
                    height="30"
                    onClick={() => document.getElementById('fileInput').click()}
                  />     
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={handleFileInputChange}
                  />         
                </label>
                <input type="text" className="form-control shadow-top blue-background" placeholder="Sube una imagen" readOnly />
              </div>
              <div className="invalid-feedback">Example invalid form file feedback</div>
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
         
        <button className="btn-secondary" type="button" onClick={() => navigate('/dashboard')}>Cancelar</button>
      </div>
      <ToastContainer />
    </form>
  );
}