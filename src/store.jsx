import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slice/ProductSlice'
import adminReducer from './slice/AdminSlice'
import CartReducer from './slice/CartSlice'
import AuthReducer from './slice/AuthSlice'
import orderReducer from './slice/orderSlice'

const store=configureStore({
    reducer:{
      product:productReducer,
      admin:adminReducer,
      cart:CartReducer,
      auth:AuthReducer,
      order:orderReducer,
    }
   
  })

export default store;