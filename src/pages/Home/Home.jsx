import React from 'react'
import { useNavigate} from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Offers from './Offers'


function Home() {

  const navigate=useNavigate()
   
  return (
 <>
    <div 
    className='bg-cover bg-center sm:bg-contain md:bg-cover lg:bg-cover xl:bg-cover h-screen' 
    style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://img.freepik.com/free-photo/gray-sofa-brown-living-room-with-copy-space_43614-954.jpg?semt=ais_hybrid')`}}
    >

    <Navbar/>
    <div className="absolute text-white text-center top-1/3 w-full">

      <h1 className="text-4xl md:text-6xl font-bold">Furnish Your Dream Space</h1>
      <p className="text-lg md:text-2xl mt-4">Stylish, Comfortable, and Affordable Furniture</p>

      <button
      className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
      onClick={() => navigate('/shop')}
      >
      Shop Now
      </button>
      
     
    </div>

    
    
    </div>
     <Offers/>
    <Footer/>
    </>
    
  )

}
export default Home
