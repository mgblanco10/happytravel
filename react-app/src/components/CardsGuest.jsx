import React, { useState, useEffect } from 'react';
import { fetchCards } from '../services/ApiGetArray';
import { Link } from 'react-router-dom';
import "../css/CardsGuest.css";
import editIcon from '../assets/edit-icon.svg';
import deleteIcon from '../assets/delete-icon.svg';
import infoIcon from '../assets/Info.svg';
import { useAuth } from '../contexts/AuthContext';
import { deleteTravel } from '../services/ApiDeleteTravel'; 
import ModalAction from './Modal'; 

export default function CardsGuest({ user_id }) {
  const [travels, setTravels] = useState([]);
  const { user, hasRole, can } = useAuth();
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const allTravels = await fetchCards();
      setTravels(allTravels);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteTravel(id);

    if (success) {
      setTravels((prevTravels) => prevTravels.filter((travel) => travel.id !== id));
    }

    setDeleteId(null);
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
  };

  return (
    <div>
      <div className="card">
        {travels.map((travel) => (
          (!user_id || travel.user_id === user_id) ? (
            <div key={travel.id} className="cards" style={{ width: '18.75rem', height: '25rem' }}>
              {(user && hasRole('Admin' && 'SuperAdmin'))  || (user && user.id === travel.user_id) ? (
                <Link to={`/details/${travel.id}`} className="card-link">
                  <img className="icon-info" src={infoIcon} alt="icono info" />
                </Link>
              ) : null}
              <img className="card-img-top" src={`http://127.0.0.1:8000/${travel.image}`} alt="Card" />
              
              <div className='date-cards'>
                <div className="card-body">
                  <h5 className="card-title">{travel.name}</h5>
                  <p className="card-text">{travel.location}</p>
                </div>
                {(user && hasRole('Admin')) || (user && user.id === travel.user_id) ? (
                  <div>
                    <Link to={`/edit/${travel.id}`} className="card-edit">
                      <img className="icon-cards" src={editIcon} alt="icono de editar destino" />
                    </Link>
                    <button onClick={() => openDeleteModal(travel.id)} className="card-delete-button">
                      <img className="icon-cards-delete" src={deleteIcon} alt="icono de eliminar destino" />
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null
        ))}
      </div>
      <ModalAction
        isOpen={deleteId !== null}
        onClose={closeDeleteModal}
        onDelete={() => handleDelete(deleteId)}
      />
    </div>
  );
}



