import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosinstance";
import { toast } from "react-toastify";

const initialState = {
  order: [],
  loading: false,
  error: null,
  paymentVerified: false,
};

// Fetch Orders
export const fetchOrder = createAsyncThunk("order/fetchOrder", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/users/showOrder");
    console.log("order response", response.data);
    return response.data.orders;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Error fetching orders");
  }
});

// Add to Order
export const addToOrder = createAsyncThunk("order/addToOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/users/addToOrder", orderData);
    console.log("addToOrder", response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Error adding to order");
  }
});

// Verify Payment
export const verifypayment = createAsyncThunk("order/verifypayment", async (paymentData, { rejectWithValue }) => {
  try {
    console.log(" Sending Payment Data to Backend:", paymentData);
    const response = await axiosInstance.post("/users/verifypayment", paymentData);
    console.log("Payment Verification Response:", response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Error in payment verification");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        console.log("Order fetched successfully", action.payload);
        state.loading = false;
        state.order = action.payload || [];
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Add to Order
      .addCase(addToOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order.items // ✅ Append new items
        toast.success("Order placed successfully");
      })
      .addCase(addToOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Verify Payment
      .addCase(verifypayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifypayment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.paymentVerified) {
          state.paymentVerified = true;
          state.order = state.order.map((order) =>
            order.razorpayOrderId === action.payload.order.razorpayOrderId
                ? { ...order, razorpayPaymentStatus: "fulfilled" }
                : order
        );

          toast.success("Payment verified successfully");
        } else {
          console.error("Payment verification response missing 'paymentVerified'");
        }
      })
      .addCase(verifypayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log('error in verification',state.error)
        toast.error(action.payload);
      });
  },
});

export default orderSlice.reducer;
