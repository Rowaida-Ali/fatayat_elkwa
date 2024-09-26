import React from 'react';
import './StudyAbroadlist.css';

const StudyAbroadlist = ({ blogs }) => {
  return (
    <div className="blog-list-container">
      <h1>Blog List</h1>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h3>{blog.schoolTitle} ({blog.country})</h3>
            <iframe width="320" height="240" src={blog.videoLink} title="Video" />
          </div>
        ))
      )}
    </div>
  );
};

export default StudyAbroadlist;
