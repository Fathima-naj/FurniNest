import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../api/axiosinstance";
const initialState={
    loading:false,
    error:null,
    logged:false,
    totalPages:0,
    currentPage:1,
    totalUsers:0,
    userOrder:[],
    user:[],
   totalRevenue:0,
}





export const fetchUser=createAsyncThunk('user/fetchUser',async({page=1},{rejectWithValue})=>{
    try {
        const response=await axiosInstance.get('/admin/getusers',{
            params:{page},
        })
        console.log('admin user',response.data.data)
        return response.data.data;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message||"Error fetching all users"
        )
    }
})



export const getUserById = createAsyncThunk("users/getUserById",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(
         `/admin/getusers/${id}`
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Error get single users"
        );
      }
    }
);


export const userStatus=createAsyncThunk('status/userStatus',async(id,{rejectWithValue})=>{
    // event.stopPropogation();
try {
    
     const response=await  axiosInstance.patch(`/admin/blockUser/${id}`)
      return response.data ||id
    
} catch (error) {
    return rejectWithValue(
        error.response?.data?.message || "Error blocking/unblocking user"
      );

}   
})


export const getUserOrder = createAsyncThunk(
    "order/getUserOrder",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(
          `/admin/getUserOrder/${id}`
        );
        console.log('userId',id)
        console.log('user order from slice',response.data);
        return response.data||[]
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Error fetching cart"
        );
      }
    }
  );
  

  export const totalRevenues = createAsyncThunk(
    "users/totalRevenue",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get('/admin/totalRevenue');
        console.log(response.data, ' revenue');
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Error fetching total revenue"
        );
      }
    }
  );

const AdminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
       setLogged:(state,action)=>{
        state.logged=action.payload
       },
       setCategory: (state, action) => {
             state.categories = action.payload;
           },
    },
    extraReducers:builder=>{
        builder
        
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading=false,
            state.user=action.payload.users,
            state.totalUsers = action.payload.totalUsers;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage || 1;
            console.log(state.totalUsers)
        })
        .addCase(getUserById.fulfilled,(state,action)=>{
            state.loading=false,
            state.user=action.payload
            state.error=null
        })
        .addCase(getUserById.rejected,(state,action)=>{
            state.error=action.payload
        })
        .addCase(userStatus.fulfilled,(state,action)=>{
            state.user=state.user.map((users) =>
                users._id === action.payload._id ? { ...users,isBlock:action.payload.isBlock } : { ...users }
              ),
              state.error= null
        })
        .addCase(userStatus.rejected,(state,action)=>{
            state.error=action.payload
        })
        .addCase(getUserOrder.fulfilled,(state,action)=>{
            state.loading=false;
            state.userOrder=action.payload.orders
            console.log('order',state.userOrder)
            state.pagination=action.payload.pagination

        })
        .addCase(getUserOrder.rejected,(state,action)=>{
             state.error=action.payload
        })
        .addCase(totalRevenues.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.totalRevenue = action.payload.total;
            (state.totalRevenue)
            console.log(state.totalRevenue);
          })
    }

})
export const { setCategory } = AdminSlice.actions;

export const {setLogged}=AdminSlice.actions
export default AdminSlice.reducer