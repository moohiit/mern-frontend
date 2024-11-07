import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../redux/usersSlice.js';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Fetch all users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user/users');  // Adjust the endpoint accordingly
        if (response.data.success) {
          console.log(response.data.users);
          dispatch(setUsers(response.data.users));  // Ensure this is an array
        }
      } catch (error) {
        console.log('Error fetching users:', error.response?.data?.message);
      }
    };
    fetchUsers();
  }, [dispatch]);
  const users = useSelector((state) => state.users.users);  // Default to an empty array if users is undefined or not set yet
  console.log(users)

  // Handle view profile
  const handleProfile = (id) => {
    navigate(`/profile/${id}`);  // Navigate to user profile page
  };

  // Handle edit user
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);  // Navigate to edit page
  };

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/user/delete/${id}`);  // Adjust the endpoint accordingly
      if (response.data.success) {
        dispatch(setUsers(users.filter((user) => user._id !== id)));  // Update the list after deletion
        alert('User deleted successfully');
      }
    } catch (error) {
      console.log('Error deleting user:', error.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Users List</h1>
      <table className="min-w-full bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-700">Full Name</th>
            <th className="px-4 py-2 border-b border-gray-700">Email</th>
            <th className="px-4 py-2 border-b border-gray-700">Bio</th>
            <th className="px-4 py-2 border-b border-gray-700">Mobile</th>
            <th className="px-4 py-2 border-b border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length>0 && users?.map((user) => (
            <tr key={user._id}>
              <td className="px-4 py-2 border-b border-gray-700 text-center">{user.fullname}</td>
              <td className="px-4 py-2 border-b border-gray-700 text-center">{user.email}</td>
              <td className="px-4 py-2 border-b border-gray-700 text-center">{user.bio}</td>
              <td className="px-4 py-2 border-b border-gray-700 text-center">{user.mobile}</td>
              <td className="px-4 py-2 border-b border-gray-700 text-center">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() => handleProfile(user._id)}
                >
                  Get Profile
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
