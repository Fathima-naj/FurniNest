import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosinstance";

const initialState= {
  cart: [],
  wishlist:[],
  loading: false,
  error: null,
}


//add to cart

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/users/addToCart/${productId}`
      );
      console.log('addToCart',response.data)
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "error fetching cart"
      );
    }
  }
);

export const getCart=createAsyncThunk('cart/getCart',async(_,{rejectWithValue})=>{
  try{
      const response=await axiosInstance.get('/users/getCart')
       console.log(response.data)
      return response.data.cart
  }
  catch(error){
      return rejectWithValue(error.response?.data?.message ||'Error fetching cart')
  }
})

//remove from cart
export const removeCart=createAsyncThunk('cart/removeCart',async(productId,{rejectWithValue})=>{
  try{
      await axiosInstance.delete(`/users/deleteCart/${productId}`)
      console.log(productId)
      return productId
  }
  catch(error){
      return rejectWithValue(error.response?.data?.message ||"Error removing from cart")
  }
})

//clear cart
export const clearCart=createAsyncThunk('cart/clearCart',()=>{
   axiosInstance.delete('/users/clearCart')
   return [];
})

//increment quantity
export const incrementQuantity = createAsyncThunk(
  "cart/incrementQuantity",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/users/increment/${productId}`);
      return { productId }; // Return only the productId for state update
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error updating quantity");
    }
  }
);

// Decrement Quantity 
export const decrementQuantity = createAsyncThunk(
  "cart/decrementQuantity",
  async ( productId , { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/users/decrement/${productId}`);
      console.log('cart update:',response.data.cart)
      return {productId}; // ✅ Ensure cart update is returned
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//wishlist

export const fetchWishlist=createAsyncThunk('cart/fetchWishlist',async(_,{rejectWithValue})=>{
  try{
      const response=await axiosInstance.get('/users/getWishlist')
       console.log(response.data)
      return response.data.wishlist || []
  }
  catch(error){
      return rejectWithValue(error.response?.data?.message ||'Error fetching wishlist')
  }
})


//add to wishlist
export const addToWishlist = createAsyncThunk(
  "cart/addToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/users/addTowishlist/${productId}`
      );
      console.log('addTowishlist',response.data)
      return response.data.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "error adding wishlist"
      );
    }
  }
);


//remove from wishlist

export const removeWishlist=createAsyncThunk('wishlist/removeWishlist',async(productId,{rejectWithValue})=>{
  try{
      await axiosInstance.delete(`/users/deleteWishlist/${productId}`)
      console.log(productId)
      return productId
  }
  catch(error){
      return rejectWithValue(error.response?.data?.message ||"Error removing from wishlist")
  }
})


     

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducer:{
     setCart:(state)=>state.cart=[],
     setWishlist:(state)=>state.wishlist=[]
    },
    extraReducers:builder=>{
      builder
      //add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log('carts: ',state.cart)

        state.cart = action.payload.map((item) => ({
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          url: item.product.url,
          quantity: item.quantity,
          available: item.product.quantity,
        }));
        console.log(`${state.cart.name} added to the cart`)

        console.log('carts: ',state.cart)
      })
       //getcart
    .addCase(getCart.pending,(state)=>{
      state.loading=true
      state.error=null
  })
  .addCase(getCart.fulfilled,(state,action)=>{
      state.loading=false
      state.cart = action.payload.map((item) => ({
          id: item.product._id,
          name: item.product.name ,
          price: item.product.price,
          url: item.product.url,
          quantity: item.quantity ,
          available: item.product?.quantity
        }));
       console.log('cart items',state.cart)

  })
  .addCase(getCart.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
      state.cart = []
  })
  .addCase(removeCart.fulfilled,(state,action)=>{
    state.loading=false
    state.cart=state.cart.filter((item)=>item.id!==action.payload)
})
      
      .addCase(clearCart.fulfilled,(state)=>{
        state.cart=[]
        state.count=0
      })
    
      .addCase(incrementQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const productIndex = state.cart.findIndex((item) => item.id === action.payload.productId);
        if (productIndex !== -1) {
          state.cart[productIndex].quantity += 1;
        }
        toast.success("Quantity incremented successfully");
      })
      .addCase(incrementQuantity.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
      })

    .addCase(decrementQuantity.fulfilled, (state, action) => {
      state.loading = false;
  
      const productIndex = state.cart.findIndex((item) => item.id === action.payload.productId);
  
      if (productIndex !== -1) {
          state.cart[productIndex].quantity -= 1;
  
          if (state.cart[productIndex].quantity <= 0) {
              state.cart.splice(productIndex, 1); 
          }
      }
  
      toast.success("Quantity decremented successfully");
  })
  
    
      .addCase(decrementQuantity.rejected, (state, action) => {
        state.loading = false;
        console.log('increment error',action.payload)
        toast.error(action.payload);
      })
      .addCase(fetchWishlist.fulfilled,(state,action)=>{
        state.loading=true
        state.wishlist=action.payload
        state.error=''
        
      })
      .addCase(fetchWishlist.rejected,(state,action)=>{
        state.wishlist=[],
        state.error=action.error.message
      })

      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log('wishlist : ',state.wishlist)
        state.wishlist = action.payload.map((item) => ({
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          url: item.product.url,
          quantity: item.quantity,
          available: item.product.quantity,
        }))
        
       })
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Before removing wishlist', state.wishlist);
        
        state.wishlist = state.wishlist.filter((item) => item._id !== action.payload) // Fix here
        
        console.log('After removing wishlist', state.wishlist);
        toast.success('Product removed from wishlist');
    })    
     
    }
})

export default cartSlice.reducer