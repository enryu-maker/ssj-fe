import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, selectedWeight, selectedPrice, name } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === id && item.selectedWeight === selectedWeight && item.selectedPrice === selectedPrice
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`${state.cartItems[itemIndex].name} incremented cart quantity`, {
          position: "bottom-left",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${name} added to the cart`, {
          position: "bottom-left",
        });
      }

      state.cartTotalQuantity = state.cartItems.reduce((total, item) => total + item.cartQuantity, 0);
      state.cartTotalAmount = state.cartItems.reduce(
        (total, item) => total + item.selectedPrice * item.cartQuantity,
        0
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    incrementQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id && item.selectedWeight === action.payload.selectedWeight && item.selectedPrice === action.payload.selectedPrice
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`${state.cartItems[itemIndex].name} quantity increased`, {
          position: "bottom-left",
        });
      }
      
      state.cartTotalQuantity = state.cartItems.reduce((total, item) => total + item.cartQuantity, 0);
      state.cartTotalAmount = state.cartItems.reduce(
        (total, item) => total + item.selectedPrice * item.cartQuantity,
        0
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrementQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id && item.selectedWeight === action.payload.selectedWeight && item.selectedPrice === action.payload.selectedPrice
      );
      if (itemIndex >= 0) {
        const itemName = state.cartItems[itemIndex].name;
        if (state.cartItems[itemIndex].cartQuantity > 1) {
          state.cartItems[itemIndex].cartQuantity -= 1;
          toast.info(`${itemName} quantity decreased`, {
            position: "bottom-left",
          });
        } else {
          state.cartItems.splice(itemIndex, 1);
          toast.error(`${itemName} removed from cart`, {
            position: "bottom-left",
          });
        }
      }
      
      state.cartTotalQuantity = state.cartItems.reduce((total, item) => total + item.cartQuantity, 0);
      state.cartTotalAmount = state.cartItems.reduce(
        (total, item) => total + item.selectedPrice * item.cartQuantity,
        0
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id || item.selectedWeight !== action.payload.selectedWeight || item.selectedPrice !== action.payload.selectedPrice
      );
      state.cartItems = newCartItems;
      toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });

      state.cartTotalQuantity = state.cartItems.reduce((total, item) => total + item.cartQuantity, 0);
      state.cartTotalAmount = state.cartItems.reduce(
        (total, item) => total + item.selectedPrice * item.cartQuantity,
        0
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      localStorage.removeItem("cartItems");
      toast.info("Cart has been cleared.", {
        position: "bottom-left",
      });
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
