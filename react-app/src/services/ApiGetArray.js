import axios from 'axios';

export const fetchCards = () => {
  return axios
    .get('http://localhost:8000/api/happy_travel')
    .then((response) => {
      const travels = response.data;
      return travels;
    })
    .catch((error) => {
      console.error('Error fetching cards:', error);
      return [];
    });
};


