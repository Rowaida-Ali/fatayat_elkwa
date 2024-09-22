import React from "react";

const BlogItem = ({ blog, removeBlog, index }) => {
  return (
    <div className="blog-item">
      <h2>{blog.blog}</h2>
      <p>University: {blog.university}</p>
      <p>Country: {blog.country}</p>
      <p>Username: {blog.username}</p>
      <button onClick={() => removeBlog(index)}>Remove</button>
    </div>
  );
};

export default BlogItem;
