import React from "react";
import BlogItem from "./BlogItem.jsx";

const BlogList = ({ blogs, removeBlog, editBlog }) => {
  return (
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <BlogItem
            key={index}
            blog={blog}
            removeBlog={removeBlog}
            editBlog={editBlog}
          />
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default BlogList;