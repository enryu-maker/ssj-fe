import api from "../../../helper/AxiosInstance";

export const GetAllProducts = async (page = 1, subCategory = "") => {
  try {
    const response = await api.get("/product/", {
      params: {
        page,
        sub_category: subCategory,
      },
      headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    
    });
    return response;
  } catch (error) {
    throw new Error(`Error fetching all products: ${error.message}`);
  }
};

// Single product
export const GetSingleProduct = async (productId) => {
  try {
    const response = await api.get(`/product/${productId}/`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
    return response; // Assuming response.data contains the single product object
  } catch (error) {
    throw new Error(error.message);
  }
};

// Most gifted product
export const GetGiftedProduct = async () => {
  try {
    const response = await api.get("/web/most-gifted/");
    return response; // Assuming response.data contains the single product object
  } catch (error) {
    throw new Error(error.message);
  }
};

// TopSeller product
export const GetTopSellerProduct = async () => {
  try {
    const response = await api.get("/web/top-seller/");
    return response; // Assuming response.data contains the single product object
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get product by Tags
export const GetProductByTags = async (tagName) => {
  try {
    const response = await api.get("/product/tags", {
      params: {
        tags: tagName,
      },
    });
    return response; // Assuming response.data contains the products array or an object
  } catch (error) {
    throw new Error(error.message); // Throw an error if request fails
  }
};

// Get related Product
export const GetRelatedProduct = async (ProductId) => {
  try {
    const response = await api.get(`/product/recommend-product/${ProductId}/`);
    return response; // Assuming response.data contains the products array or an object
  } catch (error) {
    throw new Error(error.message); // Throw an error if request fails
  }
};

// Get Gold Material Price API
export const GetMaterialRate = async () => {
  try {
    const response = await api.get(`/web/get-gold-rate/`);
    return response; // Assuming response.data contains the single product object
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get Gold Material Price API
export const GetSilverRate = async () => {
  try {
    const response = await api.get(`/web/get-silver-rate/`);
    return response; // Assuming response.data contains the single product object
  } catch (error) {
    throw new Error(error.message);
  }
};

// Gel Search Product
export const GetSearchProduct = async (query) => {
  try {
    const response = await api.get(`/product/search?query=${query}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
