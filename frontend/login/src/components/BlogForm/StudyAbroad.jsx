import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './StudyAbroad.css';

const StudyAbroad = () => {
  const [blogs, setBlogs] = useState([]);
  const [country, setCountry] = useState('');
  const [schoolTitle, setSchoolTitle] = useState('');
  const [videoLink, setVideoLink] = useState('');

  const handleAddBlog = () => {
    if (country && schoolTitle && videoLink) {
      const newBlog = { id: blogs.length + 1, country, schoolTitle, videoLink };
      setBlogs([...blogs, newBlog]);
      setCountry('');
      setSchoolTitle('');
      setVideoLink('');
    }
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  return (
    <div className="study-abroad-container">
      <h1>Study Abroad</h1>
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
        <input
          type="text"
          placeholder="Video Link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
        <button onClick={handleAddBlog}>Add Blog</button>
      </div>
      <Link to="/blog-list">
        <button className="view-more">View More</button>
      </Link>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h3>{blog.schoolTitle} ({blog.country})</h3>
            <iframe width="320" height="240" src={blog.videoLink} title="Video" />
            <button onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyAbroad;
