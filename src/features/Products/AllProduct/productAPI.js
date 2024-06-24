import axios from "axios";

export const GetAllProducts = async () => {
      try {
        const response = await axios.get('/product/');
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    }
 
    export const GetSingleProduct = async (productId) => {
      try {
        const response = await axios.get(`http://190.92.175.141/product/${productId}`);
        return response.data; // Assuming response.data contains the single product object
      } catch (error) {
        throw new Error(error.message);
      }
    };