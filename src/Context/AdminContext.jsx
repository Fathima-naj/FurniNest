// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { createContext } from 'react'
// import { ToastContainer ,toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'

// export const adminCont=createContext();

// function AdminContext({children}) {
//     const[logged,setLogged]=useState(null)
//     const[product,setProduct]=useState([])
//     const[category,setCategory]=useState([])
    

//     useEffect(()=>{
//         const fetchProduct=async()=>{
//             try{
//                 const response=await axios.get("http://localhost:3000/products")
//             setCategory([...new Set(response.data.map(v=>v.categories))])
//             setProduct(response.data)
//             }catch{
//                 console.error('error in fetching')
//             }
//          }
//          fetchProduct();
//     },[])

//     const addData=async(newproduct)=>{
//       try{
//         await axios.post("http://localhost:3000/products",newproduct);
//         setProduct(prevProduct=>[...prevProduct,newproduct]) 
//         toast.success('new product added successfully')
//       } catch{
//         console.error("can't add new product")
//       }
//     }

//     const DeleteData=async(id)=>{
//         try{
//             await axios.delete(`http://localhost:3000/products/${id}`)
//             const updateData=product.filter(itm=>itm.id!==id)
//             setProduct(updateData)
//             toast.success('product deleted successfully')
//         }catch{
//             console.error("error occured,can't delete product")
//         }
//     }

//     const editData=async(product)=>{
//       try{
//         const id=product.id
//         console.log("Editing product with ID:", id, "Data:", product); 
//         const response=await axios.put(`http://localhost:3000/products/${id}`,product)
//         setProduct((prevProducts)=>
//           prevProducts.map((item)=>item.id===id ? response.data :item)
//         ) 
//         toast.success('edited product updated successfully')
//       }
//       catch(error){
//         console.log(error.message);
        
//       }
//   }

//   return (
//     <div>
//       <adminCont.Provider value={{setLogged,product,category,addData,DeleteData,editData,logged}}>
//         {children}
//       </adminCont.Provider>
//       <ToastContainer/>
//     </div>
//   )
// }

// export default AdminContext
