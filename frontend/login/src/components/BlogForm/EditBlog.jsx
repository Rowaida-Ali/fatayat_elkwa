import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditBlog.css';

const EditBlog = ({ blogs, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find(blog => blog.id === parseInt(id));

  const [country, setCountry] = useState(blog.country);
  const [schoolTitle, setSchoolTitle] = useState(blog.schoolTitle);
  const [videoLink, setVideoLink] = useState(blog.videoLink);

  const handleUpdateBlog = () => {
    onUpdate({ id: blog.id, country, schoolTitle, videoLink });
    navigate('/blog-list')
  };

  return (
    <div className="edit-blog-container">
      <h1>Edit Blog</h1>
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
