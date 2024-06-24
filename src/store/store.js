import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/Auth/authSlice';
import collectionsReducer from '../features/Products/collectios/collectionSlice';
import productsReducer from '../features/Products/AllProduct/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collections: collectionsReducer,
    products: productsReducer,
    cart: cartReducer,
  
  },
});
