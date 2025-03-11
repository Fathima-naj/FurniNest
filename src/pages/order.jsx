import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { fetchOrder } from "../slice/orderSlice";
import { useSelector,useDispatch } from "react-redux";
function Order() {

const navigate=useNavigate();
  
const dispatch=useDispatch()

  useEffect(()=>{
     dispatch(fetchOrder())
  },[dispatch])

 
  const {order,loading}=useSelector(state=>state.order)
  console.log('order:',order)
  return (
    <div className="min-h-screen bg-gray-100 pt-32 py-10 px-4">
      <Navbar/>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Orders
      </h1>
      <div className="max-w-6xl mx-auto space-y-8">
        {order.length==0?(
          <div className="text-center">
          <img 
          src='https://static.vecteezy.com/system/resources/previews/014/814/239/large_2x/no-order-a-flat-rounded-icon-is-up-for-premium-use-vector.jpg'
          className="mx-auto mt-4 w-40 h-40"
          />
          <button
              className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
              onClick={() => navigate('/shop')}
            >
              Start shopping
            </button>
          </div>
        ):(
        order.map((orderItem, index) =>
         (
          <div
            key={orderItem._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Order {index + 1}
            </h3>
            <div className="space-y-6">
              {orderItem.items.map((product) => 
                
              (
                <div
                  key={product._id}
                  className="sm:flex items-start border-b border-gray-300 pb-4"
                >
                  <img
                    src={product.productId.url}
                    alt={product.productId.name}
                    className="w-32 h-40 sm:w-24 sm:h-24 object-cover rounded-md mr-6"
                  />
                  <div className="flex-1 ">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {product.productId.name}
                    </h3>
                    <p className="text-gray-600">Price: ₹ {product.productId.price}</p>
                    <p className="text-gray-600">Qty: {product.quantity}</p>
                    <p className="text-gray-500 text-sm">
                      {product.productId.description}
                    </p>
                  </div>
                </div>
              ))
            
            }
            </div>
          </div>
        ))
      )}
      
      </div>

      
    </div>
  );
}

export default Order;
