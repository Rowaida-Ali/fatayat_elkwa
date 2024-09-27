import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './EditBlog.css';

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    blog: '',
    country: '',
    university: '',
    title: ''
  });

  const handleAddBlog = (e) => {
    e.preventDefault();
    const { blog, country, university, title } = formData;

    if (blog && country && university && title) {
      setMyBlogs((prevBlogs) => [...prevBlogs, { blog, country, university, title }]);
      setFormData({ blog: '', country: '', university: '', title: '' });
    } else {
      setError('Please fill in all required fields.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditBlog = (title) => {
    const blogToEdit = myBlogs.find(b => b.title === title);
    if (blogToEdit) {
      setFormData(blogToEdit);
    }
  };

  return (
    <div>
      <h1>My Blogs</h1>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleAddBlog}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />
        <textarea name="blog" value={formData.blog} onChange={handleChange} placeholder="Write your post here..." required />
        <input type="text" name="university" value={formData.university} onChange={handleChange} placeholder="University" required />
        <button type="submit">Add Blog</button>
      </form>

      <div className="blog-list">
        {myBlogs.map((blog) => (
          <div key={blog.title} className="blog-item">
            <h3>{blog.title} ({blog.country})</h3>
            <p>{blog.blog}</p>
            <p>University: {blog.university}</p>
            <Link to={`/edit/${blog.title}`}>
              <button onClick={() => handleEditBlog(blog.title)}>Edit</button>
            </Link>
          </div>
        ))}
      </div>

      <EditBlog myBlogs={myBlogs} setMyBlogs={setMyBlogs} />
    </div>
  );
};

const EditBlog = ({ myBlogs, setMyBlogs }) => {
  const { title } = useParams();
  const blogToEdit = myBlogs.find(blog => blog.title === title);
  
  const [editData, setEditData] = useState(blogToEdit || { blog: '', country: '', university: '', title: '' });

  const handleUpdateBlog = (e) => {
    e.preventDefault();
    const updatedBlogs = myBlogs.map(blog => blog.title === editData.title ? editData : blog);
    setMyBlogs(updatedBlogs);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (!blogToEdit) {
    return <p>Blog not found.</p>;
  }

  return (
    <form onSubmit={handleUpdateBlog}>
      <input type="text" name="title" value={editData.title} onChange={handleEditChange} required />
      <input type="text" name="country" value={editData.country} onChange={handleEditChange} required />
      <textarea name="blog" value={editData.blog} onChange={handleEditChange} required />
      <input type="text" name="university" value={editData.university} onChange={handleEditChange} required />
      <button type="submit">Update Blog</button>
    </form>
  );
};

export default MyBlogs;
