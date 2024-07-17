import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const dummyBlogs = [
  { id: 1, title: 'Blog Post 1', content: 'Detailed content for blog post 1.', image: 'https://via.placeholder.com/800x400' },
  { id: 2, title: 'Blog Post 2', content: 'Detailed content for blog post 2.', image: 'https://via.placeholder.com/800x400' },
  { id: 3, title: 'Blog Post 3', content: 'Detailed content for blog post 3.', image: 'https://via.placeholder.com/800x400' },
  { id: 4, title: 'Blog Post 4', content: 'Detailed content for blog post 4.', image: 'https://via.placeholder.com/800x400' },
  { id: 5, title: 'Blog Post 5', content: 'Detailed content for blog post 5.', image: 'https://via.placeholder.com/800x400' },
  { id: 6, title: 'Blog Post 6', content: 'Detailed content for blog post 6.', image: 'https://via.placeholder.com/800x400' },
  { id: 7, title: 'Blog Post 7', content: 'Detailed content for blog post 7.', image: 'https://via.placeholder.com/800x400' },
  { id: 8, title: 'Blog Post 8', content: 'Detailed content for blog post 8.', image: 'https://via.placeholder.com/800x400' },
];

const BlogDetailPage = () => {
  const { id } = useParams();
  const blog = dummyBlogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <p className="text-center text-white">Blog post not found!</p>;
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl"
      >
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-t-lg"
        />
        <div className="bg-white p-6 rounded-b-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-color mb-4">
            {blog.title}
          </h1>
          <p className="text-gray-700 leading-relaxed">
            {blog.content}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogDetailPage;
