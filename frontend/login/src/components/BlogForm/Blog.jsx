import React from 'react';

const Blog = ({ blog }) => {
  return (
    <div className="blog-item">
      <h3>{blog.university} ({blog.country})</h3>
      <p><strong>Submitted by:</strong> {blog.username}</p>
      <p>{blog.textPost}</p>
      <p>Resource: {blog.resource}</p>
    </div>
  );
};

export default Blog;
