import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetAllProducts,
  GetGiftedProduct,
  GetMaterialRate,
  GetProductByTags,
  GetRelatedProduct,
  GetSingleProduct,
  GetTopSellerProduct,
} from "./productAPI";

const initialState = {
  products: [],
  singleProduct: [],
  tagsProduct: [],
  GiftedProduct: [],
  TopSellerProduct: [],
  RelatedProduct: [], // Added state for related products
  status: "idle",
  loading: false,
  error: null,
  currentPage: 1,
  subCategory: "",
};

// Async thunk to fetch all products using axios
export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async ({ page = 1, subCategory = "" }, { rejectWithValue }) => {
    try {
      const response = await GetAllProducts(page, subCategory);
      if (!response) {
        throw new Error("Invalid response from server");
      }
      return response.data; // Assuming the API response structure has a 'data' property
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch gifted products using axios
export const fetchGiftedProductsAsync = createAsyncThunk(
  "products/fetchGiftedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetGiftedProduct();
      if (!response) {
        throw new Error("Invalid response from server");
      }
      return response.data; // Assuming the API response structure has a 'data' property
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch top seller products using axios
export const fetchTopSellerProductsAsync = createAsyncThunk(
  "products/fetchTopSellerProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetTopSellerProduct();
      if (!response) {
        throw new Error("Invalid response from server");
      }
      return response.data; // Assuming the API response structure has a 'data' property
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch a single product using axios
export const fetchSingleProductAsync = createAsyncThunk(
  "products/fetchSingleProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await GetSingleProduct(productId);
      if (!response || response.status !== 200 || !response.data) {
        throw new Error("Invalid response from server");
      }
      return response.data; // Assuming the API response structure has a 'data' property
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch products by tags using axios
export const fetchProductByTagsAsync = createAsyncThunk(
  "products/fetchProductByTags",
  async (Tagname, { rejectWithValue }) => {
    try {
      const response = await GetProductByTags(Tagname);
      console.log(response);
      if (!response) {
        throw new Error("Invalid response from server");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch material rate using axios
export const fetchMaterialRateAsync = createAsyncThunk(
  "products/fetchMaterialRate",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetMaterialRate();
      if (!response) {
        throw new Error("Invalid response from server");
      }
      return response.data; // Assuming the API response structure has a 'data' property
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch related products using axios
export const fetchRelatedProductAsync = createAsyncThunk(
  "products/fetchRelatedProduct",
  async (ProductId, { rejectWithValue }) => {
    try {
      const response = await GetRelatedProduct(ProductId);
      if (!response) {
        throw new Error("Invalid response from server");
      }
      return response.data; // Assuming the API response structure has a 'data' property
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSubCategory: (state, action) => {
      state.subCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Products
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Single Product
      .addCase(fetchSingleProductAsync.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.singleProduct = action.payload; // Update with the fetched product object
      })
      .addCase(fetchSingleProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Products by Tags
      .addCase(fetchProductByTagsAsync.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchProductByTagsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.tagsProduct = action.payload;
      })
      .addCase(fetchProductByTagsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Gifted Products
      .addCase(fetchGiftedProductsAsync.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchGiftedProductsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.GiftedProduct = action.payload;
      })
      .addCase(fetchGiftedProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Top Seller Products
      .addCase(fetchTopSellerProductsAsync.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchTopSellerProductsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.TopSellerProduct = action.payload;
      })
      .addCase(fetchTopSellerProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Material Rate
      .addCase(fetchMaterialRateAsync.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchMaterialRateAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.MaterialPrice = action.payload; // Update with the fetched material rate
      })
      .addCase(fetchMaterialRateAsync.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Related Products
      .addCase(fetchRelatedProductAsync.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchRelatedProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.RelatedProduct = action.payload; // Update with the fetched related products
      })
      .addCase(fetchRelatedProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, setSubCategory } = productsSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectSingleProduct = (state) => state.products.singleProduct;
export const selectProductByTag = (state) => state.products.tagsProduct;
export const selectGiftedProducts = (state) => state.products.GiftedProduct;
export const selectTopSellerProducts = (state) => state.products.TopSellerProduct;
export const selectRelatedProducts = (state) => state.products.RelatedProduct; // Added selector
export const selectMaterialPrice = (state) => state.products.MaterialPrice;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectSubCategory = (state) => state.products.subCategory;

export default productsSlice.reducer;
