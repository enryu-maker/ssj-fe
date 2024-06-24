// src/features/wishlist/wishlistSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  wishlistItems: loadFromLocalStorage() || [],
};

// Load wishlist items from localStorage if available
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("wishlist");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading wishlist from localStorage:", err);
    return [];
  }
}

// Save wishlist items to localStorage
function saveToLocalStorage(wishlistItems) {
  try {
    const serializedState = JSON.stringify(wishlistItems);
    localStorage.setItem("wishlist", serializedState);
  } catch (err) {
    console.error("Error saving wishlist to localStorage:", err);
  }
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { id, name } = action.payload;
      const existingItemIndex = state.wishlistItems.findIndex(
        (item) => item.id === id
      );
      if (existingItemIndex === -1) {
        state.wishlistItems.push(action.payload);
        toast.success(`Added ${name} to Wishlist`, {
          position: "bottom-left",
        });
        saveToLocalStorage(state.wishlistItems);
      } else {
        toast.warn(`${name} is already in Wishlist`, {
          position: "bottom-left",
        });
      }
    },
    removeFromWishlist: (state, action) => {
      const { id, name } = action.payload;
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== id
      );
      toast.error(`Removed ${name} from Wishlist`, {
        position: "bottom-left",
      });
      saveToLocalStorage(state.wishlistItems);
    },
    clearWishlist: (state) => {
      const clearedItems = state.wishlistItems.map((item) => item.name);
      state.wishlistItems = [];
      toast.info(`Cleared Wishlist (${clearedItems.join(", ")})`, {
        position: "bottom-left",
      });
      localStorage.removeItem("wishlist");
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
