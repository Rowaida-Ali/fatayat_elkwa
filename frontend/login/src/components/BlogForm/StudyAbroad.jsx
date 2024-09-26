import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StudyAbroad.css';

const StudyAbroad = () => {
  const [blogs, setBlogs] = useState([]);
  const [country, setCountry] = useState('');
  const [textPost, setTextPost] = useState('');
  const [university, setUniversity] = useState('');
  const [resource, setResource] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3003/view_all_blogs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blogs. Please try again later.');
    }
  };

  const handleAddBlog = async () => {
    if (country && textPost && university && resource && username) {
      const newBlog = { country, textPost, university, resource, username };
      try {
        const response = await fetch('http://localhost:3003/add_blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBlog),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.access_token);
          setBlogs((prevBlogs) => [...prevBlogs, data]);
          setCountry('');
          setTextPost('');
          setUniversity('');
          setResource('');
          setUsername('');
          navigate('/blog-list');
        } else {
          throw new Error('Failed to add blog');
        }
      } catch (error) {
        console.error('Error adding blog:', error);
        setError('Failed to add blog. Please try again later.');
      }
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div className="study-abroad-container">
      <h1>Study Abroad</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <p className="input-description">Username.</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <p className="input-description">Country.</p>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        
        <p className="input-description">Blog.</p>
        <textarea
          placeholder="Write your post here..."
          value={textPost}
          onChange={(e) => setTextPost(e.target.value)}
        />

        <p className="input-description">University.</p>
        <input
          type="text"
          placeholder="University"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        />
        
        <p className="input-description">Resources.</p>
        <input
          type="text"
          placeholder="Resource"
          value={resource}
          onChange={(e) => setResource(e.target.value)}
        />

        <button onClick={handleAddBlog}>Add Blog</button>
      </div>
      <div>
        <Link to="/my-blogs">
          <button className="view-my-blogs">View My Blogs</button>
        </Link>
        <Link to="/blog-list">
          <button className="view-more">View More</button>
        </Link>
      </div>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h3>{blog.university} ({blog.country})</h3>
            <p><strong>Submitted by:</strong> {blog.username}</p> 
            <p>{blog.textPost}</p>
            <p>Resource: {blog.resource}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyAbroad;
