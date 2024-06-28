import api from "../../helper/AxiosInstance";


export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.post('/auth/login/', userData);

      if (!response.status === 200) { // Check for HTTP 200 status
        throw new Error('Network response was not ok');
      }

      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
}

// Function to get user profile
export const getProfile = async () => {
  const token = sessionStorage.getItem('access_token');
  try {
    const response = await api.get('/profile/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
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
