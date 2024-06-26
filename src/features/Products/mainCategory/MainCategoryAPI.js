import axios from 'axios';

export const getMainCategory = async () => {
  try {
    const response = await axios.get('/product/main-category/');
    // console.log('Response:', response); // Log the entire response for inspection
    if (!response.data) {
      throw new Error('Invalid response data from server');
    }
    return response.data;
  } catch (error) {
    if (error.response) {
     
      throw new Error(error.response.data.message || 'Network response was not ok');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an error
      throw new Error('Request failed, please try again later');
    }
  }
};


