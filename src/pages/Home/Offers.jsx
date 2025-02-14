import React, {useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { fetchProduct } from '../../slice/ProductSlice'
import { addToCart,addToWishlist } from '../../slice/CartSlice'

function Offers() {
     const dispatch=useDispatch()
      const product=useSelector(state=>state.product.product)
      // console.log('offer product',product)
      
      useEffect(()=>{
        dispatch(fetchProduct())
      },[dispatch])
      
   
    const collections=product.filter((item)=>item.id>11)
     const[selectedProduct,setSelectedProduct]=useState(null)
     
      const openModal=(product)=>{
      setSelectedProduct(product)
      }
     
      const closeModal=()=>{
      setSelectedProduct(null)
      }

      const handleAddToCart=(product)=>{
        dispatch(addToCart(product))
      }


  return (
    <div>
    <h1 className="text-2xl font-bold text-center my-6">New Collections</h1>
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {collections.map((itm) => (
          <div
            key={itm.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            onDoubleClick={()=>openModal(itm)}
          >
            <img
              src={itm.url}
              alt={itm.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                {itm.name}
              </h2>
              <p className="text-center text-gray-600 text-sm mt-2">
                ₹ {itm.price}
              </p>
            </div>

            <div className="text-center p-3">
                <div>
              <button
                className="rounded-full text-3xl bg-red-200 px-3 py-1 focus:bg-red-600 focus:text-white"
                onClick={() => dispatch(addToWishlist((itm)))}
                
              >
                ♡
              </button>
              </div>

              <button
                className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 mt-3"
                onClick={()=>handleAddToCart(itm)}
                aria-label="Add to Cart"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
        X
        </button>
        
        <img
        src={selectedProduct.url}
        alt={selectedProduct.name}
        className="w-full h-60 object-cover rounded-lg mb-4"
        />

        <h1 className="text-2xl font-bold mb-4">{selectedProduct.name}</h1>
        <p className="text-gray-700 mb-2">₹ {selectedProduct.price}</p>
        <p className="text-gray-600 mb-4">
          {selectedProduct.description || "No description available."}
        </p>

        <button
        className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700"
        onClick={() => {
        handleAddToCart(selectedProduct);
        closeModal();
        }}
        >
        Add to Cart
        </button>
      </div>
      </div>
)}
  </div>
  </div>
  )
}

export default Offers
