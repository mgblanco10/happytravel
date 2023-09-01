import React, { useState } from 'react';
import axios from 'axios';
import "../css/CreateForm.css";

export default function CreateForm() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('name', name);
      formData.append('location', location);
      formData.append('image', image);
      formData.append('description', description);
    
      try {
        const response = await axios.post('http://localhost:8000/api/happy_travel', formData, {
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
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return (
         <form className="full-container-form" onSubmit={handleSubmit}>
            <input type="hidden" name="_token"/>

            <div className="box-line"><h3>Crear destino</h3></div>

            <div className="form-create">
                <div className="columna1">
                    <div className="label-and-input-container">
                    <label htmlFor="title">Título</label>
                    <input className="form-control-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Escribe el título..."/>
                    <p id="error-title" className="error"></p>
                    </div>

                    <div className="label-and-input-container">
                    <label htmlFor="location">Ubicación</label>
                    <input className="form-control-input" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Escribe la ubicación..."/>
                    <p id="error-location" className="error"></p>
                    </div>

                    <div className="add-file">
                        <label className="form-label">Imagen</label>
                        <div className="input-group">
                            <label className="input-group-text" htmlFor="fileInput">
                                 <input className="form-control-input" type="file" onChange={(e) => setImage(e.target.files[0])} />
                            </label>
                        </div>
                        
                        <p id="error-image" className="error"></p>
                    </div>

                    <div className="btn-container">
                    <button className="btn-primary" type="submit">Aceptar</button>
                    <button className="btn-secondary"> Cancelar</button>
                </div>
                </div>

               
                <div className="columna2">
                    <label>¿Por qué quieres viajar allí?</label>
                    <p id="error-description" className="error"></p>
                    <textarea className="custom-textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Cuéntanos por qué te gusta este destino"/>
                </div>
                

             

            </div>

        </form>

    );
};
