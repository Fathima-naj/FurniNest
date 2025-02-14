import React from 'react'
import { Form ,Formik, Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { setLogged } from '../../slice/AdminSlice'

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

const onSubmit=async(values)=>{
  try{

    if(values.email==='fnajaP@gmail.com'&& values.password==='Naja#621'){
     // setLogged(true)
     dispatch(setLogged(true))
        navigate('/admin')
    }

    else{
      const valid= await axios.get('http://localhost:3000/user')
      const user=valid.data.find((val)=>val.email===values.email&& val.password===values.password)

      if(user){

        if(!user.status){
          toast.error('You are blocked')
          return;
        }
      
      localStorage.setItem('id',user.id);
      localStorage.setItem('name',user.name);
        // console.log(user.id)
        dispatch(setLogged(true));
        navigate('/');
        
      }else{
        toast.error('invalid email or password')
      }
        }
    
  // const user=valid.data.find((val)=>val.email===values.email&& val.password===values.password)

  // if(user){
  //   toast.success('logged in successfully')
  //   localStorage.setItem('id',user.id);
  //   localStorage.setItem('name',user.name);
  //   // console.log(user.id)
  //   navigate('/')
  // }else{
  //   toast.error('invalid email or password')
  // }

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
