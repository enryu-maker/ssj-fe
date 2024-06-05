import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser } from "./authAPI";


const initialState = {
    loggedInUserToken: null,
    status: 'idle',
    error: null,
    userChecked: false,
    
  };

  export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userData) => {
      const response = await createUser(userData);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
    .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      
  },
  
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;


export default authSlice.reducer;
