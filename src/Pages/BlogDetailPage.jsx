import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import api from "../helper/AxiosInstance"; // import your Axios instance
import "react-quill/dist/quill.bubble.css"; // import styles for React Quill bubble theme

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/web/blog/${slug}/`);
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return <p className="text-center text-primary-color">Loading...</p>;
  }

  if (!blog) {
    return (
      <p className="text-center text-primary-color">Blog post not found!</p>
    );
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
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="bg-white p-6 rounded-b-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-color mb-4">
            {blog.title}
          </h1>
          <ReactQuill value={blog.content} readOnly={true} theme="bubble" />
        </div>
      </motion.div>
    </div>
  );
};

export default BlogDetailPage;
