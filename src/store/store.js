import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/Auth/authSlice';
import collectionsReducer from '../features/Products/collectios/collectionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collections: collectionsReducer,
    cart: cartReducer,
  },
});
