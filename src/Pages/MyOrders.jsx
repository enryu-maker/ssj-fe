import React from 'react'
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/Auth/authSlice';

const MyOrders = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if(!isAuthenticated){
        return <div>You are not authorized</div>
    }

  return (
    <div>MyOrders</div>
  )
}

export default MyOrders