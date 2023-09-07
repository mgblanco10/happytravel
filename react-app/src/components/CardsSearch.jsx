import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { Link } from "react-router-dom";
import infoIcon from "../assets/Info.svg";

const CardsSearch = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = () => {
      if (query) {
        const formattedQuery = query.toLowerCase().replace(/\s+/g, "");
        axios
          .get(
            `http://localhost:8000/api/happy_travel?search=${formattedQuery}`
          )
          .then((response) => {
            const data = response.data;
            setSearchResults(data);
          })
          .catch((error) => {
            console.error("Error fetching search results:", error);
          });
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div>
      {searchResults.length === 0 ? (
        <p className="not-query">
          No se encontraron destinos con el nombre, ni ubicación de la búsqueda
          realizada: "{query}"
        </p>
      ) : (
        <div className="card">
          {searchResults.map((travel) => (
            <div
              key={travel.id}
              className="cards"
              style={{ width: "18.75rem", height: "25rem" }}
            >
              <Link to={`/details/${travel.id}`} className="card-link">
                <img className="icon-info" src={infoIcon} alt="icono info" />
              </Link>
              <img
                className="card-img-top"
                src={`http://127.0.0.1:8000/${travel.image}`}
                alt="Card"
              />
              <div className="date-cards">
                <div className="card-body">
                  <h5 className="card-title">{travel.name}</h5>
                  <p className="card-text">{travel.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardsSearch;
