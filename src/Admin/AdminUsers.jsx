


import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, userStatus ,getUserOrder} from '../slice/AdminSlice';

function AdminUsers() {
  const dispatch = useDispatch();
  const [page,setPage]=useState(1)
  const[orders,setOrders]=useState([])
  const {user,totalPages,userOrder} = useSelector((state) => state.admin);
 //console.log('user from sdminUser',user)
 const [userlist, setUserlist] = useState(false);
 console.log('user order',userOrder)
  useEffect(() => {
    dispatch(fetchUser({page}));
  }, [dispatch,page]);

  

  const handleStatus = (id) => {
    if(
      window.confirm(
        "Are you sure you want to change this user's block status?"
      )
    )
    dispatch(userStatus( id ))
    .unwrap()
    .then((res)=>dispatch(fetchUser({})))
  };

  //handle page
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
 
  const handleDoubleClick = async(id) => {
    console.log(userOrder);
    console.log("Fetching orders for user ID:", id);
    const selectedUser = user.find((u) => u._id === id);
    if (selectedUser) {
      setUserlist({
        name: selectedUser.name,
        email: selectedUser.email,
      }); 
    }

    try {
      const response = await dispatch(getUserOrder(id)).unwrap();
      console.log("Fetched user order:", response);
      setOrders(response||[])
    } catch (error) {
      console.error("Error fetching user order:", error);
      setOrders([])
    } 
  };

  return (
    <div className="max-w-full mx-auto sm:px-4 sm:mx-4 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Users</h1>

     
      <div className="hidden md:block">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">NAME</th>
              <th className="border border-gray-300 px-4 py-2">EMAIL</th>
              <th className="border border-gray-300 px-4 py-2">STATUS</th>
              <th className="border border-gray-300 px-4 py-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {user.map((users) => (
              <tr
                key={users._id}
                onClick={() => handleDoubleClick(users._id)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="border border-gray-300 px-4 py-2">{users.name}</td>
                <td className="border border-gray-300 px-4 py-2">{users.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {users.isBlock ? 'Active' : 'Inactive'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleStatus(users._id)}
                    className={`text-white px-4 py-2 rounded ${
                      users.isBlock
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {users.isBlock ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
           

      {/*  for smaller screens */}
      <div className="block md:hidden space-y-4">
        {user.map((users) => (
          <div
            key={users._id}
            onClick={() => handleDoubleClick(users._id)}
            className="bg-white rounded-lg shadow-lg p-4 cursor-pointer"
          >
            <p className="text-lg font-semibold">
              Name: <span className="font-normal">{users.name}</span>
            </p>
            <p className="text-lg font-semibold">
              Email: <span className="font-normal">{users.email}</span>
            </p>
            <p className="text-lg font-semibold">
              Status:{' '}
              <span className={`font-bold ${users.isBlock ? 'text-green-600' : 'text-red-600'}`}>
                {users.isBlock ? 'Active' : 'Inactive'}
              </span>
            </p>
            <button
              onClick={() => handleStatus(users._id)}
              className={`mt-2 text-white px-4 py-2 rounded ${
                users.isBlock
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {users.isBlock ? 'Block' : 'Unblock'}
            </button>
          </div>
        ))}
      </div>

      {/* handle Pagination */}
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
        {[...Array(totalPages).keys()].map((_, index) => (
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
          disabled={page === totalPages}
          className={`py-2 px-4 rounded bg-gray-500 text-white ${
            page === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-600"
          }`}
        >
          Next
        </button>
      </div>


      {/* User Details Modal */}
      {userlist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-md p-6 relative">
            <button
              onClick={() => setUserlist(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <IoMdClose size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <div className="mb-4">
              <p>
                <strong>Name:</strong> {userlist.name}
              </p>
              <p>
                <strong>Email:</strong> {userlist.email}
              </p>
            </div>
            <div>
              { orders.length === 0 ? (
                <h3 className="text-center text-gray-500">No orders placed</h3>
              ) : (
                userOrder.map((order, index) => (
                  <div
                    key={order._id}
                    className="bg-gray-50 p-4 rounded border border-gray-200 shadow-md mb-4"
                  >
                    <h3 className="font-bold mb-2">Order {index + 1}</h3>
                    <ul>
                      {order.items.map((item, i) => (
                        <li key={item.productId._id} className="flex justify-between">
                          <span>{item.productId.name}</span>
                          <span> {item.productId.price} x {item.quantity}</span>
                          <span>₹ {item.productId.price*item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 font-semibold text-right">
                      Total: ₹ {order.total}
                    </p>
                  </div>
                ))
              )} 
            </div>
          </div>
        </div>
       )}
    </div>
  );
}

export default AdminUsers;
