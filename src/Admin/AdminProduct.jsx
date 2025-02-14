import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { HiFolderAdd } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { useSelector,useDispatch } from 'react-redux';
import { fetchProduct,deleteProduct,addProduct,editProduct } from '../slice/AdminSlice';

function AdminProduct() {
   
    const[filterProducts,setFilterProducts]=useState([]);
    const[filterCategory,setFilterCategory]=useState([]);
    const[selectedCategory,setSelectedCategory]=useState('All')
    const[showaddProduct,setshowAddProduct]=useState(false)
    const [showeditProduct,setshowEditProduct]=useState(null)

    const dispatch=useDispatch()
    
          const product=useSelector(state=>state.admin.product)
          const category=useSelector(state=>state.admin.category)
          // console.log(product)
          // console.log(category)

          useEffect(()=>{
            dispatch(fetchProduct())
            
          },[dispatch])

    const initialValues={
        name:"",
        price:"",
        quantity:"",
        description:"",
        categories:"",
        url:""
    }
    
    const validationSchema=Yup.object({
        name:Yup.string().required('Name is required'),
        price:Yup.string().required('Price is required'),
        quantity:Yup.string().required('Quantity is required'),
        description:Yup.string().required('Description is required'),
        categories:Yup.string().required('Category is required'),
        url:Yup.string().required('image url is required')
    })
    
    
    useEffect(()=>{
         setFilterCategory(['All',...category])
         setFilterProducts(product)
    },[product,category])
    
    
    const handleCategory=(e)=>{
        const value=e.target.value;
        setSelectedCategory(value)
        if(value==='All'){
          setFilterProducts(product)

        }else{
          setFilterProducts(product.filter((v)=>v.categories===value))
        }
    }
    


   const onSubmit=(values,{resetForm})=>{
    // console.log(values)
    dispatch(addProduct(values))
    toast.success('new product added successfully')
    console.log(product)
    resetForm()
    setshowAddProduct(false);
  }


  
 const editSubmit=(values,{resetForm})=>{
   dispatch(editProduct(values))
   toast.success('edited product updated successfully')
    resetForm()
    setshowEditProduct(null)
    console.log('after editing', product)
 }

    

  return (
    <div className='min-h-screen p-4 max-w-full '>
      <h1 className="text-2xl font-bold mb-6 text-center">Products</h1>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-4 w-full'>

        <select onChange={handleCategory} value={selectedCategory} className='p-2 border rounded bg-white w-full sm:w-auto '>
            {filterCategory.map((itm,index)=>(
                <option key={index} value={itm}>{itm}</option>
            ))}
        </select>
        
        <HiFolderAdd className='text-4xl cursor-pointer  text-blue-500 hover:text-blue-600 mt-4 sm:mt-0' onClick={()=>setshowAddProduct(true)}/>
      </div>

     
<div className='overflow-x-auto hidden sm:block'>
      <table className='w-full border border-gray-300 bg-white overflow-x-auto shadow-md rounded table-auto'>
        <thead className=' bg-gray-200'>
        <tr>
            <th className='px-4 py-2 text-md text-gray-700'>PRODUCT NAME</th>
            <th className='px-4 py-2 text-md text-gray-700'>QUANTITY</th>
            <th className='px-4 py-2 text-md text-gray-700'>PRICE</th>
            <th className='px-4 py-2 text-md text-gray-700'>DESCRIPTION</th>
            <th className='px-4 py-2 text-md text-gray-700'>CATEGORY</th>
            <th className='px-4 py-2 text-md text-gray-700'>IMAGE</th>
            <th className='px-4 py-2 text-md text-gray-700'>EDIT/DELETE</th>
        </tr>
        </thead>
        <tbody>
            
            {filterProducts.slice().reverse().map((product)=>(
                <tr key={product.id} className='border-b hover:bg-gray-100'>
                <td className='px-4 py-2 text-sm text-center'>{product.name} </td>
                <td className='px-4 py-2 text-sm text-center'>{product.quantity}</td>
                <td className='px-4 py-2 text-sm text-center'>{product.price}</td>
                <td className='px-4 py-2 text-sm text-center'>{product.description}</td>
                <td className='px-4 py-2 text-sm text-center'>{product.categories}</td>
                
                <td className=' py-2 text-center'>
                   
                   <img
                   src={product.url} 
                   alt={product.name}
                   className="w-26 h-32 object-cover rounded"
                   />
                   
                </td>

                <td className='px-4 py-2 text-center'>
                <div className="flex space-x-2 justify-center">

                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600" onClick={() => {
                    console.log('Editing products',product)
                    setshowEditProduct(product)}}>
                    Edit
                  </button>

                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    onClick={() => dispatch(deleteProduct(product.id), toast.success('product deleted successfully'))}
                  >
                    Delete
                  </button>

                </div>
                </td>
                </tr>
                
            ))

            }
            
        </tbody>
      </table>
      </div>

      {/* Products displayed as cards on mobile */}
      <div className="block sm:hidden overflow-y-auto ">
                {filterProducts.slice().reverse().map((product) => (
                    <div key={product.id} className="border p-4 mb-4 shadow-sm rounded-md bg-white">
                        <div className=" justify-between">
                            <h3 className="text-xl font-semibold">{product.name}</h3>
                            
                        </div>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <p className="text-sm mt-2">Price: ₹{product.price}</p>
                        <p className="text-sm mt-1">Quantity: {product.quantity}</p>
                        <p className="text-sm mt-2">Category: {product.categories}</p>
                        <img
                            src={product.url}
                            alt={product.name}
                            className="w-full h-48 object-cover mt-4 rounded"
                        />

                     <div className="flex p-3 justify-center space-x-2">
                                <button
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                    onClick={() => { setshowEditProduct(product) }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                    onClick={() => dispatch(deleteProduct(product.id), toast.success('Product deleted successfully'))}
                                >
                                    Delete
                                </button>
                            </div>
                    </div>
                    
                ))}
            </div>

      
    {showaddProduct && (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow-lg md:w-full  max-w-md relative">
      
      <IoMdClose
        className="absolute top-4 right-4 cursor-pointer text-2xl text-gray-700"
        onClick={() => setshowAddProduct(false)}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        
          <Form>
            <div className="mb-4">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <Field
                type="number"
                name="price"
                placeholder="Price"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <Field
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <Field
                type="text"
                name="description"
                placeholder="Description"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <Field
                type="text"
                name="categories"
                placeholder="Categories"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="categories" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <Field
                type="text"
                name="url"
                placeholder="Image URL"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="url" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>

          </Form>
      </Formik>
    </div>
  </div>
)}

{showeditProduct && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg md:w-full w-64 h-screen overflow-scroll max-w-md relative">
      <IoMdClose onClick={() => setshowEditProduct(null)} />
      <Formik
        initialValues={{
          id: showeditProduct.id,
          name: showeditProduct.name,
          price: showeditProduct.price,
          quantity:showeditProduct.quantity,
          description:showeditProduct.description,
          categories: showeditProduct.categories,
          url: showeditProduct.url
        }}
        validationSchema={validationSchema}
        onSubmit={editSubmit}
      >
        <Form>
        <div className="mb-4">
          <label className='font-bold text-sm'>Product Name</label>
              <Field
                type="text"
                name="name"
                placeholder="Product Name"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className='font-bold text-sm'>Price</label>
              <Field
                type="number"
                name="price"
                placeholder="Price"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className='font-bold text-sm'>Quantity</label>
              <Field
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className='font-bold text-sm'>Description</label>
              <Field
                type="text"
                name="description"
                placeholder="Description"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className='font-bold text-sm'>Categories</label>
              <Field
                type="text"
                name="categories"
                placeholder="Categories"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="categories" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className='font-bold text-sm'>Image URL</label>
              <Field
                type="text"
                name="url"
                placeholder="Image URL"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="url" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
            
        </Form>
      </Formik>
    </div>
  </div>
)}

    </div>
  )
}

export default AdminProduct


