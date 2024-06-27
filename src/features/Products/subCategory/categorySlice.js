import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategory, getCategoryById } from './categoryAPI';

// Async thunk to fetch collections
export const fetchCategoryAsync = createAsyncThunk(
  "category/fetchCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategory();
      console.log(response); // Log the response to see its structure
      if (!response) {
        throw new Error("Invalid response from server");
      }
      return response; // Return only the data part of the response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategoryByIdAsync = createAsyncThunk(
  'category/fetchCategoryById',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await getCategoryById(categoryId);
      console.log(response);
      if (!response) {
        throw new Error("Invalid response from server");
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  category: null,
  status: "idle",
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.data = action.payload; // Use action.payload to set the data
      })
      .addCase(fetchCategoryAsync.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategoryByIdAsync.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategoryByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export selectors
export const selectCategories = (state) => state.category.data;
export const selectCategory = (state) => state.category.category;
export const selectCategoryLoading = (state) => state.category.loading;
export const selectCategoryError = (state) => state.category.error;

export default categorySlice.reducer;
