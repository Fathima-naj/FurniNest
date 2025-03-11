import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosinstance";

const initialState = {
  loading: false,
  product: [],
  categories: [],
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 9,
    totalPages: 0,
  },
};

// Fetch Products
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async ({ categories = null, page = 1, search =null }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/products", {
        params: { categories, page, search },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching products");
    }
  }
);

// Add Product
export const addproduct = createAsyncThunk(
  "product/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/admin/addProduct', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error adding product");
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admin/deleteProduct/${productId}`);
      return productId; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error deleting product");
    }
  }
);

// Edit Product
export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({id,data}, { rejectWithValue }) => {
    try {
           console.log('sending edit req',{id,data})
      const response = await axiosInstance.put(`/admin/updateProduct/${id}`, data,{
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('edit returns',response.data)
      return response.data.updateProduct; // Ensure `updatedProduct` exists
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error updating product");
    }
  }
);

// Product Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.products || [];
        state.pagination = action.payload.pagination || { totalPages: 1 };
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Product
      .addCase(addproduct.fulfilled, (state, action) => {
        state.product.push(action.payload);
        state.error = null;
      })
      .addCase(addproduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log(action.payload)
        state.product = state.product.filter((item) => item._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Edit Product
      .addCase(editProduct.fulfilled, (state, action) => {
        console.log('edit payload',action.payload)
        state.product = state.product.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.error = null;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setCategory } = productSlice.actions;
export default productSlice.reducer;
