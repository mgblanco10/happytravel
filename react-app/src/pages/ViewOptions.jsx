import React from 'react';
import "../css/ViewOptions.css"

const ViewOptions = ({ viewOption, onViewOptionChange }) => {
  return (
    <div className="view-options">
      <button
        className={`view-option-btn ${viewOption === 'favorites' ? 'active' : ''}`}
        onClick={() => onViewOptionChange('favorites')}
      >
        Mis favoritos
      </button>
      <button
        className={`view-option-btn ${viewOption === 'userAdded' ? 'active' : ''}`}
        onClick={() => onViewOptionChange('userAdded')}
      >
        Mis destinos
      </button>
    </div>
  );
};

export default ViewOptions;
