
import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { HiFolderAdd } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { useSelector,useDispatch } from 'react-redux';
import { deleteProduct,addproduct,editProduct } from '../slice/ProductSlice';
import { fetchProduct } from '../slice/ProductSlice';

function AdminProduct() {
   
    const[selectedCategory,setSelectedCategory]=useState('All')
    const[showaddProduct,setshowAddProduct]=useState(false)
    const [showeditProduct,setshoweditProduct]=useState(null)
    const [page,setPage]=useState(1)
    const dispatch=useDispatch()
    
    const { product, pagination, loading, error, categories } = useSelector(
      (state) => state.product
    );
          //console.log(product)
          console.log('product',product)
           console.log('category',categories)

          useEffect(()=>{
            dispatch(fetchProduct({page,categories}))
            
          },[dispatch,page,categories])

          if (loading) {
            return <div className="text-center py-4">Loading Products...</div>;
          }
        
          if (error) {
            return <div className="text-red-500 text-center py-4">Error: {error}</div>;
          }
        
          
          const handlePageChange = (newPage) => {
            if (newPage > 0 && newPage <= pagination.totalPages) {
              setPage(newPage);
            }
          }; 

    const initialValues={
        name:"",
        price:"",
        quantity:"",
        description:"",
        categories:"",
        url:null
    }
    
    const validationSchema=Yup.object({
        name:Yup.string().required('Name is required'),
        price:Yup.string().required('Price is required'),
        quantity:Yup.string().required('Quantity is required'),
        description:Yup.string().required('Description is required'),
        categories:Yup.string().required('Category is required'),
        //url:Yup.string().required('image url is required')
        url: Yup.mixed()
        .required("Image is required")
    })
    
    
    
    const handleCategory = (e) => {
      const selectedValue = e.target.value;
      setSelectedCategory(selectedValue);
    
      if (selectedValue === "All") {
        // Fetch all products if "All" is selected
        dispatch(fetchProduct({ page }));
      } else {
        // Fetch products filtered by the selected category
        dispatch(fetchProduct({ categories: selectedValue, page }));
      }
    };
    


    const onSubmit = (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("quantity", values.quantity);
      formData.append("description", values.description);
      formData.append("categories", values.categories);
      formData.append("url", values.url); // Use selected file
    
      dispatch(addproduct(formData)).unwrap()
      .then(()=>dispatch(fetchProduct({categories,page})))
      toast.success(' product added successfully')
      resetForm()
      setshowAddProduct(false)
       }
  
 const editSubmit=(data,{resetForm})=>{
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("price", data.price);
  if (data.url) {
    formData.append("url", data.url); 
  }
  formData.append("quantity", data.quantity)
  formData.append("categories", data.categories);
  formData.append("description", data.description);
 
  console.log('submitted values',data)
  console.log('Product ID : ',showeditProduct._id);
  
   dispatch(editProduct({data:formData,id:showeditProduct._id})).unwrap()
   .then(()=>dispatch(fetchProduct({categories,page})))
   toast.success(' product edited successfully')
    resetForm()
    setshoweditProduct(null)
   
 }




    

  return (
    <div className='min-h-screen p-4 max-w-full '>
      <h1 className="text-2xl font-bold mb-6 text-center">Products</h1>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-4 w-full'>

      <select
  onChange={handleCategory}
  value={selectedCategory}
  className="p-2 rounded"
>
  <option value="All">All</option>
  <option value="Sofa">Sofa</option>
  <option value="Bed">Bed</option>
  <option value="Table">Table</option>
  <option value="Furnishing">Furnishing</option>
  <option value="Home decor">Home decor</option>
  {categories.length > 0 &&
    categories.map((category, index) => (
      <option key={index} value={category}>
        {category}
      </option>
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
            
            {product.slice().reverse().map((product)=>(
                <tr key={product._id} className='border-b hover:bg-gray-100'>
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
                    setshoweditProduct(product)}}>
                    Edit
                  </button>

                                  <button
                  className={`py-1 px-3 rounded 
                    bg-red-500 hover:bg-red-600
                   text-white`}
                  onClick={() => dispatch(deleteProduct(product._id))}
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

      {/* Products display on mobile */}
      <div className="block sm:hidden overflow-y-auto ">
                {product.slice().reverse().map((product) => (
                    <div key={product._id} className="border p-4 mb-4 shadow-sm rounded-md bg-white">
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
                                    onClick={() => { setshoweditProduct(product) }}
                                >
                                    Edit
                                </button>
  
                                <button
                  className={`py-1 px-3 rounded 
                    bg-red-500 hover:bg-red-600
                   text-white`}
                  onClick={() => dispatch(deleteProduct(product._id))
                    .unwrap()
                    .then(() => dispatch(fetchProduct({ categories, page, search })))
                    .catch((error) => toast.error(`Delete failed: ${error.message}`))
                  }
                >
                  Delete
                </button>
                            </div>
                    </div>
                    
                ))}
            </div>
           

           {/* pagination */}
      <div className="flex justify-center items-center mt-10 space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`py-2 px-4 rounded bg-gray-500 text-white ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
          }`}
        >
          Previous
        </button>
        {[...Array(pagination.totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`py-2 px-4 rounded ${
              page === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pagination.totalPages}
          className={`py-2 px-4 rounded bg-gray-500 text-white ${
            page === pagination.totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-600"
          }`}
        >
          Next
        </button>
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
        
        {({ setFieldValue }) => (
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
        <input
          type="file"
          accept="image/*"
          onChange={(e) => 
            {
      
      setFieldValue("url", e.currentTarget.files[0]); 
    }
          }
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
        )}
      </Formik>
    </div>
  </div>
)}

{showeditProduct && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg md:w-full w-64 h-screen overflow-scroll max-w-md relative">
      <IoMdClose onClick={() => setshoweditProduct(null)} />
      <Formik
        initialValues={{
          id: showeditProduct._id || "",
          name: showeditProduct.name || "",
          price: showeditProduct.price || "",
          quantity:showeditProduct.quantity || "",
          description:showeditProduct.description || "",
          categories: showeditProduct.categories || "",
          url: showeditProduct.url||null
        }}
        validationSchema={validationSchema}
        onSubmit={editSubmit}
      >
          {({ setFieldValue }) => (
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
        <input
          type="file"
          accept="image/*"
          onChange={(e) => 
            {
      
      setFieldValue("url", e.currentTarget.files[0]); 
    }
          }
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
          )}
      </Formik>
    </div>
  </div>
)}

    </div>
  )
}

export default AdminProduct