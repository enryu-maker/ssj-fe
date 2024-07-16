import api from "../../../helper/AxiosInstance";


export const getCategory = async () => {
  try {
    const response = await api.get('/product/sub-category/');
    return response;
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

export const getCategoryById = async (categoryId) => {
  try {
    const response = await api.get(`/product/sub-category/${categoryId}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
