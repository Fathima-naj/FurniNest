import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser,totalRevenues } from '../slice/AdminSlice';
import { fetchProduct } from '../slice/ProductSlice';

function Dashboard() {
  const dispatch = useDispatch();


  const { user, totalRevenue } = useSelector(state => state.admin);
  const { product,pagination } = useSelector((state) => state.product);
    
  useEffect(() => {
    dispatch(fetchUser({}));  
    dispatch(fetchProduct({})); 
    dispatch(totalRevenues())
  }, [dispatch]);

  //  blocked users
  const blockedUserCount = user.filter((itm) => itm.isBlock === false).length;

  return (
    <div className='min-h-screen py-10 p-5'>
      <h2 className='text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10'>Welcome to Admin Panel</h2>
      
      
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          
          {/* Total Users */}
          <Link to='/adminUsers' className='block'>
            <div className='bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition'>
              <h2 className='text-lg md:text-xl font-semibold text-gray-700'>Total Users</h2>
              <p className='text-2xl md:text-3xl font-bold text-gray-900 mt-2'>{user.length}</p>
            </div>
          </Link>

          {/* Total Products */}
          <Link to='/adminProduct' className='block'>
            <div className='bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition'>
              <h2 className='text-lg md:text-xl font-semibold text-gray-700'>Total Products</h2>
              <p className='text-2xl md:text-3xl font-bold text-gray-900 mt-2'>{pagination.total}</p>
            </div> 
          </Link>

          {/* Blocked Users */}
          <Link to='/adminUsers' className='block'>
            <div className='bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition'>
              <h2 className='text-lg md:text-xl font-semibold text-gray-700'>Blocked Users</h2>
              <p className='text-2xl md:text-3xl font-bold text-gray-900 mt-2'>{blockedUserCount}</p>
            </div>
          </Link>
          

          <div className='bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition'>
              <h2 className='text-lg md:text-xl font-semibold text-gray-700'>Total Revenue</h2>
              <p className='text-2xl md:text-3xl font-bold text-gray-900 mt-2'>₹ {totalRevenue}</p>
            </div>

            

        </div>
      
    </div>
  );
}

export default Dashboard;
