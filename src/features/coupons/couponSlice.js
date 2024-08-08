// src/slices/couponSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../helper/AxiosInstance";
// Define the async thunk
export const fetchCoupons = createAsyncThunk(
  "coupons/fetchCoupons",
  async () => {
    const response = await api.get("/profile/get-coupon/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  }
);

export const claimCoupons = createAsyncThunk(
  "coupons/claimCoupons",
  async (code) => {
    const response = await api.post(`/profile/claim-coupon/${code}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  }
);

// Create the slice
const couponSlice = createSlice({
  name: "coupons",
  initialState: {
    coupons: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default couponSlice.reducer;
