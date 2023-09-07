import axios from 'axios';

export const deleteTravel = (id) => {
  try {
    return axios.delete(`http://localhost:8000/api/happy_travel/${id}`, {
      withCredentials: true,
      headers: {
        "Accept": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error('Error deleting travel:', error);
      return false;
    });
  } catch (error) {
    console.error('Error deleting travel:', error);
    return false;
  }
};
