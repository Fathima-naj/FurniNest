import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useDispatch,useSelector} from 'react-redux';
import { addToCart ,fetchWishlist,removeWishlist} from '../slice/CartSlice';

function Whishlist() {


  const dispatch=useDispatch()
  const wishlist=useSelector(state=>state.cart.wishlist)
  useEffect(()=>{
    dispatch(fetchWishlist())
  },[dispatch])

  useEffect(() => {
    console.log("Updated Wishlist:", wishlist);
  }, [wishlist]);
  

  const handleWishlist=(productId)=>{
   
   dispatch(addToCart(productId));
   dispatch(removeWishlist(productId));
  }

  return (
    <div className='bg-gray-100 min-h-screen pt-32'>
      <Navbar/>
       <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">Your wishlist</h1>
      {wishlist.length === 0 ? (
        <h2 className='text-xl text-center text-gray-500'>Your wishlist is empty.</h2>
      ) : (
        <div className='container mx-auto px-6 py-10'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
       { wishlist.map((product,index) => (
         <div
          key={product._id }
          className="bg-white rounded-lg shadow-md hover:shadow-lg duration-300 overflow-hidden"
        >
          <div>
          <img
            src={product.url}
            alt={product.name}
            className="w-full h-64 object-cover "
          />
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              {product.name}
            </h3>
            <p className="text-gray-600 text-center">Price: ₹ {product.price}</p>
            <p className="text-gray-600 text-center">Qty: {product.quantity}</p>
            <p className="text-gray-500 text-sm">
              {product.description}
            </p>
            <div className='text-center p-4'>
              <div className='p-2'>
            <button onClick={()=>dispatch(removeWishlist(product._id))}
                    className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-1 ml-2"
                    >
                       Remove
                   </button>
                   </div>
         <button onClick={()=>handleWishlist(product._id)}
             className="bg-red-600 hover:bg-red-800 text-white rounded px-4 py-1 ml-2"
           >
            Move to Cart
            </button>
            </div>
                </div>
          </div>
          
         
        
        
        ))}
        </div>
        </div>
       )}
      
       
        
    </div>
  );
}

export default Whishlist;
 