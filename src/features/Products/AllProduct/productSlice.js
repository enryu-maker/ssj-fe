import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetAllProducts,
  GetProductByTags,
  GetSingleProduct,
} from "./productAPI";

const initialState = {
  products: [],
  singleProduct: null,
  tagsProduct: null,
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
      });
  },
});

export const { setPage, setSubCategory } = productsSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectSingleProduct = (state) => state.products.singleProduct;
export const selectProductByTag = (state) => state.products.tagsProduct;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectSubCategory = (state) => state.products.subCategory;

export default productsSlice.reducer;
