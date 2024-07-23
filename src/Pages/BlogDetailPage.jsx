import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import api from "../helper/AxiosInstance"; // Import your Axios instance
// import "./custom-quill-content.css"; // Import custom styles

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

  // Function to render different content types
  const renderContent = (content) => {
    let updatedContent = content;

    // Example regex patterns to detect and replace content
    const mapPattern =
      /<a href="(https:\/\/www\.google\.com\/maps\/embed\?pb=.*?)">Map<\/a>/g; // Updated pattern for embed URLs
    const imagePattern = /<img src="(.*?)" alt="(.*?)" \/>/g;
    const videoPattern =
      /<a href="(https:\/\/www\.youtube\.com\/watch\?v=.*?)">Video<\/a>/g;

    // Replace patterns with HTML elements
    updatedContent = updatedContent.replace(
      mapPattern,
      (match, url) => `
      <div class="map-container">
        <iframe
          src="${url}"
          width="100%"
          height="400"
          frameborder="0"
          allowfullscreen
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </div>
    `
    );

    updatedContent = updatedContent.replace(
      imagePattern,
      (match, src, alt) => `
      <div class="image-container">
        <img src="${src}" alt="${alt}" class="w-full h-auto object-cover rounded-lg mb-4" />
      </div>
    `
    );

    updatedContent = updatedContent.replace(
      videoPattern,
      (match, url) => `
      <div class="video-container">
        <iframe
          src="${url}"
          width="100%"
          height="315"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    `
    );

    return updatedContent;
  };

  if (loading) {
    return <p className="text-center text-primary-color">Loading...</p>;
  }

  if (!blog) {
    return (
      <p className="text-center text-primary-color">Blog post not found!</p>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-100">
      <div className="mx-auto max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-color mb-4">
            {blog.title}
          </h1>
          <ReactQuill
            value={renderContent(blog.description)}
            readOnly={true}
            theme="bubble"
            className="custom-quill-content"
            modules={{ toolbar: false }} // Disable toolbar
          />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
