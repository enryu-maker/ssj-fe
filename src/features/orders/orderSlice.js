import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../helper/AxiosInstance';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

// Create Order API Call and Razorpay Integration
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    console.log('Token in API call:', token); // Verify token

    try {
      // Create order on your server
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

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrder',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    
    
    if (!token) {
      console.error('Token not found in LocalStorage');
      return rejectWithValue('Unauthorized: Token not found');
    }

    console.log('Token in API call:', token); // Verify token

    try {
      // Create order on your server
      const response = await api.get('/profile/order/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log(response);
      
      return response.data; // Ensure correct data format is returned
    } catch (error) {
      console.error('Error in API call:', error.response?.data || error.message); // Log full error
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (transactionId, { rejectWithValue }) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await api.get(`/profile/order/${transactionId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);



const orderSlice = createSlice({
  name: 'orders',
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
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;

export default orderSlice.reducer;
