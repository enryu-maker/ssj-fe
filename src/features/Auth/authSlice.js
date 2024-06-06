import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, verifyOtp } from './authAPI';

// Thunks for creating user and verifying OTP
export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyOtpAsync = createAsyncThunk(
  'auth/verifyOtp',
  async (otp, { rejectWithValue }) => {
    try {
      const response = await verifyOtp({ otp });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        state.isLoading = false;
      })
      .addCase(verifyOtpAsync.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(verifyOtpAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(verifyOtpAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        state.isLoading = false;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;
