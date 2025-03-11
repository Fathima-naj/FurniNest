import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchProduct } from "../../slice/ProductSlice";
import { addToWishlist,addToCart } from "../../slice/CartSlice";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

function SearchItem() {

  const location = useLocation();
 const {product,loading,error,pagination}=useSelector((state)=>state.product)
const [page,setPage]=useState(1)

const dispatch=useDispatch()
  const {user}=useSelector(state=>state.auth)
   const[selectedProduct,setSelectedProduct]=useState(null)

   const handleAddToCart=(product)=>{
             if(user){
              dispatch(addToCart(product))
              toast.success('Product Added to the cart successfully')
             }else{
              toast.error('Please login')
             }
           }
   
    const openModal=(product)=>{
    setSelectedProduct(product)
    }
   
    const closeModal=()=>{
    setSelectedProduct(null)
    }
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("query") || ""; 
    
    useEffect(() => {
      if (searchQuery) {
        dispatch(fetchProduct({ search: searchQuery, page }));
      }
    }, [searchQuery, dispatch, page]);

const handlePageChange = (newPage) => {
  if (newPage > 0 && newPage <= pagination.totalPages) {
    setPage(newPage);
  }
};

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;




  return (
    <div className="min-h-screen bg-gray-100 pt-32">
      <Navbar/>
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
        Search Results
      </h1>

    
      {product.length === 0 ? (
        <h2 className="text-center text-gray-600 text-lg">
          No match found 
        </h2>
      ) : (
        <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.map((itm) => (
            <div
              key={itm.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              onDoubleClick={()=>openModal(itm)}
            >
              <img
                src={itm.url}
                alt={itm.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 text-center">
                  {itm.name}
                </h2>

                <p className="text-center text-gray-600 text-sm mt-2">
                ₹ {itm.price}
                </p>
              </div>
              <div className="text-center cursor-pointer p-3">
              <div className="p-2  ">
              <button className=" rounded-lg text-3xl bg-red-200 px-1 focus:bg-red-600 focus:text-white" onClick={()=>dispatch(addToWishlist(itm._id))}>
                ♡
              </button>
              </div>
            <button
                 className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700"
                  onClick={() => {
                  handleAddToCart(itm._id);
                               
                   }}
                  >
                Add to Cart
              </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
     
     <div className="flex justify-center items-center mt-10 space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`py-2 px-4 rounded bg-gray-500 text-white ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
          }`}
        >
          Previous
        </button>
        {[...Array(pagination.totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`py-2 px-4 rounded ${
              page === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pagination.totalPages}
          className={`py-2 px-4 rounded bg-gray-500 text-white ${
            page === pagination.totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-600"
          }`}
        >
          Next
        </button>
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
                                handleAddToCart(selectedProduct._id);
                                closeModal();
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}
    </div>
  );
}

export default SearchItem;

