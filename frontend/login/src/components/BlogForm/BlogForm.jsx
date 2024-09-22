import React, { useState } from "react";
import './BlogForm.css'; 

const BlogForm = ({ addBlog, onExplore }) => {
  const [formData, setFormData] = useState({
    blog: "",
    university: "",
    country: "",
    username: "",
    resources: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlog(formData);
    setFormData({
      blog: "",
      university: "",
      country: "",
      username: "",
      resources: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="blog"
        value={formData.blog}
        onChange={handleChange}
        placeholder="Blog Title"
        required
      />
      <input
        type="text"
        name="university"
        value={formData.university}
        onChange={handleChange}
        placeholder="University"
        required
      />
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Country"
        required
      />
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="url" 
        name="resources"
        value={formData.resources}
        onChange={handleChange}
        placeholder="Resources URL"
        required
      />
      <button type="submit">Add Blog</button>
      <button type="button" onClick={onExplore}>Explore</button> 
    </form>
  );
};

export default BlogForm;
