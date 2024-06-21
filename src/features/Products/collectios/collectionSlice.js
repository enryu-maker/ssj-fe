import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCollections } from './collectionAPI';

// Async thunk to fetch collections
export const fetchCollectionsAsync = createAsyncThunk(
  "collections/fetchCollections",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCollections();
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

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollectionsAsync.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollectionsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.data = action.payload; // Use action.payload to set the data
      })
      .addCase(fetchCollectionsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export selectors
export const selectCollections = (state) => state.collections.data;
export const selectCollectionsLoading = (state) => state.collections.loading;
export const selectCollectionsError = (state) => state.collections.error;

export default collectionsSlice.reducer;
