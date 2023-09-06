import axios from 'axios';

export const deleteTravel = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/happy_travel/${id}`, {
      withCredentials: true,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return true; 
    } else {
      return false; 
    }
  } catch (error) {
    console.error('Error deleting travel:', error);
    return false; 
  }
};