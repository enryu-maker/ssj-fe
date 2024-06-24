// src/features/wishlist/wishlistSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [], // Array to hold wishlist items
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { id } = action.payload;
      const existingItemIndex = state.wishlistItems.findIndex(item => item.id === id);
      if (existingItemIndex === -1) {
        state.wishlistItems = [...state.wishlistItems, action.payload]; // Add new item to wishlistItems array
      }
    },
    removeFromWishlist: (state, action) => {
      const { id } = action.payload;
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== id);
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
