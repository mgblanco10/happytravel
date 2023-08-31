import React, { useState } from 'react';

export default function Search ({handleSearchSubmit}) {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit(searchInput)
  }


  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchInput}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};
