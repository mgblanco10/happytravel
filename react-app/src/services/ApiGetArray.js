import axios from 'axios';

export const fetchCards = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8000/api/happy_travel'
    );
    const travels = response.data;
    return travels;
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
};

