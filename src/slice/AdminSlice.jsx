import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const initialState={
    loading:false,
    product:[],
    category:[],
    error:'',
    logged:false,
    user:[]
}

export const fetchProduct=createAsyncThunk('product/fetchProduct',()=>{
    return axios.get('http://localhost:3000/products')
    .then(res=>res.data)
    
})

export const addProduct=createAsyncThunk('product/addProduct',(newProduct)=>{
    return axios.post('http://localhost:3000/products',newProduct)
    .then(res=>res.data)
})

export const deleteProduct = createAsyncThunk('product/deleteProduct', (id)=>{

    console.log('deleting from id',id)
    return axios.delete(`http://localhost:3000/products/${id}`)
    .then(res=>res.data)
}
    
);


export const editProduct = createAsyncThunk('product/editProduct', (product) => {
    const { id, ...productData } = product;
    return axios
        .put(`http://localhost:3000/products/${id}`, productData)
        .then((res) => res.data);
});


export const fetchUser=createAsyncThunk('user/fetchUser',()=>{
    return axios.get('http://localhost:3000/user')
    .then(res=>res.data)
})

export const userStatus=createAsyncThunk('status/userStatus',async({id,status})=>{
    // event.stopPropogation();
    const confirmAction = window.confirm('Do you want to take this action?');
    if (confirmAction) {
     await  axios
        .patch(`http://localhost:3000/user/${id}`, { status: !status })
      return {id,status:!status}
    }
})



const AdminSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
       setLogged:(state,action)=>{
        state.logged=action.payload
       }
    },
    extraReducers:builder=>{
        builder
        .addCase(fetchProduct.pending,state=>{
            state.loading=true;
            
        })
        .addCase(fetchProduct.fulfilled,(state,action)=>{
            console.log('Fetched Products:', action.payload);
            state.loading=false,
            state.product=action.payload,
            state.category = [
                ...new Set(action.payload.map((v) => v.categories))
              ]; 
              console.log('category',state.category)
            state.error=''
        })
        .addCase(fetchProduct.rejected,(state,action)=>{
            state.loading=false,
            state.product=[],
            state.category=[],
            state.error=action.error.message
        })
        .addCase(addProduct.fulfilled,(state,action)=>{
            state.product.push(action.payload)
            state.error=''
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.error = action.error.message; 
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.product=state.product.filter(itm=>itm.id!==action.payload.id)
            state.error=''
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            state.error=action.error.message;
        })
        .addCase(editProduct.fulfilled,(state,action)=>{
            const product=action.payload
           state.product= state.product.map(itm=>itm.id===product.id? product:itm)
            state.error=''
        })
        .addCase(editProduct.rejected,(state,action)=>{
            state.error=action.error.message
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.user=action.payload
        })
        .addCase(userStatus.fulfilled,(state,action)=>{
            const status=action.payload.status
            state.user=state.user.map((users) =>
                users.id === action.payload.id ? { ...users,status } : { ...users }
              )
        })
        .addCase(userStatus.rejected,(state,action)=>{
            state.error=action.error.message
        })
        
    }

})
export const {setLogged}=AdminSlice.actions
export default AdminSlice.reducer