import React from 'react'
import { Form ,Formik, Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { setLogged } from '../../slice/AdminSlice'
import axiosInstance from '../../api/axiosinstance'
import { setUser } from '../../slice/AuthSlice'

const initialValues={
  password:"",
  email:""
}

const validationSchema=Yup.object({
  email:Yup.string().email('invalid email format').required('Email is required !'),
  password:Yup.string().required('Password is required !').min(8,'must be atleast 8 characters')
})

function Login() {
const dispatch=useDispatch()
//  const [logged,setLogged]=useState(null)
const navigate=useNavigate()

const onSubmit=async(values,{resetForm})=>{
  try{


    // if(values.email==='fnajaP@gmail.com'&& values.password==='Naja#621'){
    //  // setLogged(true)
    //  dispatch(setLogged(true))
    //     navigate('/admin')
    // }

   
      const response= await axiosInstance.post(`/users/login`,values)
      console.log(response,"from login response : ")
      
      setUser(response.data.user.name)
      console.log(response.data,"from login response.data : ")
      
        const userRole=response.data.user.isAdmin?'admin':'user'
        console.log(userRole)
        navigate(userRole==='admin'?'/admin':'/');
        resetForm()
        toast.success(response.data.message)
        
  }catch(error){
    console.error('Error:',error)
    toast.error('soemthing went wrong')
  }
}


return (
  <div className='flex items-center justify-center p-32 mt-10'>
  <div className='border p-6 shadow-md rounded-lg bg-white w-80'>
    <h3 className='text-xl font-bold text-center mb-4 '>LOGIN</h3>

      <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >

      <Form>

        <div className='mb-4'> 
        <Field
        type='email'
        placeholder='Email'
        name='email'
        className='w-full border rounded-lg px-3 py-2'
        /><br/>
        <ErrorMessage name='email' component='div' className='text-red-600 text-sm mt-1'/>
        </div>

        <div className='mb-4'>
        <Field
        type='password'
        placeholder='Password'
        name='password'
        className='w-full border rounded-lg px-3 py-2'
        /><br/>
        <ErrorMessage name='password' component='div' className='text-red-600 text-sm mt-1'/>
        </div>

        <button 
        type='submit' 
        className='text-white mb-4 w-60 bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500'>
        Login
        </button>

        <p className="mt-4 text-center text-sm">Don't have any account ?
        <Link to="/register" className='text-blue-500 hover:underline' >Register</Link>
        </p>
      </Form>

    </Formik>
    <ToastContainer/>

  </div>
  </div>
  )
}

export default Login
