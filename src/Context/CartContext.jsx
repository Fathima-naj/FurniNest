// import React,{useEffect, useState} from 'react'
// import { createContext } from 'react'
// import axios from 'axios'
// import { toast, ToastContainer } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'

// export const cartCont=createContext()

// function CartContext({children}) {

//     const navigate=useNavigate()
 
//   const [cart,setCart]=useState([])
//   const [count,setCount]=useState(0);
//   const [isloggedIn,setLoggedIn]=useState(false)
//   const[order,setOrder]=useState([])
//   const[whishlist,setWhishlist]=useState([])
 

//  const id=localStorage.getItem("id");

// // wishlist

// useEffect(()=>{
//    const fetchWishlist=async()=>{
//       try{
//           const user= await axios.get(`http://localhost:3000/user/${id}`)
//        setWhishlist(user.data.whishlist||[])
      
//   }
// catch(err){
//   console.error('error occured',err);
// }
// };
// if(id){
//   fetchWishlist();
// }
// },[id] )


// const addToWhishlist=(product)=>{
//   const wishlistItems= whishlist.find((itm)=>itm.id===product.id)
//   if (wishlistItems) {
//     toast.error(`${product.name} is already in the wishlist`);
//     return;
//   }

 
//      const updatedWishlist=[...whishlist,product]
//      axios.patch(`http://localhost:3000/user/${id}`,{whishlist:updatedWishlist})
//      .then (()=>{
//          setWhishlist(updatedWishlist)
//          toast.success('Item added to the wishlist')
         
//      })
//      .catch(error=>console.error('error occured',error))
     
//   }


//   const removeWishlist=(productId)=>{
//     const updatedWishlist=whishlist.filter(itm=>itm.id!==productId);
//     axios.patch(`http://localhost:3000/user/${id}`, {whishlist:updatedWishlist})
//     .then(()=>{
//         setWhishlist(updatedWishlist)
       
//         toast.success('item removed from the wishlist')
//     }).catch(error=>console.error('error occured',error));
//   }


  
 


// //logout

//   // const handleLogOut=()=>{
//   //    localStorage.removeItem('id');
//   //    localStorage.removeItem('name');
//   //    setCount(0)
//   //   setLoggedIn(false)
//   //    toast.success('logout successfully')
//   //    navigate('/login')
//   // }

//   //cart
//   useEffect(()=>{
     
//         const fetchUser=async()=>{
//             try{
//                 const user= await axios.get(`http://localhost:3000/user/${id}`)
//             setCart(user.data.cart)
//             setCount(user.data.cart.length)
//         }
//     catch(err){
//         console.error('error occured',err);
//     }
// };
//     if(id){
//         fetchUser();
//     }
//   },[id] )


// const addToCart=(product)=>{
//  const cartItem= cart.find((itm)=>itm.id===product.id)
//  if(cartItem){
//     if(cartItem.quantity+1> product.quantity){
//         toast.error(`cannot add more of ${product.name}.only ${product.quantity-cartItem.quantity} left`);
//          return;
//     }

//     const updatedCart=cart.map(itm=>
//         itm.id===product.id?{...itm, quantity:itm.quantity+1}:itm
//     );
//     axios.patch(`http://localhost:3000/user/${id}`,{cart:updatedCart})
//     .then (()=>{
//         setCart(updatedCart)
//         setCount(updatedCart.length)
//         toast.success(`${product.name} added to the cart`)
//     })
//     .catch(error=>console.error('error occured',error))
    
//  }
//  else{
//     const updatedCart=[...cart,{...product,quantity:1}]
//     axios.patch(`http://localhost:3000/user/${id}`,{cart:updatedCart})
//     .then (()=>{
//         setCart(updatedCart)
//         setCount(updatedCart.length)
//         toast.success(`${product.name} added to the cart`)
//     })
//     .catch(error=>console.error('error occured',error))
//  }

// }


  

//   const removeCart=(productId)=>{
//     const updatedCart=cart.filter(itm=>itm.id!==productId);
//     axios.patch(`http://localhost:3000/user/${id}`,{cart:updatedCart})
//     .then(()=>{
//         setCart(updatedCart)
//         setCount(updatedCart.length)
//         toast.success('item removed from the cart')
//     }).catch(error=>console.error('error occured',error));
//   }

//   const clearCart=()=>{
//     axios.patch(`http://localhost:3000/user/${id}`,{cart:[]})
//     .then(()=>{
//         setCart([])
//         setCount(0)
//     })
//     .catch((error)=>console.log('error',error))
//   }


// //quantity
//   const updateQty=async (productId,newquantity)=>{
//      if(newquantity<=0){
//         removeCart(productId)
//         toast.info('Quantity must be atleast 1')
//         return; 
//      }
//   try{ 
//     const response = await axios.get(`http://localhost:3000/products/${productId}`);
//     const serverProduct = response.data;

//     if (newquantity > serverProduct.quantity) {
//       toast.error(`Cannot update. Only ${serverProduct.quantity} left in stock.`);
//       return;
//     }
    
//         const updatedCart=cart.map((item)=>
//             item.id===productId?{...item,quantity:newquantity}:item
//     );
    

//     axios.patch(`http://localhost:3000/user/${id}`,{cart:updatedCart})
    
//         setCart(updatedCart)
//         toast.success('quantity updated')
        
//     }catch(error){
//       console.error('error occured',error);
//       toast.error('failed to update the quantity')
//   }
// }

// //order
  
// useEffect(()=>{
//   const id=localStorage.getItem('id')
//   if(!id){
//     toast.error('not logged in')
//     return;
//   }
//   axios.get(`http://localhost:3000/user/${id}`)
//   .then((res)=>{
//     setOrder(res.data.order)
//   })
//   .catch((err)=>console.log(err))
// })


// const addToOrder =(orderdata)=>{
//    const id=localStorage.getItem('id')
//    const updateOrder=[...order,orderdata];
   
//    axios.patch(`http://localhost:3000/user/${id}`,{order:updateOrder})
//    .then(()=>{
//     toast.success('Order completed')
//     // console.log(order)
//    }

//    )
//    .catch(()=>{
//     toast.error('order Failed')
//    })
//    clearCart();
// }


//   return (
//     <div>
//       <cartCont.Provider 
//       value={{cart,count,updateQty,removeCart,clearCart,addToCart,addToOrder,
//       order,addToWhishlist,whishlist,removeWishlist,setLoggedIn}}>
//         {children}
//       </cartCont.Provider>
//       <ToastContainer/>
//     </div>
//   )
// }

// export default CartContext
