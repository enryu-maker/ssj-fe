import axios from 'axios';

export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/login/", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

// otp verify
export async function verifyOtp(otpData) {
  const response = await fetch("/auth/verify/", {
    method: "POST",
    body: JSON.stringify(otpData),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  console.log(data);
  return { ok: response.ok, data };
}



export const VerifyUserDetails = async (userDetails) => {
  const token = sessionStorage.getItem('access_token'); 
  try {
    const response = await axios.post('/auth/complete-profile/', userDetails, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add the authorization header
      },
    });
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

// Function to get user profile
// export const getProfile = async () => {
//   const token = sessionStorage.getItem('access_token');
//   try {
//     const response = await axios.get('/profile/', {
//       headers: {
//         'Authorization': `Bearer ${token}`, 
//       },
//     });
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       throw new Error(error.response.data.message || 'Network response was not ok');
//     } else if (error.request) {
//       // Request was made but no response was received
//       throw new Error('No response received from server');
//     } else {
//       // Something happened in setting up the request
//       throw new Error(error.message);
//     }
//   }
// };

// Function to update user profile
export const updateProfile = async (profileData) => {
  const token = sessionStorage.getItem('access_token');
  try {
    const response = await axios.post('/auth/edit-profile/', profileData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Network response was not ok');
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(error.message);
    }
  }
};

