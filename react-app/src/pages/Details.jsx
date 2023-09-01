import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCardDetails } from '../services/ApiGetCardDetails'; 
import { useParams } from 'react-router-dom';
import editIcon from '../assets/edit-icon.svg';
import deleteIcon from '../assets/delete-icon.svg';
import "../css/Details.css";

export default function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      const travelDetails = await fetchCardDetails(id); 
      setDetails(travelDetails); 
    };

    fetchDetails();
  }, [id]);

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

          <>
          <Link to={`/edit/${details.id}`}>
              <img className="icon-edit" src={editIcon} alt="icono editar" />
            </Link>
            
              <img className="icon-delete" src={deleteIcon} alt="icono borrar" />
            
          </>
     
      </div>
    </div>
  </div>

  )
}
