import { useEffect, useState} from "react"
import React from 'react'
import Navbar from "../../components/Navbar"
import { fetchProduct } from "../../slice/ProductSlice"
import { useDispatch,useSelector } from "react-redux"
import { addToCart,addToWishlist } from "../../slice/CartSlice"

function Shop() {
    
     const  dispatch=useDispatch()
     const product=useSelector(state=>state.product)
     useEffect(()=>{
      dispatch(fetchProduct())
     },[dispatch])
   
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
    <div className="bg-gray-100 min-h-screen py-10 pt-32">

     <Navbar/>
     <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
     Shop Our Products
     </h1>

     <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {product.product.map((product)=>(
        <div key={product.id}
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        onDoubleClick={()=>openModal(product)}
        >
          <div>
          <img
          src={product.url}
          alt={product.name}
          className="w-full h-64 object-cover"
          />
          </div>

          <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 text-center">{product.name}</h2>
          <p className="text-center text-gray-600 text-sm mt-2">₹ {product.price}</p>
          </div>

          <div className="text-center cursor-pointer p-3">
            <div className="p-2  ">
            <button className=" rounded-full text-3xl bg-red-200 px-3 py-1 focus:bg-red-600 focus:text-white" onClick={()=>dispatch(addToWishlist(product))}>
              ♡
            </button>
            </div>
         
          <button
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md  hover:bg-red-700"
          onClick={() => {
          handleAddToCart(product);
          }}
          >
          Add to Cart
          </button>
               
          </div>
        </div>
      ))}
    </div>

{/* Modal */}
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

export default Shop

