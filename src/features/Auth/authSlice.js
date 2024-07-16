import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../../helper/firebase';
import { toast } from 'react-toastify';
import api from '../../helper/AxiosInstance';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
};

// Function to create a user in your API
export const createUser = createAsyncThunk(
  'auth/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login/', userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to sign in with Google and create user in your API
export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      const user = { name: displayName, email };

      // Send user data to your API
      const apiResponse = await dispatch(createUser(user));
    
      const { access } = apiResponse.payload;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Display success toast
      toast.success('Logged in successfully!', { position: 'bottom-left' });
      
      return user;
    } catch (error) {
      toast.error('Login failed!', { position: 'bottom-left' });
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return rejectWithValue('No access token found');
    }

    try {
      const response = await api.get('/profile/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update user profile with FormData
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      // Send FormData in POST request
      const response = await api.post('/auth/edit-profile/', profileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      });

      // Display success toast
      toast.success('Profile updated successfully!', { position: 'bottom-left' });

      

      return response.data;
    } catch (error) {
      // Display error toast
      toast.error('Failed to update profile!', { position: 'bottom-left' });

      // Debugging: log error details
      console.error('Update profile error:', error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Async thunk to sign out
export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      
      // Display success toast
      toast.info('Logged out successfully!', { position: 'bottom-left' });

      window.location.reload();
    } catch (error) {
      toast.error('Logout failed!', { position: 'bottom-left' });
      return rejectWithValue(error.message);
    }
  }
);

// Slice definition
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signOutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and selectors
export const { setUser, clearUser, setError, clearError } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;
export const selectLoading = (state) => state.auth.loading;

export default authSlice.reducer;

// Ensure user remains authenticated on page refresh
export const initializeAuthState = () => (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = localStorage.getItem('accessToken');

  if (user && accessToken) {
    dispatch(setUser(user));
  } else {
    dispatch(clearUser());
  }
};
