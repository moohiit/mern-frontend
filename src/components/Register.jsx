import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post('/api/user/register', data, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log(response);
      if (response.data.success) {
        navigate('/login');  // Redirect to login after successful registration
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
          <label className="text-lg">Fullname:</label>
          <input
            type="text"
            className="p-2 border border-gray-500 rounded-md"
            placeholder='Fullname'
            {...register('fullname', { required: 'Fullname is required' })}
          />
          {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}

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
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <center>
            <button className='bg-green-400 w-full rounded px-2 py-1 text-center' type='submit'>
              Register
            </button>
          </center>

          <div className='text-center mt-4'>
            <p>
              Already have an account?{' '}
              <Link to='/login' className='text-green-400 underline'>
                Login here
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
