import React, { useState, useEffect } from 'react';
import { fetchCards } from '../services/ApiGetArray';
import "../css/CardsGuest.css";


export default function CardsGuest() {
      const [travels, setTravels] = useState([]);

      useEffect(() => {
    const fetchData = async () => {
      const travels = await fetchCards();
      setTravels(travels);
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="card">
        {travels.map((travel) => (
    <div className="cards" style={{ width: '18.75rem', height:'25rem' }}>
      
      <img className="card-img-top" src={`http://127.0.0.1:8000/${travel.image}`} alt="Card" />
      <div className="card-body">
        <h5 className="card-title">{travel.name}</h5>
        <p className="card-text">{travel.location}</p>
      </div>
    </div>
        ))}
      </div>
    </div>
  )
}
