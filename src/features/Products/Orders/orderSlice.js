import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../../helper/AxiosInstance';

const initialState = {
    orders: [], // Make sure this is initialized as an empty array
    loading: false,
    error: null,
  };

// Fake data for testing purposes
const fakeOrders = [
  {
    id: 1,
    items: [
      {
        id: 1,
        name: 'Product A',
        image: 'https://via.placeholder.com/150',
        size_chart: [
          {
            size: [{ weight: 200 }],
            total_price: 100,
          },
        ],
      },
      {
        id: 2,
        name: 'Product B',
        image: 'https://via.placeholder.com/150',
        size_chart: [
          {
            size: [{ weight: 150 }],
            total_price: 80,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    items: [
      {
        id: 3,
        name: 'Product C',
        image: 'https://via.placeholder.com/150',
        size_chart: [
          {
            size: [{ weight: 300 }],
            total_price: 150,
          },
        ],
      },
    ],
  },
];

// Async thunk to fetch orders from the API
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call delay for testing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Replace with real API call using axios
      // const token = localStorage.getItem('accessToken');
      // const response = await axios.get('/orders/', {
      //   headers: { Authorization: `Bearer ${token}` },
      // });

      // For testing, return fakeOrders instead of response.data
      return fakeOrders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch orders from the API
export const CreateOrder = createAsyncThunk(
  'orders/CreateOrders',
  async (OrderDetails, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      console.log(token);
      const response = await api.post('/order/place-order/', OrderDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateOrder.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous error state
      })
      .addCase(CreateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        
      })
      .addCase(CreateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error('Failed to fetch orders.', { position: 'bottom-left' });
      });
  },
});

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;

export default ordersSlice.reducer;
