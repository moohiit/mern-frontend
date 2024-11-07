import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice.js';


function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('/api/user/login', data);
      if (response.data.success) {
        //dispatch here
        const userId = response.data.user._id
        console.log(userId);
        dispatch(setUser(userId));
        navigate('/');  // Redirect to home page after login
      } else {
        alert(response.data.message);  // Show error message
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='w-full h-screen bg-slate-900 text-white flex justify-center items-center'>
      <form className='w-96 bg-slate-800 p-10 rounded-lg' onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <label className="text-lg">Email:</label>
          <input
            type="email"
            className="p-2 border border-gray-500 rounded-md"
            placeholder='Email'
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <label className="text-lg">Password:</label>
          <input
            type="password"
            className="p-2 border border-gray-500 rounded-md"
            placeholder='Password'
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <center>
            <button className='bg-green-400 w-full rounded px-2 py-1 text-center' type='submit'>
              Login
            </button>
          </center>

          <div className='text-center mt-4'>
            <p>
              Don't have an account?{' '}
              <Link to='/register' className='text-green-400 underline'>
                Register here
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
