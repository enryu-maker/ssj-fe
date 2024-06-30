import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { selectIsAuthenticated } from '../features/Auth/authSlice';
import { fetchOrders, selectOrders, selectOrdersError, selectOrdersLoading } from '../features/Products/Orders/orderSlice';
import { motion } from 'framer-motion';

const MyOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <div>You are not authorized</div>;
  }

  return (
    <motion.div 
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-semibold mb-6">My Orders</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <div className="text-center">
          <p className="mb-4">You have no orders yet.</p>
          <Link to="/products">
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Explore Products
            </button>
          </Link>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {orders?.map((order) => (
            <motion.div 
              key={order.id} 
              className="bg-white rounded-lg shadow-md p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-2">Order #{order.id}</h3>
              {order?.items?.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="flex flex-col sm:flex-row items-center justify-between border-b pb-2 mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <div className="flex-shrink-0 w-16 h-16">
                      <img src={item.image} alt={item.name} className="w-full h-full rounded-md object-cover" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Total Quantity: {order.items.length}</p>
                      <p className="text-lg font-semibold">Total Price: ₹ {item.size_chart[0].total_price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 justify-end mt-4 sm:mt-0">
                    <Link to={`/order/${order.id}`} className="text-blue-500 hover:text-blue-700">
                      View Details
                    </Link>
                    <motion.button
                      // onClick={() => handleCancelOrder(order.id)} // Implement cancel order functionality
                      className="flex items-center text-sm text-red-600 hover:text-red-700 focus:outline-none"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <RiDeleteBin6Line />
                      <span className="ml-1">Cancel Order</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyOrders;
