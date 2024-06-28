import api from "../../../helper/AxiosInstance";


export const GetAllProducts = async (page = 1, subCategory = '') => {
  try {
    const response = await api.get('/product/', {
      params: {
        page,
        sub_category: subCategory,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching all products: ${error.message}`);
  }
};

// Single product
export const GetSingleProduct = async (productId) => {
  
  try {
    const response = await api.get(`/product/${productId}/`);
    return response; // Assuming response.data contains the single product object
  } catch (error) {
    throw new Error(error.message);
  }
};

// Most gifted product
export const GetGiftedProduct = async () => {
  try {
    const response = await api.get('/web/most-gifted/');
    return response; // Assuming response.data contains the single product object
  } catch (error) {
    throw new Error(error.message);
  }
};

// TopSeller product
export const GetTopSellerProduct = async () => {
  try {
    const response = await api.get('/web/top-seller/');
    return response; // Assuming response.data contains the single product object
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get product by Tags
export const GetProductByTags = async (tagName) => {
  try {
    const response = await api.get('/product/tags', {
      params: {
        tags: tagName,
      },
    });
    return response; // Assuming response.data contains the products array or an object
  } catch (error) {
    throw new Error(error.message); // Throw an error if request fails
  }
};
