import axios from 'axios';

export async function deleteCard(id) {
  try {
    const response = await axios.delete(`http://localhost:8000/api/happy_travel/${id}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      console.log('Elemento eliminado con éxito');
      return true; 
    } else {
      console.error('Error al eliminar el elemento');
      return false;
    }
  } catch (error) {
    console.error('Error al eliminar el elemento:', error);
    return false; 
  }
}
