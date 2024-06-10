import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VerifyUserDetails, createUser, getProfile, verifyOtp, updateProfile } from "../Auth/authAPI";

// Thunks for creating user, verifying OTP, fetching profile, and updating profile
export const createUserAsync = createAsyncThunk(
  "auth/createUser",
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
  "auth/verifyOtp",
  async ({ mobile_number, otp }, { rejectWithValue }) => {
    try {
      const response = await verifyOtp({ mobile_number, otp });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyUserDetailsAsync = createAsyncThunk(
  "auth/verifyUserDetails",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await VerifyUserDetails(userDetails);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserProfileAsync = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfileAsync = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await updateProfile(profileData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Helper functions for cookie handling
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    isLoading: false,
    error: null,
    isAuthenticated: false,
    profile: null, // Add profile to state
  },
  reducers: {
    checkAuthentication(state) {
      const accessToken =
        getCookie("access_token") || sessionStorage.getItem("access_token");
      const refreshToken =
        getCookie("refresh_token") || sessionStorage.getItem("refresh_token");
      const mobileNumber = sessionStorage.getItem("mobile_number");

      if (accessToken && refreshToken && mobileNumber) {
        state.isAuthenticated = true;
        state.user = { accessToken, refreshToken, mobileNumber };
      }
    },
    logout(state) {
      // Clear tokens from cookies and session storage
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      sessionStorage.removeItem("is_complete");
      sessionStorage.removeItem("mobile_number");

      // Clear user state
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.isLoading = false;
      })
      .addCase(verifyOtpAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(verifyOtpAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoading = false;
        state.isAuthenticated = true;

        // Save tokens in cookies and session storage
        setCookie("access_token", action.payload.access, 7);
        setCookie("refresh_token", action.payload.refresh, 7);
        setCookie("is_complete", action.payload.is_complete, 7);
        sessionStorage.setItem("access_token", action.payload.access);
        sessionStorage.setItem("refresh_token", action.payload.refresh);
        sessionStorage.setItem("is_complete", action.payload.is_complete);
        sessionStorage.setItem("mobile_number", action.payload.mobile_number);
      })
      .addCase(verifyOtpAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(verifyUserDetailsAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(verifyUserDetailsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(verifyUserDetailsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchUserProfileAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchUserProfileAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserProfileAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.isLoading = false;
      })
      .addCase(updateUserProfileAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserProfileAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.isLoading = false;
      });
  },
});

export const { checkAuthentication, logout } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserProfile = (state) => state.auth.profile;

export default authSlice.reducer;
