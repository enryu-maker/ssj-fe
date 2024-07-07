import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../helper/AxiosInstance';

const initialState = {
  orders: null,
  loading: false,
  error: null,
};

// Function to create a user in your API
export const createOrder = createAsyncThunk(
  'auth/createUser',
  async (orderData, { rejectWithValue }) => {
    const token = sessionStorage.getItem('access_token');
    try {
      const response = await api.post('/auth/login/', orderData, {
        headers: {
            'Authorization': `Bearer ${token}`,
          },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Slice definition
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; 
        toast.success('Order created successfully!', { position: 'bottom-left' });
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  },
});



export const selectOrder = (state) => state.order.orders;
export const selectAuthError = (state) => state.order.error;
export const selectLoading = (state) => state.order.loading;

export default orderSlice.reducer;

