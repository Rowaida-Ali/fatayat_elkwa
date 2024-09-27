import React, { useState, useEffect } from 'react';
import './StudyAbroad.css';

const StudyAbroad = () => {
  const [title, setTitle] = useState('');
  const [blog, setBlog] = useState('');
  const [resources, setResources] = useState('');
  const [university, setUniversity] = useState('');
  const [blogs, setBlogs] = useState([]);

  const token = localStorage.getItem('token');

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:3003/view_tasks', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3003/add_blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, blog, resources, university })
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Study Abroad</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Blog" value={blog} onChange={(e) => setBlog(e.target.value)} required />
        <input placeholder="Resources" value={resources} onChange={(e) => setResources(e.target.value)} />
        <input placeholder="University" value={university} onChange={(e) => setUniversity(e.target.value)} />
        <button type="submit">Add Blog</button>
      </form>
      <button onClick={fetchBlogs}>View All Blogs</button>
      <button onClick={() => { window.location.href = '/myblog'; }}>My Blogs</button>
      <div>
        {blogs.map((b, index) => (
          <div key={index}>
            <h2>{b.title}</h2>
            <p>{b.blog}</p>
            <p>{b.resources}</p>
            <p>{b.university}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyAbroad;
