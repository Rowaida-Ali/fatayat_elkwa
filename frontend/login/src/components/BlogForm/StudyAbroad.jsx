import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './EditBlog.css'; 

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [error, setError] = useState('');
  
  // State variables for the form
  const [blog, setBlog] = useState('');
  const [country, setCountry] = useState('');
  const [resources, setResources] = useState('');
  const [title, setTitle] = useState('');
  const [university, setUniversity] = useState('');
  // const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3003/view_my_blogs');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMyBlogs(data);
      } catch (error) {
        console.error('Error fetching my blogs:', error);
        // setError('Failed to load your blogs. Please try again later.');
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

  const handleAddBlog = async (e) => {
    e.preventDefault(); // Prevent default form submission
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
        setMyBlogs((prevBlogs) => [...prevBlogs, data]);
        // Reset form fields
        setBlog('');
        setCountry('');
        setResources('');
        setUniversity('');
        setTitle('');
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
