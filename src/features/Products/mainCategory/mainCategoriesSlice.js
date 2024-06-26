import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMainCategory } from './MainCategoryAPI';

// Async thunk to fetch main categories
export const fetchMainCategoryAsync = createAsyncThunk(
  'category/fetchMainCategory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMainCategory();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  status: 'idle',
  loading: false,
  error: null,
};

const MainCategorySlice = createSlice({
  name: 'MainCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainCategoryAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainCategoryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMainCategoryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload.toString();
      });
  },
});

// Export selectors
export const selectMainCategories = (state) => state.MainCategory.data;
export const selectMainCategoryLoading = (state) => state.MainCategory.loading;
export const selectMainCategoryError = (state) => state.MainCategory.error;

export default MainCategorySlice.reducer;
