import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetAllProducts,
  GetGiftedProduct,
  GetProductByTags,
  GetSingleProduct,
  GetTopSellerProduct,
} from "./productAPI";

const initialState = {
  products: [],
  singleProduct: [],
  tagsProduct: [],
  GiftedProduct: [],
  TopSellerProduct: [],
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
      return response; // Assuming the API response structure has a 'data' property
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
      return response; // Assuming the API response structure has a 'data' property
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Async thunk to fetch all products using axios
export const fetchTopSellerProductsAsync = createAsyncThunk(
  "products/fetchTopSellerProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetTopSellerProduct();
      if (!response) {
        throw new Error("Invalid response from server");
      }
      return response; // Assuming the API response structure has a 'data' property
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

// Async thunk to fetch a single product using axios
export const fetchProductByTagsAsync = createAsyncThunk(
  "products/fetchProductByTags",
  async (Tagname, { rejectWithValue }) => {
    try {
      const response = await GetProductByTags(Tagname);
      console.log(response);
      if (!response) {
        throw new Error("Invalid response from server");
      }
      return response;
      // return response; // Assuming the API response structure has a 'data' property
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
  },
});

export const { setPage, setSubCategory } = productsSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectSingleProduct = (state) => state.products.singleProduct;
export const selectProductByTag = (state) => state.products.tagsProduct;
export const selectGiftedProducts = (state) => state.products.GiftedProduct;
export const selectTopSellerProducts = (state) => state.products.TopSellerProduct;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectSubCategory = (state) => state.products.subCategory;

export default productsSlice.reducer;
