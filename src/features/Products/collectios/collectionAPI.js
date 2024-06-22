
import axios from 'axios';

export const getCollections = async () => {
  
  try {
    const response = await axios.get('/web/collections');
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Network response was not ok');
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error('No response received from server');
    } else {
      // Something happened in setting up the request
      throw new Error(error.message);
    }
  }
};

export const getCollectionById = async (collectionId) => {
    try {
      const response = await axios.get(`/web/collections/${collectionId}/`);
      return response.data;
    } catch (error) {
      throw new  Error(error.message);
    }
  }

