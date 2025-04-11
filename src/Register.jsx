

import { useForm } from 'react-hook-form'
import './Register.css'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import Loader from './Loader'

function Register() {
  const { register, handleSubmit, formState: { errors },watch} = useForm()
  const[isLoading ,setLoading]=useState(false)


  const password = watch('password')

  
    const onSubmit = async (data) => {
        setLoading(true)
        setTimeout(async() => {
          const res = await axios.post('https://nodemon-black.vercel.app/register',data)
          const resData = res.data
          setLoading(false)
          if(resData.status){
            toast.success('register successful')
          }
          else{
            toast.error(resData.message)
          }
        }, 1000);
    };

  return (
    <>
       <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    removeDelay: 1000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
         
       
      {isLoading && <Loader/>}
      <div className="register-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Register</h2>

          <div className="input-field">
            <label>Full Name</label>
            <input
              type='text'
              {...register('fullName', {
                required: 'full Name is required',
                
                
              })}
            />
            {errors.fullName && <p>{errors.fullName.message}</p>}
          </div>

          <div className="input-field">
            <label>userName</label>
            <input
              type='email'
              {...register('userName', {
                required: 'userName Address is required',pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Full Name should contain only letters and spaces'}
              })}
            />
            {errors.userName && <p>{errors.userNAme.message}</p>}
          </div>

          <div className="input-field">
            <label>Age</label>
            <input
              type='number'
              {...register('age', {
                required: 'Age is required',
                min: {
                  value: 1,
                  message: 'Age must be greater than 0'
                }
              })}
            />
            {errors.age && <p>{errors.age.message}</p>}
          </div>
          <div className="input-field">
            <label>password</label>
            <input
              type='password'
              {...register('password', {
                required: 'password is required',
                
                
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div className="input-field">
            <label>c password</label>
            <input
              type='text'
              {...register('cnf', {
                validate:(value)=> value===password || 'done'
                
                
              })}
            />
           
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

     





    </>
  )
}

export default Register
