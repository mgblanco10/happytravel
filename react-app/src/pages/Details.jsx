import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCardDetails } from '../services/ApiGetCardDetails'; 
import { useParams } from 'react-router-dom';
import editIcon from '../assets/edit-icon.svg';
import deleteIcon from '../assets/delete-icon.svg';
import "../css/Details.css";
import ModalAction from '../components/Modal';
import axios from 'axios';

export default function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const travelDetails = await fetchCardDetails(id); 
      setDetails(travelDetails); 
    };

    fetchDetails();
  }, [id]);

  // const handleDeleteClick = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  const handleDelete = async () => {
    try {
      console.log('Eliminando elemento con ID:', id);

      await axios.delete(`http://localhost:8000/api/happy_travel/${id}`, {
        withCredentials: true, 
      });
      
      console.log('Elemento eliminado con éxito');
  
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
   
    // } finally {
    //   setIsModalOpen(false); 
    }
  };


  return (

 
    <div className="container">
    <div className="show-container">
      <img className="show-image" src={`http://127.0.0.1:8000/${details.image}`}  alt="Imagen del destino" />
      <div className="text-container">
        <div className="titles-container">
          <h2 className="travel-name">{details.name}</h2>
          <h3 className="travel-location">{details.location}</h3>
        </div>
        <p className="travel-description">{details.description}</p>
      </div>
      <div className="icon-container"> 
          <Link to={`/edit/${details.id}`}>
              <img className="icon-edit" src={editIcon} alt="icono editar" />
            </Link>
            
              <img className="icon-delete" src={deleteIcon} alt="icono borrar" onClick={handleDelete} />

      </div>
    </div>
    {/* <ModalAction
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDelete}
      /> */}
  </div>

  )
}
