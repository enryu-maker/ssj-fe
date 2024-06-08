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
  async ({ mobile_number, otp }, { rejectWithValue }) => {
    try {
      const response = await verifyOtp({ mobile_number, otp });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// helper func for saving cookies
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    isLoading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    checkAuthentication(state) {
      const accessToken = getCookie('access_token') || sessionStorage.getItem('access_token');
      const refreshToken = getCookie('refresh_token') || sessionStorage.getItem('refresh_token');
      const IsComplete = getCookie('is_complete') || sessionStorage.getItem('is_complete');

      if (accessToken && refreshToken) {
        state.isAuthenticated = true;
        state.user = { accessToken, refreshToken };
      }
    },
  },
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
        state.isAuthenticated = true;

        // Save tokens in cookies and session storage
        setCookie('access_token', action.payload.access, 7);
        setCookie('refresh_token', action.payload.refresh, 7);
        setCookie('is_complete', action.payload.is_complete, 7);
        sessionStorage.setItem('access_token', action.payload.access);
        sessionStorage.setItem('refresh_token', action.payload.refresh);
        sessionStorage.setItem('is_complete', action.payload.is_complete);
      })
      .addCase(verifyOtpAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { checkAuthentication } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
