import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, fetchUser, userStatus } from '../slice/AdminSlice';

function Dashboard() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchProduct())
  },[])
  const product=useSelector(state=>state.admin.product)
  //const[user,setUser]=useState([])
  const[statusCount,setStatusCount]=useState([])
  console.log('total products',product.length)
  const user=useSelector(state=>state.admin.user)
  console.log('user data:',user)

  useEffect(()=>{
    dispatch(fetchUser())
    dispatch(userStatus())
  },[])
  const blockedUserCount = user.filter((itm) => itm.status === false).length;
 // const sales=user.reduce((acc,val)=>acc+val.order.reduce((acc,order)=>acc+order.total,0),0)
  return (
    <div className='min-h-screen py-10 p-5 '>
       <h2 className='text-3xl md:text-4xl  font-bold text-center text-gray-800 mb-10'>Welcome to Admin Panel</h2>
       
       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
           
           <Link to='/adminUsers' className='block' >
           <div className='bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition'>
            <h2 className='text-lg md:text-xl font-semibold text-gray-700'>Total Users</h2>
           <p className='text-2xl md:text-3xl font-bold text-gray-900 mt-2'>{user.length}</p>
           </div>
           </Link>
          
      

           <Link to='/adminProduct' className='block'>
           <div className='bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition'>
           <h2 className='text-lg md:text-xl font-semibold text-gray-700'>Total Products</h2>
           <p className='text-2xl md:text-3xl font-bold text-gray-900 mt-2'>{product.length}</p>
           </div>
           </Link>
       
           <Link to='/adminUsers' className='block' >
           <div className='bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition' >
           <h2 className='text-lg md:text-xl font-semibold text-gray-700'>Blocked users</h2>
           <p className='text-2xl md:text-3xl font-bold text-gray-900 mt-2'>{blockedUserCount}</p>
           </div>
           </Link>
       

       {/* <div className='bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition'>
         <h2 className='text-lg md:text-xl font-semibold text-gray-700'>Total sales</h2>
         <p className='text-2xl md:text-3xl font-bold text-gray-900 mt-2'>₹ {sales}</p>
       </div> */}
    </div>
    </div>
  )
}

export default Dashboard
