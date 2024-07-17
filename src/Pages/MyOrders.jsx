import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchOrders, selectOrders, selectOrdersError, selectOrdersLoading } from '../features/orders/orderSlice';
import { selectIsAuthenticated } from '../features/Auth/authSlice';

const MyOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <div>You are not authorized</div>;
  }

  // Handle pagination
  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleShowLess = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Calculate the orders to be displayed
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders?.results?.slice(indexOfFirstOrder, indexOfLastOrder) || [];

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

      {!loading && !error && currentOrders.length === 0 && (
        <div className="text-center">
          <p className="mb-4">You have no orders yet.</p>
          <Link to="/products">
            <button className="bg-blue-500 text-white py-3 px-6 text-lg rounded hover:bg-blue-600 transition duration-300">
              Explore Products
            </button>
          </Link>
        </div>
      )}

      {!loading && !error && currentOrders.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {currentOrders.map((order) => (
            <motion.div 
              key={order.transaction_id} 
              className="bg-white rounded-lg shadow-md p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-2">Order #{order.transaction_id}</h3>

              {order.items.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col sm:flex-row items-center justify-between border-b pb-2 mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <div className="flex-shrink-0 w-16 h-16">
                    {/* src={item.product.product_image[0]?.images ? `https://api.saishraddhajewellers.com$item.product.product_image[0]?.images` : ""} */}
                      <img 
                       src={item.product.product_image[0]?.images ? `https://api.saishraddhajewellers.com$item.product.product_image[0]?.images` : ""}
                        alt={item.product.product_name} 
                        className="w-full h-full rounded-md object-cover" 
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold">{item.product.product_name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-lg font-semibold">Total Price: ₹ {item.size_chart.total_price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 justify-end mt-4 sm:mt-0">
                    <Link to={`/order/${order.transaction_id}`} className="text-blue-500 hover:text-blue-700">
                      View Details
                    </Link>
                    <motion.button
                      // onClick={() => handleCancelOrder(order.transaction_id)} // Implement cancel order functionality
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

              <div className="mt-4">
                <p className="text-lg font-semibold">Delivery Address:</p>
                <p>{order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}</p>
                <p className="mt-2"><span className="font-semibold">Contact:</span> {order.contact_details.name}, {order.contact_details.contact_number}, {order.contact_details.email}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && !error && (
        <div className="flex justify-center mt-4 space-x-4">
          {currentPage > 1 && (
            <motion.button 
              onClick={handleShowLess} 
              className="bg-primary-color text-white py-3 px-6 text-lg rounded hover:bg-red-900 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Previous
            </motion.button>
          )}
          {orders?.results?.length > currentPage * ordersPerPage && (
            <motion.button 
              onClick={handleShowMore} 
              className="bg-primary-color text-white py-3 px-6 text-lg rounded hover:bg-red-900 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default MyOrders;
