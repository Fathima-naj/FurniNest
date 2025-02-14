// import React ,{useContext} from 'react'
// import { prdctContext } from '../Context/productCntxt'
// import { useParams ,useNavigate} from 'react-router-dom'
// import { cartCont } from '../Context/CartContext'
// import Navbar from '../components/Navbar'

// function ProductDetails() {

//     const navigate=useNavigate()
//     const {addToCart}=useContext(cartCont)
//     const {product}=useContext(prdctContext)
//     const {id}=useParams()

//     if(!product){
//       return <h1>Loading...</h1>
//     }
//     const selectPrdct=product.find(itm=>itm.id===id)
    
//     // console.log(product);

//     if(!selectPrdct){
//       return <h1>Product not found</h1>
//   }

//     const handleaddToCart=(product)=>{
//         addToCart(product)
        
//     }

   
//   return (
//     <div>
//        <Navbar/>
//         <div className="container mx-auto p-8 pt-36">
//       <div className="flex flex-col  items-center  gap-8">
         
//           {/* image */}
//         <div className=' max-w-sm'>
//           <img
//          src={selectPrdct.url}
//          alt={selectPrdct.name}
//          className="w-full h-auto  rounded-lg shadow-lg "
//          />
//          </div>

//           {/* details */}
//          <div className="w-full max-w-lg text-center">
//          <h1 className="text-3xl font-bold text-gray-800">{selectPrdct.name}</h1>
//          <p className=" text-gray-700 text-lg mt-4">Price: <span className="font-semibold">${selectPrdct.price}</span></p>
//          <p className=" text-gray-600  mt-4">{selectPrdct.description}</p>
        
//           <button 
//          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded mt-6 shadow-md transition"
//          onClick={()=>handleaddToCart(selectPrdct)}
//          >
//             Add to cart
//          </button>
//          </div>
        
//       </div>
//     </div>
//     </div>
//   )
// }

// export default ProductDetails