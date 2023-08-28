import React, { useState, useEffect } from 'react';
import { fetchCards } from '../services/ApiGetArray';


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
      <div className="cards">
        {travels.map((travel) => (
    <div className="card" style={{ width: '17rem' }}>
      
      <img className="card-img-top" src={travel.image} alt="Card" />
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
