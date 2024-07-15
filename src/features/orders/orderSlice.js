import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../helper/AxiosInstance';
import Razorpay from 'razorpay';

const initialState = {
  orders: null,
  loading: false,
  error: null,
};

// Create Order API Call and Razorpay Integration
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue, dispatch }) => {
    const token = sessionStorage.getItem('accessToken');
    console.log('Token in API call:', token); // Verify token

    try {
      // Create order on your server
      const response = await api.post('/order/place-order/', orderData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const { order } = response.data;
      return order;
    } catch (error) {
      console.error('Error in API call:', error.response?.data || error.message); // Log full error
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Finalize Order (Update order status after payment success)
export const finalizeOrder = createAsyncThunk(
  'order/finalizeOrder',
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await api.post('/order/finalize-order/', { paymentId });
      return response.data;
    } catch (error) {
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
        toast.success('Order initiated successfully!', { position: 'bottom-left' });
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Failed to place order: ${action.payload}`, { position: 'bottom-left' });
      })
      .addCase(finalizeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(finalizeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        toast.success('Order placed successfully!', { position: 'bottom-left' });
      })
      .addCase(finalizeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Failed to finalize order: ${action.payload}`, { position: 'bottom-left' });
      });
  },
});

export default orderSlice.reducer;
