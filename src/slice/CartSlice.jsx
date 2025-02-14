import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState={
    loading:false,
    cart:[],
    count:0,
    isLoggedIn:false,
    order:[],
    wishlist:[],
    error:''
}
const id=localStorage.getItem("id")

//cart
export const fetchUser=createAsyncThunk('user/fetchUser',()=>{
    // const id=localStorage.getItem("id")
    return axios.get(`http://localhost:3000/user/${id}`)
    .then(res=>res.data.cart)
})

//add to cart
export const addToCart=createAsyncThunk('cart/addToCart',async(product,{getState,rejectWithValue})=>{
  const state=getState()
  const cart=state.cart.cart
  const cartItem=cart.find(itm=>itm.id===product.id)
  if(cartItem){
    if(cartItem.quantity+1>product.quantity){
      return rejectWithValue({
        message:`cannot add more of ${product.name}.only ${product.quantity-cartItem.quantity} left`
      })
    }
    const updatedCart=cart.map(itm=>
      itm.id===product.id?{...itm, quantity:itm.quantity+1}:itm
  );
  await axios.patch(`http://localhost:3000/user/${id}`,{cart:updatedCart})
  return updatedCart;

  }
  else{
    const updatedCart=[...cart,{...product,quantity:1}]
    axios.patch(`http://localhost:3000/user/${id}`,{cart:updatedCart})
    return updatedCart;
  }

})

//remove from cart
export const removeCart=createAsyncThunk('cart/removeCart',async(productId,{getState})=>{
  const store=getState()
  const cart=store.cart.cart
  const updatedCart=cart.filter(itm=>itm.id!==productId);
  await axios.patch(`http://localhost:3000/user/${id}`,{cart:updatedCart})
   return updatedCart
})

//clear cart
export const clearCart=createAsyncThunk('cart/clearCart',()=>{
  return axios.patch(`http://localhost:3000/user/${id}`,{cart:[]})
})

//quantity
export const updateQty=createAsyncThunk('qty/updateQty',async({productId,newquantity},{getState,rejectWithValue})=>{
  
   if(newquantity<=0){
    return rejectWithValue({
      message:'Quantity must be atleast 1'
    })
   }
    const res=await axios.get(`http://localhost:3000/products/${productId}`);
    
     const serverProduct=res.data;
     if(newquantity>serverProduct.quantity){
         return rejectWithValue({
          message:`Cannot update. Only ${serverProduct.quantity} left in stock.`
         })
     }

     const store=getState()
     const cart=store.cart.cart
     const updatedCart=cart.map((item)=>
      item.id===productId?{...item,quantity:newquantity}:item
);

  await axios.patch(`http://localhost:3000/user/${id}`,{cart:updatedCart})
  return updatedCart
})



//wishlist
export const fetchWishlist=createAsyncThunk('wish/fetchWishlist',()=>{
  return axios.get(`http://localhost:3000/user/${id}`)
  .then(res=>res.data.wishlist)
})

//add to wishlist
export const addToWishlist=createAsyncThunk('wish/addToWishlist',async(product,{getState,rejectWithValue})=>{
  const store=getState()
  const wishlist=store.cart.wishlist
  const wishlistItems= wishlist.find((itm)=>itm.id===product.id)
  if (wishlistItems) {
    return rejectWithValue({
     message: `${product.name} is already in the wishlist`
    });
   
  }
  
  const updatedWishlist=[...wishlist,product]
    await  axios.patch(`http://localhost:3000/user/${id}`,{wishlist:updatedWishlist})
     return updatedWishlist;
        
     })

//remove from wishlist
export const removeWishlist=createAsyncThunk('wish/removeWishlist',async(productId,{getState})=>{
const store=getState()
const wishlist=store.cart.wishlist
  const updatedWishlist=wishlist.filter(itm=>itm.id!==productId);
  await axios.patch(`http://localhost:3000/user/${id}`, {wishlist:updatedWishlist})
  return updatedWishlist;
}
)


//order
export const fetchOrder=createAsyncThunk('order/fetchOrder',(_,{rejectWithValue})=>{
  // const state = getState();
  //   const id = state.user.id; 
  if(!id){
     return rejectWithValue({
      message:'not logged in'
     })
  }
   return axios.get(`http://localhost:3000/user/${id}`)
  .then(res=>res.data.order)
})

//add to order 

export const addToOrder =createAsyncThunk('order/addToOrder',async(orderdata,{getState})=>{
 
  const store=getState()
  // const id=store.user.id
  const order=store.cart.order
  const cart=store.cart.cart
  const updateOrder=[...order,orderdata];
  
  await axios.patch(`http://localhost:3000/user/${id}`,{order:updateOrder})
 
  await axios.patch(`http://localhost:3000/user/${id}`, { cart: [] });
  return updateOrder
 
}

)


     

const cartSlice=createSlice({
    name:'cart',
    initialState,
    extraReducers:builder=>{
      builder
      .addCase(fetchUser.pending,(state)=>{
        state.loading=true
      })
      .addCase(fetchUser.fulfilled,(state,action)=>{
        console.log('fetchUser',action.payload)
        state.loading=true
        state.cart=action.payload
        state.count=action.payload.length
        state.error=''
        
      })
      .addCase(fetchUser.rejected,(state,action)=>{
        state.loading=false
        state.cart=[]
        state.count=0
        state.error=action.error.message

      })
      .addCase(addToCart.fulfilled,(state,action)=>{
        console.log('addToCart fulfilled',action.payload)
        state.cart=action.payload;
        state.count=action.payload.length;
       
       const addedProduct = action.payload[action.payload.length - 1]; // The last item in the cart
       if (addedProduct) {
           toast.success(`${addedProduct.name} is added to the cart`);
       }
      })
      .addCase(addToCart.rejected,(state,action)=>{
        if(action.payload){
          toast.error(action.payload.message)
        }
      })
      .addCase(removeCart.fulfilled,(state,action)=>{
        //console.log('cart after removing ',action.payload)
        state.cart=action.payload
        state.count=action.payload.length
      })
      .addCase(clearCart.fulfilled,(state)=>{
        state.cart=[]
        state.count=0
      })
      .addCase(updateQty.fulfilled,(state,action)=>{
        state.cart=action.payload
        toast.success('quantity updated')
      })
      .addCase(updateQty.rejected,(state,action)=>{
        if(action.payload){
          toast.error(action.payload.message)
        }
      })
      .addCase(fetchWishlist.fulfilled,(state,action)=>{
        console.log('fetchUser',action.payload)
        state.loading=true
        state.wishlist=action.payload
        state.error=''
        
      })
      .addCase(fetchWishlist.rejected,(state,action)=>{
        state.wishlist=[],
        state.error=action.error.message
      })
      .addCase(addToWishlist.fulfilled,(state,action)=>{
        state.wishlist=action.payload
        const addedProduct = action.payload[action.payload.length - 1]; 
        if (addedProduct) {
            toast.success(`${addedProduct.name} is added to the wishlist`);
        }
      })
      .addCase(addToWishlist.rejected,(state,action)=>{
        if(action.payload){
          toast.error(action.payload.message)
        }
      })
      .addCase(removeWishlist.fulfilled,(state,action)=>{
        state.wishlist=action.payload
        toast.success('item removed from wishlist')
      })
      .addCase(fetchOrder.fulfilled,(state,action)=>{
        console.log('order fetched successfully',action.payload)
        state.order=action.payload
      })
      .addCase(fetchOrder.rejected,(state,action)=>{
        
        if(action.payload){
           toast.error(action.payload.message)
           state.order=[]
        }
      })
      .addCase(addToOrder.fulfilled,(state,action)=>{
        state.order=action.payload
        toast.success('orderCompleted')
       state.count=0
      })

    }
})

export default cartSlice.reducer