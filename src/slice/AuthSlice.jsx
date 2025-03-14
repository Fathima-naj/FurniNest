import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../api/axiosinstance";

const initialState={
    isAuthenticated:false,
    loading:false,
    isAdmin:false,
    error:null,
    user:null,
}

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/users/logout');
      return;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error in logout"
      );
    }
  }
);

export const fetchUserDetails=createAsyncThunk(
    'user/fetchUserDetails',
    async(__,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.get(`/users/me`);
            console.log(response.data.user);
            return response.data.user;
          } catch (error) {
            if (error.response?.status === 401) {
              return rejectWithValue("Please login with your credentials");
            }
            return rejectWithValue(
              error.response?.data?.message || "Error in logined person"
            );
          }
    }
)

const authSlice=createSlice({
  name:'auth',
  initialState,
  reducers:{
    setUser:(state,action)=>state.user=action.payload,
  resetAuthSlice:()=>initialState
  },
  extraReducers:(builder)=>{
    builder
    .addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      
      state.isAdmin = false;
      state.error = null;
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      console.log(state.user,'usersss')
      state.error = null;

      if (action.payload.role === "admin") {
        state.isAdmin = true;
        state.isAuthenticated = false;
      } else if (action.payload.role === "user") {
        state.isAdmin = false;
        state.isAuthenticated = true;
      } else {
        state.isAdmin = false;
        state.isAuthenticated = false;
      }
    })
    .addCase(fetchUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    })
},
});

export const { resetAuthState,setUser } = authSlice.actions;

export default authSlice.reducer;
