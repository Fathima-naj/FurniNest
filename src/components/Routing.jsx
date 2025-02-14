
import React from 'react'
import { useParams } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/authenitication/Register'
import Login from '../pages/authenitication/Login'
import Home from '../pages/Home/Home'
import Shop from '../pages/Home/Shop'
import CategoryCard from '../pages/Home/CategoryCard'
import Cart from '../pages/Cart'
import SearchItem from '../pages/Home/SearchItem'
import Payment from '../pages/Payment'
import Order from '../pages/order'
import Whishlist from '../pages/Whishlist'
import About from '../pages/Home/About'





function Routing() {
  return (
    <div>
            
    
      
            <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path="/category/:categoryName" element={<CategoryCardWrapper />} />
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/search' element={<SearchItem/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/order' element={<Order/>}/>
            <Route path='/whishlist' element={<Whishlist/>}/>
            <Route path='/about' element={<About/>}/>
            </Routes>
             
          
            
          

    </div>
  )
}

const CategoryCardWrapper=()=>{
  const { categoryName } = useParams();
  return <CategoryCard categoryName={categoryName} />;
}

export default Routing
