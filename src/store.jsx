import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slice/ProductSlice'
import adminReducer from './slice/AdminSlice'
import CartReducer from './slice/CartSlice'
const store=configureStore({
    reducer:{
      product:productReducer,
      admin:adminReducer,
      cart:CartReducer,
    }
})

export default store;