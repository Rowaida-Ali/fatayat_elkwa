import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import'./EditBlog'

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        
        const response = await fetch('http://localhost:3003/view_my_blogs');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMyBlogs(data);
      } catch (error) {
        console.error('Error fetching my blogs:', error);
        setError('Failed to load your blogs. Please try again later.');
      }
    };

    fetchMyBlogs();
  }, []);

  const handleDeleteBlog = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3003/remove_blog`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setMyBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== id));
      } else {
        throw new Error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      setError('Failed to delete blog. Please try again later.');
    }
  };

  return (
    <div>
      <h1>My Blogs</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="blog-list">
        {myBlogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h3>{blog.schoolTitle} ({blog.country})</h3>
            <iframe width="320" height="240" src={blog.videoLink} title="Video" />
            <button onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
            <Link to={`/edit/${blog.id}`}>
              <button>Edit</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
