import axios from "axios";

  export const GetAllProducts = async (page = 1, subCategory = '') => {
    try {
      const response = await axios.get('/product/', {
        params: {
          page,
          sub_category: subCategory
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching all products: ${error.message}`);
    }
  }

//  single product
    export const GetSingleProduct = async (productId) => {
      try {
        const response = await axios.get(`/product/${productId}/`);
        return response; // Assuming response.data contains the single product object
      } catch (error) {
        throw new Error(error.message);
      }
    };
    
    export const GetProductByTags = async (tagName) => {
      try {
        const response = await axios.get(`/product/tags?tags=${tagName}`);
        return response.data; // Assuming response.data contains the products array or an object
      } catch (error) {
        throw new Error(error.message); // Throw an error if request fails
      }
    };

   