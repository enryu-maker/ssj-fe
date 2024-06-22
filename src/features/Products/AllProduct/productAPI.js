import axios from "axios";

export const GetAllProducts = async () => {
      try {
        const response = await axios.get('/product/');
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    }
 