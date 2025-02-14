import React from 'react'

// import'./App.css'
import Routing from './components//Routing'
import AdminRouting from './Admin/AdminRouting'
import { ToastContainer } from 'react-toastify'


function App() {
  return (
    <div>

<ToastContainer/>
     <Routing/>
      <AdminRouting/>
     
   
   </div>
  )
}

export default App
