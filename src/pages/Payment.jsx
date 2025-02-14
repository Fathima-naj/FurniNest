import React, {  useEffect } from "react";

import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector,useDispatch } from "react-redux";
import { addToOrder, fetchOrder } from "../slice/CartSlice";
function Payment() {

  const navigate = useNavigate();
  
  const dispatch=useDispatch()
  const cart=useSelector(state=>state.cart.cart)

  useEffect(()=>{
    dispatch(fetchOrder())
  },[])
  const initialValues = {
    name: "",
    address: "",
    state: "",
    paymentMethod: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
    
    
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const onSubmit = (values) => {
    const orderdata = {
      id: Date.now(),
      item: cart,
      total: totalPrice,
      ...values
      
    };
    dispatch(addToOrder(orderdata));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-32 px-6">
      <Navbar />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Payment Details
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <Field
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <Field
              as="textarea"
              name="address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              State
            </label>
            <Field
              type="text"
              name="state"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="state"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Cart Order Items:
          </h3>
          <div className="space-y-4">
            {cart.map((cartItem) => (
              <div
                key={cartItem.id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p className="text-gray-700 font-medium">{cartItem.name}</p>
                  <p className="text-gray-600">₹ {cartItem.price}</p>
                  <p className="text-gray-600">{cartItem.quantity}</p>
                </div>
                <p className="text-gray-800 font-semibold">
                ₹ {cartItem.price * cartItem.quantity}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-semibold text-lg mt-4">
            <span>Total :</span>
            <span>₹ {totalPrice}</span>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Payment methods:
            </h3>
            

            <div>
              <label>
                <Field type="radio" name="paymentMethod" value="cash" />
                <span> Cash</span>
              </label>
            </div>
          </div>

          <ErrorMessage
            name="paymentMethod"
            component="div"
            className="text-red-500 text-sm mt-1"
          />

          
            
        

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Confirm Payment
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Payment;
