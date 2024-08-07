import api from "../../../helper/AxiosInstance";


export const getMainCategory = async () => {
  try {
    const response = await api.get('/product/main-category/');
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
