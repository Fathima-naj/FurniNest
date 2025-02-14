import React, { useState } from "react";
import {  FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { IoIosHeartEmpty } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const [search, setSearch] = useState("");
  const [isDropDown, setIsDropDown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const count=useSelector(state=>state.cart.count)

  const toLinks = [
    "/category/table",
    "/category/bed",
    "/category/home decor",
    "/category/sofa",
    "/category/furnishing",
  ];
  const category = ["Table", "Bed", "Home Decor", "Sofa", "Furnishing"];

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleSearchIcon = () => {
    if (search.trim()) {
      navigate("/search", { state: { result: search } });
    } else {
      alert("Please enter a search term");
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-md">
        
        <div className="flex items-center justify-between p-4 md:px-8">
          
         {/* Search */}
          <div className=" flex items-center space-x-3">
            {isSearchOpen?  (
              <HiX
              size={23}
              className="cursor-pointer text-gray-500 hover:text-red-600"
              onClick={() => setIsSearchOpen(false)}
            />):(
              <CiSearch
                size={23}
                className="cursor-pointer text-gray-500 hover:text-red-600 transition-colors"
                onClick={() => setIsSearchOpen(true)}
              />
            )}
            {isSearchOpen && (
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                />
                <CiSearch
                  size={23}
                  className="cursor-pointer text-gray-500 hover:text-red-600 transition-colors"
                  onClick={handleSearchIcon}
                />
              </div>
            )}
          </div>

          {/* Name */}
          <h2 className="font-bold text-red-600 md:text-3xl cursor-pointer" onClick={()=>handleNavigation('/')}>
            FurniNest
          </h2>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-3">
            <GoHome
              size={23}
              className="cursor-pointer text-gray-500 hover:text-red-600 transition-colors"
              onClick={() => handleNavigation("/")}
            />
            <IoIosHeartEmpty
              size={23}
              onClick={() => handleNavigation("/whishlist")}
              className="cursor-pointer text-gray-500 hover:text-red-600 transition-colors"
            />
            <NavLink to="/cart" className="relative">
              <FiShoppingCart
                size={23}
                className="cursor-pointer text-gray-500 hover:text-red-600 transition-colors"
              />
              {count > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </NavLink>
            
            <div className='relative'>
    <div className=' flex items-center space-x-2 cursor-pointer' onClick={()=>setIsDropDown(!isDropDown)}>

          <FaRegUser size={20}
          className=" text-gray-500 hover:text-red-600 transition-colors"
          onClick={() => handleNavigation('/login')}
          />

          <p>{localStorage.getItem('name')}</p>
        
      </div>
   
       {isDropDown && (
      <ul className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-40 text-sm text-gray-700">
        <li 
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          const confirmLogout = window.confirm("Are you sure you want to log out?");
          if (confirmLogout) {
            navigate('/login');
          }
        }}
       >
          Logout
        </li>
        <li 
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"

        onClick={()=>navigate('/order')}
          >
          Order
        </li>
        </ul>
      )}
      </div>
          </div>

          
          <div className="md:hidden flex item-center space-x-4">
            
          <IoIosHeartEmpty
              size={23}
              onClick={() => handleNavigation("/whishlist")}
              className="cursor-pointer text-gray-500 hover:text-red-600 transition-colors"
            />
            <NavLink to="/cart" className="relative">
              <FiShoppingCart
                size={23}
                className="cursor-pointer text-gray-500 hover:text-red-600 transition-colors"
              />
              {count > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </NavLink>


            {isMenuOpen ? (
              <HiX
                size={23}
                className="cursor-pointer text-gray-500 hover:text-red-600"
                onClick={() => setIsMenuOpen(false)}
              />
            ) : (
              <HiMenu
                size={23}
                className="cursor-pointer text-gray-500 hover:text-red-600"
                onClick={() => setIsMenuOpen(true)}
              />
            )}

            
          </div>
          

        </div>

        {/* Mobile Menu */}
        
        {isMenuOpen && (
          <div className="md:hidden  shadow-md">
            <div className="flex flex-col items-start space-y-4 p-4">
              {toLinks.map((path, index) => (
                <Link
                  key={path}
                  to={path}
                  className="hover:underline flex items-center space-x-2"
                  onClick={()=>setIsMenuOpen(false)}
                >
                  {category[index]}
                </Link>
              ))}

              <div
                className="flex items-center space-x-3 cursor-pointer"
                
              >
                <FaRegUser
                size={23}
                className="text-gray-500 hover:text-red-600 transition-colors"
                onClick={() => handleNavigation("/login")}
              />
              <p className=" md:block">{localStorage.getItem("name")}</p>
                
              </div>
              
            </div>
          </div>
        )}
        

        {/* Category Large Screens */}
        <div className="hidden md:flex justify-center space-x-8 bg-red-600 text-white py-2">
          {toLinks.map((path, index) => (
            <Link key={path} to={path} className="hover:underline">
              {category[index]}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
