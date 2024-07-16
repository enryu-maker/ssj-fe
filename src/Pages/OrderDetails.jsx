import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchOrderById, selectOrders, selectOrdersError, selectOrdersLoading } from '../features/orders/orderSlice';


const OrderDetails = () => {
  const { transactionId } = useParams();
  const dispatch = useDispatch();
  const order = useSelector(selectOrders);
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(fetchOrderById(transactionId));
  }, [dispatch, transactionId]);

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-semibold mb-6">Order Details</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && order && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">Order #{order.transaction_id}</h3>
          {order.items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center justify-between border-b pb-2 mb-2">
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="flex-shrink-0 w-16 h-16">
                  <img src={item.product.product_image[0].images} alt={item.product.product_name} className="w-full h-full rounded-md object-cover" />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold">{item.product.product_name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-lg font-semibold">Total Price: ₹ {item.size_chart.total_price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OrderDetails;
