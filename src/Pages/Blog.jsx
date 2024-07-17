import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const dummyBlogs = [
  { id: 1, title: 'Blog Post 1', excerpt: 'This is the excerpt for blog post 1.', image: 'https://via.placeholder.com/400x250' },
  { id: 2, title: 'Blog Post 2', excerpt: 'This is the excerpt for blog post 2.', image: 'https://via.placeholder.com/400x250' },
  { id: 3, title: 'Blog Post 3', excerpt: 'This is the excerpt for blog post 3.', image: 'https://via.placeholder.com/400x250' },
  { id: 4, title: 'Blog Post 4', excerpt: 'This is the excerpt for blog post 4.', image: 'https://via.placeholder.com/400x250' },
  { id: 5, title: 'Blog Post 5', excerpt: 'This is the excerpt for blog post 5.', image: 'https://via.placeholder.com/400x250' },
  { id: 6, title: 'Blog Post 6', excerpt: 'This is the excerpt for blog post 6.', image: 'https://via.placeholder.com/400x250' },
  { id: 7, title: 'Blog Post 7', excerpt: 'This is the excerpt for blog post 7.', image: 'https://via.placeholder.com/400x250' },
  { id: 8, title: 'Blog Post 8', excerpt: 'This is the excerpt for blog post 8.', image: 'https://via.placeholder.com/400x250' },
];

const itemsPerPage = 6;

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dummyBlogs.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentBlogs = dummyBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl md:text-4xl font-bold text-primary-color mb-8 text-center">Blog Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBlogs.map((blog) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
          >
            <Link to={`/blog/${blog.id}`} className="block mb-4">
              <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg" />
            </Link>
            <h2 className="text-2xl font-semibold text-primary-color mb-3">
              <Link to={`/blog/${blog.id}`} className="hover:underline">
                {blog.title}
              </Link>
            </h2>
            <p className="text-gray-600">{blog.excerpt}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ease-in-out ${
                    currentPage === index + 1
                      ? 'bg-primary-color text-white'
                      : 'bg-white text-primary-color border border-primary-color hover:bg-primary-color hover:text-white'
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BlogPage;
