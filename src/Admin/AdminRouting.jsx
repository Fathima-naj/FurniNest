import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Dashboard from '../Admin/Dashboard'
 import AdminProduct from '../Admin/AdminProduct'
// import AdminProtected from '../Admin/AdminProtected'
import AdminUsers from '../Admin/AdminUsers'
import AdminLayout from '../Admin/AdminLayout'

function AdminRouting() {
  return (
    <div>
      <Routes>
      {/* <Route element={<AdminProtected><AdminLayout/></AdminProtected>}> */}
      <Route element={<AdminLayout/>}>
            <Route path='/admin' element={<Dashboard/>}/>
            <Route path='/adminProduct' element={<AdminProduct/>}/> 
            <Route path='/adminUsers' element={<AdminUsers/>}/>
            </Route>
      </Routes>
    </div>
  )
}

export default AdminRouting
