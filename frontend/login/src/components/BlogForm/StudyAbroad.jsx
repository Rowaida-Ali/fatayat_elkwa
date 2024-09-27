import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EditBlog.css'; 

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([
    { id: 1, title: 'First Blog', country: 'USA', blog: 'This is the first blog.', university: 'Harvard', resources: 'N/A' },
    { id: 2, title: 'Second Blog', country: 'UK', blog: 'This is the second blog.', university: 'Oxford', resources: 'N/A' }
  ]);
  
  const [error, setError] = useState('');
  
  const [blog, setBlog] = useState('');
  const [country, setCountry] = useState('');
  const [resources, setResources] = useState('');
  const [title, setTitle] = useState('');
  const [university, setUniversity] = useState('');

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

  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (blog && country && university && resources && title) {
      const newBlog = { blog, country, university, resources, title }; 
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3003/add_blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(newBlog),
        });

        const data = await response.json();
        if (response.ok) {
          setMyBlogs((prevBlogs) => [...prevBlogs, data]);
  
          setBlog('');
          setCountry('');
          setResources('');
          setUniversity('');
          setTitle('');
        } else {
          setError('Failed to add blog. Please try again later.');
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
    <div>
      <h1>My Blogs</h1>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleAddBlog}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          required
        />
        <textarea
          value={blog}
          onChange={(e) => setBlog(e.target.value)}
          placeholder="Write your post here..."
          required
        />
        <input
          type="text"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          placeholder="University"
          required
        />
        <input
          type="text"
          value={resources}
          onChange={(e) => setResources(e.target.value)}
          placeholder="Resources"
        />
        <button type="submit">Add Blog</button>
      </form>

      <div className="blog-list">
        {myBlogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h3>{blog.title} ({blog.country})</h3>
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
