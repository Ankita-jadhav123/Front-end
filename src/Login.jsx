



import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

function Loader() {
  return <div className="loader">Loading...</div>;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password');
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get('app-user')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post('https://nodemon-black.vercel.app/Login', data);
      const resData = res.data;
      setLoading(false);

      if (resData.status) {
        toast.success('Login successful');
        Cookies.set('app-user', data.userName, { expires: 7 });
        navigate('/dashboard');
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: '',
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />

      {isLoading && <Loader />}

      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>LOGIN</h2>

          <div className="input-field">
            <label>userName</label>
            <input
              type="email"
              {...register('userName', {
                required: 'userName is required.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.userName && <p className="error">{errors.userName.message}</p>}
          </div>

          <div className="input-field">
            <label>Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'password is required.',
              })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          <button type="submit">Login</button>

          <p>
            <NavLink to="/register">Register Here</NavLink>
            <NavLink to="/forgot">Forgot password</NavLink>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
