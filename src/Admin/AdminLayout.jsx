import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className='flex  h-screen overflow-hidden'>
        <AdminNavbar/>

    <div className="flex-1   bg-gray-100 overflow-auto ">
      <div className=" overflow-auto flex-1">
      <Outlet />
      </div>
    </div>

    </div>
  )
}

export default AdminLayout
  