import React, { useEffect, useState } from "react";
import {  FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { IoIosHeartEmpty } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "../slice/CartSlice";
import { fetchUserDetails, logoutUser } from "../slice/AuthSlice";
import { toast } from "react-toastify";
import { fetchProduct } from "../slice/ProductSlice";
function Navbar() {
  const [search, setSearch] = useState("");
  const [isDropDown, setIsDropDown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cart=useSelector(state=>state.cart.cart)
  const {user}=useSelector(state=>state.auth)
   const dispatch=useDispatch()
 console.log('cart length',cart.length)
  const toLinks = [
    "/category/table",
    "/category/bed",
    "/category/home decor",
    "/category/sofa",
    "/category/furnishing",
  ];
  const category = ["Table", "Bed", "Home Decor", "Sofa", "Furnishing"];
 
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
      dispatch(fetchUserDetails())
    }
  },[dispatch,user]);

  useEffect(() => {
    if (!user) {
       dispatch(fetchUserDetails());
    } else {
       dispatch(getCart());  
    }
 }, [dispatch, user]);
 
  

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

 
  const handleSearchIcon = (e) => {
    e.preventDefault();
    if (search.trim()) {
        navigate(`/search?query=${search}`); 
    } else {
        alert("Please enter a search term");
    }

    
};

  
const handleLogOut=async()=>{
  
  //   setTimeout(() => {
  //     navigate("/");
  //     setIsLoggedOut(true) // Force a full state refresh
  //   }, 100);
  try{
    await dispatch(logoutUser()).unwrap();
    dispatch(clearCart());
    //dispatch(clearCart());
    toast.success('User logout successfully')
    navigate('/')
  }catch(err){
   console.log('Logout failed',err)
  }
    
}
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
                  onClick={(e)=>handleSearchIcon(e)}
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
              { cart.length>0  && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart?.length}
                </span>
              )}
            </NavLink>
            
            <div className='relative'>
    <div className=' flex items-center space-x-2 cursor-pointer' onClick={()=>setIsDropDown(!isDropDown)}>

          <FaRegUser size={20}
          className=" text-gray-500 hover:text-red-600 transition-colors"
          onClick={() => handleNavigation('/login')}
          />

          <p>{user?.username||'Guest'}</p>
        
      </div>
   
       {isDropDown && (
      <ul className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-40 text-sm text-gray-700">
        <li 
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={handleLogOut}
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
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart?.length}
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
              <p className=" md:block">{user?.username|| 'Guest'}</p>
                
              </div>
              <div onClick={()=>{handleLogOut(),setIsMenuOpen(false)}}>
                Logout
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
