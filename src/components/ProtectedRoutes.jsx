import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const userId = useSelector((state) => state.user?.userId);  // Default to an empty object if store.user is undefined
  console.log(userId);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId,navigate])
  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoutes
