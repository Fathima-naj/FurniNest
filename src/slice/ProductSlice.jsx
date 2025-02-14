import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    loading:false,
    product:[],
    error:''
}

export const fetchProduct=createAsyncThunk('product/fetchProduct',()=>{
    return axios.get('http://localhost:3000/products')
    .then(res=>res.data)
})
const productSlice=createSlice({
    name:'product',
    initialState,
    extraReducers:builder=>{
        builder.addCase(fetchProduct.pending,state=>{
            state.loading=true;
        })
        builder.addCase(fetchProduct.fulfilled,(state,action)=>{
            state.loading=false,
            state.product=action.payload,
            state.error=''
        })
        builder.addCase(fetchProduct.rejected,(state,action)=>{
            state.loading=false,
            state.product=[],
            state.error=action.error.message
        })
    }

})

export default productSlice.reducer
