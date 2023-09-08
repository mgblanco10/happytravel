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
import favIcon from "../assets/fav.svg"

export default function CardsGuest() {
  const [travels, setTravels] = useState([]);
  const { user, setUser } = useAuth();
  const [deleteId, setDeleteId] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      const travels = await fetchCards();
      setTravels(travels);
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
          <div  key={travel.id} className="cards" style={{ width: '18.75rem', height: '25rem' }}>
            {user && (
              <Link to={`/details/${travel.id}`} className="card-link"> 
                <img className="icon-info" src={infoIcon} alt="icono info"/>
              </Link>
            )}
            <img className="card-img-top" src={`http://127.0.0.1:8000/${travel.image}`} alt="Card" />
            <div className='date-cards'>
              <div className="card-body">
                <h5 className="card-title">{travel.name}</h5>
                <p className="card-text">{travel.location}</p>
              </div>
              {user && (
                <div>
                    <button onClick={() => handleAddToFavorites(travel.id)} className="card-fav-button">
                      <img className="icon-cards-fav" src={favIcon} alt="icono para guardar en favoritos un destino" />
                    </button>

                  <Link to={`/edit/${travel.id}`} className="card-edit">
                    <img className="icon-cards" src={editIcon} alt="icono de editar destino" />
                  </Link>

                  <button onClick={() => openDeleteModal(travel.id)} className="card-delete-button">
                    <img className="icon-cards-delete" src={deleteIcon} alt="icono de eliminar destino" />
                  </button>
                </div>
              )}
            </div>
          </div>
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




























































































//METODO QUE POSIBLEMENTE FUNCIONE UNA VEZ QUE EL USUARIO SE REGISTRE O INICIE SESION

// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { fetchCards } from '../services/ApiGetArray';
// import { Link } from 'react-router-dom';
// import "../css/CardsGuest.css";

// import editIcon from '../assets/edit-icon.svg';
// import deleteIcon from '../assets/delete-icon.svg';

// export default function CardsGuest() {
//   const [travels, setTravels] = useState([]);
//   const location = useLocation(); 

//   useEffect(() => {
//     const fetchData = async () => {
//       const travels = await fetchCards();
//       setTravels(travels);
//     };

//     fetchData();
//   }, []);

//   const shouldShowEditAndDelete = location.pathname === '/dashboard'; 

//   return (
//     <div>
//       <div className="card">
//         {travels.map((travel) => (
//           <div className="cards" style={{ width: '18.75rem', height: '25rem' }}>
//             <img className="card-img-top" src={`http://127.0.0.1:8000/${travel.image}`} alt="Card" />
//             <div className='date-cards'>
//               <div className="card-body">
//                 <h5 className="card-title">{travel.name}</h5>
//                 <p className="card-text">{travel.location}</p>
//               </div>
//               {shouldShowEditAndDelete && ( // Condición para renderizar los enlaces
//                 <div>
//                   <Link to={`/happy_travel/edit/${travel.id}`} className="card-edit"> {/* Cambia la ruta según tu configuración */}
//                     <img className="icon-cards" src={editIcon} alt="icono de editar destino" />
//                   </Link>
//                   <Link to={`/happy_travel/delete/${travel.id}`} className="card-delete"> {/* Cambia la ruta según tu configuración */}
//                     <img className="icon-cards" src={deleteIcon} alt="icono de eliminar destino" />
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
