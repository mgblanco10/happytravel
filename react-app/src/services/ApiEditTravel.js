import axios from 'axios';

export const editCard = (id, formData) => axios.put(`http://localhost:8000/api/happy_travel/${id}`, formData, {
    withCredentials: true,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  })
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
  

