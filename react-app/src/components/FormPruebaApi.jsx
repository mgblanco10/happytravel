import React, { useState } from 'react';
import axios from 'axios';

const FormPruebaApi = () => {
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
        headers: {
          'Content-Type': 'multipart/form-data',
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
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Ubicación</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Imagen</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Crear Destino</button>
      </form>
    </div>
  );
};

export default FormPruebaApi;
