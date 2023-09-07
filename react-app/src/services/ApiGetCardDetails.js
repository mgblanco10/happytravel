import axios from 'axios';

export const fetchCardDetails = (id) => {
  return axios
    .get(`http://localhost:8000/api/happy_travel/${id}`, {
      withCredentials: true,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const travelDetails = response.data;
      return travelDetails;
    })
    .catch((error) => {
      console.error('Error fetching card details:', error);
      return {};
    });
};
