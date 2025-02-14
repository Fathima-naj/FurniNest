// import React, { useEffect, useState } from 'react';
// import { IoMdClose } from 'react-icons/io';
// import { useDispatch,useSelector } from 'react-redux';
// import { fetchUser,userStatus } from '../slice/AdminSlice';

// function AdminUsers() {
//   const dispatch=useDispatch()
//   const user=useSelector(state=>state.admin.user)
//   useEffect(()=>{
//     dispatch(fetchUser())
//   },[dispatch])

//   const [userlist, setUserlist] = useState(null);

//   const handleStatus = ({id, status}, event) => {
//     event.stopPropagation();
//     dispatch(userStatus({id,status}))
//   };
  

//   return (
//     <div className=" max-w-full mx-auto sm:px-4 sm:mx-4 p-6">
//       <h1 className="text-2xl font-bold mb-6 text-center">Users</h1>

//       <table className="table-auto w-full border-collapse border border-gray-300">

//         <thead className='cursor-pointer'>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 px-4 py-2">NAME</th>
//             <th className="border border-gray-300 px-4 py-2">EMAIL</th>
//             <th className="border border-gray-300 px-4 py-2">STATUS</th>
//             <th className="border border-gray-300 px-4 py-2">ACTIONS</th>
//           </tr>
//         </thead>

//         <tbody className='cursor-pointer'>
//           {user.map((users) => (
//             <tr
//               key={users.id}
//               onClick={() => setUserlist(users)}
//               className="hover:bg-gray-50"
//             >
//               <td className="border border-gray-300 px-4 py-2">{users.name}</td>
//               <td className="border border-gray-300 px-4 py-2">{users.email}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {users.status ? 'Active' : 'Inactive'}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <button
//                   onClick={(event) => handleStatus({id:users.id,status: users.status},event)}
//                   className={`text-white px-4 py-2 rounded ${
//                     users.status
//                       ? 'bg-red-500 hover:bg-red-600'
//                       : 'bg-green-500 hover:bg-green-600'
//                   }`}
//                 >
//                   {users.status ? 'Block' : 'Unblock'}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>

//       </table>

//       {userlist && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-md p-6 relative">

//             <button
//               onClick={() => setUserlist(null)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
//             >
//               <IoMdClose size={24} />
//             </button>

//             <h2 className="text-xl font-bold mb-4">User Details</h2>

//             <div className="mb-4">
//               <p>
//                 <strong>Name:</strong> {userlist.name}
//               </p>
//               <p>
//                 <strong>Email:</strong> {userlist.email}
//               </p>
//             </div>


//             <div>
//               {userlist.order && userlist.order.length === 0 ? (
//                 <div>
//                   <h3 className="text-center text-gray-500">No orders placed</h3>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//               {userlist.order &&
//                 userlist.order.map((order, index) => (
//                   <div
//                     key={index}
//                     className="bg-gray-50 p-4 rounded border border-gray-200 shadow-md"
//                   >
                    
//                     <h3 className="font-bold mb-2 text-lg sm:text-base">Order {index + 1}</h3>

                   
//                     <ul>
//                       {order.item.map((item,index) => (
//                         <li
//                           key={item.id}
//                           className="flex flex-col justify-between items-start  gap-2"
//                         >
//                           <span className="font-medium  w-full">{index+1} .{item.name}</span>
//                           <span className="text-gray-600  text-center">QTY: {item.quantity}</span>
//                           <span className="text-gray-600  ">
//                             ₹ {item.price}
//                           </span>
                          
//                         </li>
                       
//                       ))}
//                     </ul>

                    
//                     <p className="mt-2 font-semibold text-right text-gray-700">
//                       Total: ₹{order.total}
//                     </p>
//                   </div>
//                 ))}
//             </div>

//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminUsers;




import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, userStatus } from '../slice/AdminSlice';

function AdminUsers() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.admin.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const [userlist, setUserlist] = useState(null);

  const handleStatus = ({ id, status }, event) => {
    event.stopPropagation();
    dispatch(userStatus({ id, status }));
  };

  return (
    <div className="max-w-full mx-auto sm:px-4 sm:mx-4 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Users</h1>

      {/* Table for larger screens */}
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
                key={users.id}
                onClick={() => setUserlist(users)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="border border-gray-300 px-4 py-2">{users.name}</td>
                <td className="border border-gray-300 px-4 py-2">{users.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {users.status ? 'Active' : 'Inactive'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={(event) => handleStatus({ id: users.id, status: users.status }, event)}
                    className={`text-white px-4 py-2 rounded ${
                      users.status
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {users.status ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="block md:hidden space-y-4">
        {user.map((users) => (
          <div
            key={users.id}
            onClick={() => setUserlist(users)}
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
              <span className={`font-bold ${users.status ? 'text-green-600' : 'text-red-600'}`}>
                {users.status ? 'Active' : 'Inactive'}
              </span>
            </p>
            <button
              onClick={(event) => handleStatus({ id: users.id, status: users.status }, event)}
              className={`mt-2 text-white px-4 py-2 rounded ${
                users.status
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {users.status ? 'Block' : 'Unblock'}
            </button>
          </div>
        ))}
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
              {userlist.order && userlist.order.length === 0 ? (
                <h3 className="text-center text-gray-500">No orders placed</h3>
              ) : (
                userlist.order.map((order, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded border border-gray-200 shadow-md mb-4"
                  >
                    <h3 className="font-bold mb-2">Order {index + 1}</h3>
                    <ul>
                      {order.item.map((item, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{item.name}</span>
                          <span>Qty: {item.quantity}</span>
                          <span>₹ {item.price}</span>
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
