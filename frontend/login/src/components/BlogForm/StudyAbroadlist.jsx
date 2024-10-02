import React, { useState, useEffect } from 'react';
import './StudyAbroadlist.css';

const StudyAbroadlist = ({ blogs }) => {
  const [fetchedBlogs, setFetchedBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3003/view_all_blogs');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        if (data.access_token) {
            localStorage.setItem('token', data.access_token);
        }
        setFetchedBlogs(data);
        console.log(data)
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        setError('Failed to load blogs. Please try again later.');
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-list-container">
      <h1>Blog List</h1>
      {error && <p className="error-message">{error}</p>}
      {fetchedBlogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        fetchedBlogs.map((blog) => (
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
