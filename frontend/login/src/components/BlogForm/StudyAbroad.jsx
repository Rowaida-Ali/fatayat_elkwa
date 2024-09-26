import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StudyAbroad.css';

const StudyAbroad = () => {
  const [blogs, setBlogs] = useState([]);
  const [country, setCountry] = useState('');
  const [schoolTitle, setSchoolTitle] = useState('');
  const [textPost, setTextPost] = useState('');
  const [university, setUniversity] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:3003/view_all_blogs');
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
    if (country && schoolTitle && textPost && university && username) {
      const newBlog = { country, schoolTitle, textPost, university, username }; 
      try {
        const response = await fetch('http://localhost:3003/add_blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBlog),
        });

        if (response.ok) {
          const addedBlog = await response.json();
          setBlogs((prevBlogs) => [...prevBlogs, addedBlog]);
          setCountry('');
          setSchoolTitle('');
          setTextPost('');
          setUniversity('');
          setUsername('');
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
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="School Title"
          value={schoolTitle}
          onChange={(e) => setSchoolTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your post here..."
          value={textPost}
          onChange={(e) => setTextPost(e.target.value)}
        />
        <input
          type="text"
          placeholder="University"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
            <h3>{blog.schoolTitle} ({blog.country})</h3>
            <p>{blog.textPost}</p>
            <p>University: {blog.university}</p>
            <p>Submitted by: {blog.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyAbroad;
