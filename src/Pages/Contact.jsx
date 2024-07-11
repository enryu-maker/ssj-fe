import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../helper/AxiosInstance';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone_number: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/web/contact/', form);

      if (response.status === 201) {
        toast.success("Form submitted successfully!", {
          position: "bottom-left",
        });
        setForm({ name: '', email: '', phone_number: '', message: '' }); // Clear the form
      } else {
        throw new Error(`Unexpected response code: ${response.status}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`, {
        position: "bottom-left",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className='flex flex-col gap-5 justify-center items-center mt-5 font-Raleway'>
      <ToastContainer />
      <motion.h1 
        className='text-4xl text-primary-color font-semibold relative overflow-hidden'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='block relative'
        >
          Help & Contact
        </motion.span>
        <span className='absolute inset-0 bg-gradient-to-r from-transparent to-primary-color opacity-20'></span>
      </motion.h1>
      <motion.form 
        className='flex flex-col gap-5 items-start p-5 w-[80vw] bg-zinc-50 rounded-lg shadow-md'
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        onSubmit={handleSubmit}
      >
        <motion.label className='flex flex-col gap-2 w-full' variants={itemVariants}>
          <span className='text-lg font-medium'>Name</span>
          <input 
            type='text' 
            name='name'
            value={form.name}
            onChange={handleChange}
            className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color' 
          />
        </motion.label>
        <motion.label className='flex flex-col gap-2 w-full' variants={itemVariants}>
          <span className='text-lg font-medium'>Email</span>
          <input 
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color' 
          />
        </motion.label>
        <motion.label className='flex flex-col gap-2 w-full' variants={itemVariants}>
          <span className='text-lg font-medium'>Phone Number</span>
          <input 
            type='tel'
            name='phone_number'
            value={form.phone_number}
            onChange={handleChange}
            className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color' 
          />
        </motion.label>
        <motion.label className='flex flex-col gap-2 w-full' variants={itemVariants}>
          <span className='text-lg font-medium'>Message</span>
          <textarea 
            name='message'
            value={form.message}
            onChange={handleChange}
            className='p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-primary-color' 
          />
        </motion.label>
        <motion.button 
          className='mt-5 px-5 py-2 bg-primary-color text-white rounded-md shadow-lg'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Contact;
