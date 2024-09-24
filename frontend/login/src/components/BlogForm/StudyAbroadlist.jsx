import React from 'react';
import { Link } from 'react-router-dom';
import './StudyAbroadlist.css';

const StudyAbroadlist = ({ blogs, onDelete }) => {
  return (
    <div className="blog-list-container">
      <h1>Blog List</h1>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-item">
          <h3>{blog.schoolTitle} ({blog.country})</h3>
          <iframe width="320" height="240" src={blog.videoLink} title="Video" />
          <button onClick={() => onDelete(blog.id)}>Delete</button>
          <Link to={`/edit/${blog.id}`}>
            <button>Edit</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default StudyAbroadlist;
