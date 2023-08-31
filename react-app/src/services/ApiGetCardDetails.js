import axios from 'axios';

export const fetchCardDetails = async (id) => { 
  try {
    const response = await axios.get(
      `http://localhost:8000/api/happy_travel/${id}` 
    );
    const travelDetails = response.data;
    return travelDetails; 
  } catch (error) {
    console.error('Error fetching card details:', error);
    return {}; 
  }
};