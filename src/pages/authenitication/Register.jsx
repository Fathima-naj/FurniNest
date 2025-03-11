import React from 'react'
import { Formik ,Form ,Field , ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import axiosInstance from '../../api/axiosinstance'
import {toast ,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate } from 'react-router-dom'

const initialValues={
    name:'',
    password:'',
    email:'',
    username:'',
    confirmPassword:'',
}

const validationSchema=Yup .object({
  name:Yup.string().required("Name is required!"),
  email:Yup.string().email('invalid email format')
  .required('Email is required!'),
  username: Yup.string().required("username is required"),
  password:Yup.string().required('Password is required!')
  .min(8,'must be atleast 8 characters')
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[@$!%*?&#]/, "Password must contain at least one special character"),
  confirmPassword:Yup.string()
  .oneOf([Yup.ref('password')],'Password must match')
  .required('confirm your password')
})

function Register() {
  const navigate=useNavigate();

  const onSubmit=async(values,{resetForm})=>{
    try{
      const {confirmPassword,...dataToSend}=values
      console.log("API URL:", `/users/register`);
       const res= await axiosInstance.post(`/users/register`,dataToSend);
      console.log("values:",values)
      console.log('saved',res.data);
      toast.success('Registered successfully !')
      resetForm();
      navigate('/login');

      
    }catch (error){
      console.error('Error:',error);
      toast.error('something went wrong.Try again !')
    }
  
  };
   
  return (
    <div className='flex items-center justify-center p-32 mt-1'>
    <div className='bg-white p-6 rounded-lg shadow-md w-80'>
      <h3 className="text-xl font-bold text-center mb-4">REGISTER</h3>
      <Formik
       initialValues={initialValues}
       onSubmit={onSubmit}
       validationSchema={validationSchema}
      >
        
      <Form  noValidate>

        <div className='mb-4'>
          <Field 
          type='text' 
          name="name" 
          placeholder='Name'
          className="w-full px-3 py-2 border rounded-lg "
          /><br/>
          <ErrorMessage  name='name' component='div' className='text-red-500 text-sm mt-1'/>
        </div>
        
        <div className='mb-4'>
          <Field
          type='text' 
          name="username" 
          placeholder='Username'
          className="w-full px-3 py-2 border rounded-lg "
          /><br/>
          <ErrorMessage name='username' component='div' className='text-red-500 text-sm mt-1'/>
        </div>
        
        <div className='mb-4'>
          <Field 
          type='email'
          name="email" 
          placeholder='Email'
          className="w-full px-3 py-2 border rounded-lg "
          /><br/>
          <ErrorMessage name='email' component='div' className='text-red-500 text-sm mt-1'/>
        </div>


        <div className='mb-4'>
          <Field
          type='password' 
          name="password" 
          placeholder='Password'
          className="w-full px-3 py-2 border rounded-lg "
          /><br/>
          <ErrorMessage name='password' component='div' className='text-red-500 text-sm mt-1'/>
        </div>


        <div className='mb-4'>
          <Field
          type='password' 
          name="confirmPassword" 
          placeholder='Confirm password'
          className="w-full px-3 py-2 border rounded-lg "
          /><br/>
          <ErrorMessage name='confirmPassword' component='div' className='text-red-500 text-sm mt-1'/>
        </div>


          <button 
          type='submit' 
          className="w-60 bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 ">
          Submit
          </button>
          
          
          <p className="mt-4 text-center text-sm">Already have an account ?
            <Link to='/login' className='text-blue-500 hover:underline'>Login</Link>
          </p>

        </Form>
      </Formik>
      <ToastContainer/>

    </div>
    </div>
   )
}

export default Register
 