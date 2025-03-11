import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { removeCart,clearCart, getCart, incrementQuantity, decrementQuantity} from '../slice/CartSlice';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function Cart() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const cart=useSelector(state=>state.cart.cart)
  const loading=useSelector((state)=>state.cart.loading)
   
  console.log('cart page',cart)


  useEffect(()=>{
      dispatch(getCart())
  },[dispatch])
  
  const totalPrice = cart.reduce((sum, item) => sum + ((item.price) * (item.quantity||1)),0);
  //console.log('cart items',cart)
  const handleRemoveCart=(productId)=>{
        dispatch(removeCart(productId))
        .then(()=> toast.success('item removed from the cart'))
        .catch((err)=>toast.error('failed to remove'))
        console.log(`removing from ${productId}`)
  }
  return (
    <>
      <Navbar/>

      <div className="container mx-auto p-4 pt-32">
        {cart.length===0?
        (<div className='text-center'>
        <h1 className=" text-2xl font-bold text-gray-700">Your Cart is empty</h1>

        <img
        src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
        alt="Empty Cart"
        className="mx-auto mt-4 w-40 h-40"
        />

        <p className="text-gray-600 mt-4">
         Add some items to your cart to start shopping!
        </p>
      </div>
        ):( 
      <>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto px-6 py-10 ">
        <ul className='space-y-4 col-span-2'>
            
            {cart.map(item=>{ 

              //  console.log(`Type of price: ${typeof item.price}, Value of price: ${item.price}`);
              //  console.log(`Type of quantity: ${typeof item.quantity}, Value of quantity: ${item.quantity}`);

            return  ( 
              <li key={item.id}
              className="sm:flex overflow-hidden item-center justify-between border p-6 rounded-md shadow-md bg-white"
              >
              <div className=" sm:flex space-x-4">
                <img
                src={item.url}
                alt={item.name}
                className="sm:w-20 w-64 sm:h-20 object-cover rounded-md"
                />

                <div className='text-center'>
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-600"> ₹ {item.price*item.quantity}</p>
                </div>
              </div>

              <div className=" text-center p-3 space-x-2">
                <button
                onClick={() => {
                  console.log("Decrementing Product ID:",  item.id); // Debugging
                  dispatch(decrementQuantity( item.id));
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded px-2"
                disabled={loading || item.quantity <1}
                > -
                </button>

                <span className="w-12 border rounded-md text-center p-1">{item.quantity}</span>


                <button
                onClick={() => dispatch(incrementQuantity(item.id))}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded px-2"
                disabled={loading}
                > + </button>
                
                 
              </div>
              <div className='text-center p-3'>
                <button onClick={()=>handleRemoveCart(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-1 ml-2"
                >
                Remove
                </button>
                </div>
              
              </li>
            )

            }
            )
          }
              
        </ul>


        {/* Summary  */}
        <div className="p-6 bg-gray-100 rounded-md shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
          Cart Summary
          </h2>

          <p className="text-gray-700">
          Total Items: <span className="font-semibold">{cart.length}</span>
          </p>

          <p className="text-gray-700 mt-2">
          Total Price: <span className="font-semibold">₹ {totalPrice}</span>
          </p>

          <button
          onClick={()=>navigate('/payment')}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded shadow-md"
          >
          Order products
          </button>

          <button
          onClick={()=>dispatch(clearCart())}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded shadow-md"
          >
          Clear Cart
          </button>

       </div>
     </div>
    </>
 )}
        
       
    
  </div>
</>
  )
  
}

export default Cart

