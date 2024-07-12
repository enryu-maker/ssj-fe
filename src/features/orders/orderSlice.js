import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../helper/AxiosInstance';

const initialState = {
  orders: null,
  loading: false,
  error: null,
};

// Create Order API Call
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    const token = sessionStorage.getItem('accessToken');
    console.log('Token in API call:', token); // Verify token

    try {
      const response = await api.post('/order/place-order/', orderData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error in API call:', error.response?.data || error.message); // Log full error
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        toast.success('Order placed successfully!', { position: 'bottom-left' });
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Failed to place order: ${action.payload}`, { position: 'bottom-left' });
      });
  },
});

export default orderSlice.reducer;
