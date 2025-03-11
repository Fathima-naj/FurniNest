
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { HiX, HiMenu } from 'react-icons/hi';

function AdminNavbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure, you want to log out?");
    if (confirmLogout) {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col sm:h-screen">
      {/* Navbar for smaller screens */}
      <div className="sm:hidden  text-gray-600 flex justify-between items-center px-4 py-2">
        {/* <h2 className="text-xl font-bold">FurniNest</h2>  */}
        {isMenuOpen ? (
          <HiX
            size={23}
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />
        ) : (
          <HiMenu
            size={23}
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } sm:block h-full bg-gray-600 text-white sm:w-40 md:w-56 flex flex-col fixed sm:sticky top-0 left-0 transition-all duration-300 z-50`}
      >
        <div className="flex justify-between items-center px-4 py-4 ">
          <h2 className="text-2xl font-bold">FurniNest</h2>
          <HiX
            size={23}
            className="cursor-pointer sm:hidden text-white"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>

        <ul className="mt-6 space-y-2">
          <Link
            to="/admin"
            className="block py-3 px-6 rounded hover:bg-gray-700 transition"
          >
            <li>Dashboard</li>
          </Link>

          <Link
            to="/adminUsers"
            className="block py-3 px-6 rounded hover:bg-gray-700 transition"
          >
            <li>Users</li>
          </Link>

          <Link
            to="/adminProduct"
            className="block py-3 px-6 rounded hover:bg-gray-700 transition"
          >
            <li>Products</li>
          </Link>
        </ul>

        <div className="mt-auto py-6 px-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full py-2 text-center bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
