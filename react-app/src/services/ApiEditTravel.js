import axios from 'axios';


export async function editCard(id, formData) {
    try {
      const response = await axios.put(`http://localhost:8000/api/happy_travel/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });
  
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  

