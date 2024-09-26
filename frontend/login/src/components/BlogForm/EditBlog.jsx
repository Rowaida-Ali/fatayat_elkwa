import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditBlog.css';

const EditBlog = ({ blog, onUpdate }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [country, setCountry] = useState(blog.country || '');
  const [schoolTitle, setSchoolTitle] = useState(blog.schoolTitle || '');
  const [videoLink, setVideoLink] = useState(blog.videoLink || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!blog) {
      navigate('/blog-list'); 
    }
  }, [blog, navigate]);

  const handleUpdateBlog = async () => {
    const updatedBlog = { id: parseInt(id), country, schoolTitle, videoLink };
    
    try {
      const response = await fetch('http://localhost:3003/edit_blogs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog),
      });

      if (response.ok) {
        const data = await response.json();
        onUpdate(data); 
        navigate('/blog-list');
      } else {
        throw new Error('Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      setError('Failed to update blog. Please try again later.');
    }
  };

  return (
    <div className="edit-blog-container">
      <h1>Edit Blog</h1>
      {error && <p className="error-message">{error}</p>}
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
      <input
        type="text"
        placeholder="Video Link"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
      />
      <button onClick={handleUpdateBlog}>Update Blog</button>
    </div>
  );
};

export default EditBlog;
