import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/Auth/authSlice';
import collectionsReducer from '../features/Products/collectios/collectionSlice';
import productsReducer from '../features/Products/AllProduct/productSlice';
import wishlistReducer from '../features/Wishlist/wishlistSlice';
import orderReducer from '../features/Products/Orders/orderSlice';
import categoryReducer from '../features/Products/subCategory/categorySlice';
import mainCategoriesReducer from '../features/Products/mainCategory/mainCategoriesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collections: collectionsReducer,
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
    category: categoryReducer,
    MainCategory: mainCategoriesReducer
  },
});
