// import React ,{useEffect,useState}from 'react'
// import { createContext } from 'react'
// import axios from 'axios';

// export const prdctContext=createContext();

// function ProductCntxt({children}) {
//   const [product,setProduct]=useState([]);
//   useEffect(()=>{
//     const fetchPrdct=async()=>{
//     try{
//       const prdct= await axios.get("http://localhost:3000/products")
//       setProduct(prdct.data);
//       // console.log(prdct.data);
//     }catch(error){
//       console.error('Error in fetching products',error)
//      };
//     }
//     fetchPrdct();
//   },[])

//   return (
    
//     <prdctContext.Provider value={{product}}>
//     {children}
//     </prdctContext.Provider>
   
//   )
// }

// export default ProductCntxt
