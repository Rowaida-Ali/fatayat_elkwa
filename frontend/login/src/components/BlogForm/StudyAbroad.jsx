import React, { useState } from "react";
import './BlogForm.css';

const BlogManager = () => {
    const [blogs, setBlogs] = useState([]);

    const addBlog = async (newBlog) => {
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
            } else {
                console.error('Failed to add the blog');
            }
        } catch (error) {
            console.error('Error while adding the blog:', error);
        }
    };

    const removeBlog = async (index) => {
        const blogToRemove = blogs[index];

        try {
            const response = await fetch(`http://localhost:3003/delete_blog`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogToRemove),
            });

            if (response.ok) {
                const updatedBlogs = blogs.filter((_, i) => i !== index);
                setBlogs(updatedBlogs);
            } else {
                console.error('Failed to delete the blog');
            }
        } catch (error) {
            console.error('Error while deleting the blog:', error);
        }
    };

    const BlogForm = () => {
        const [formData, setFormData] = useState({
            blog: "",
            university: "",
            country: "",
            username: "",
            resources: "",
        });

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            await addBlog(formData);
            setFormData({
                blog: "",
                university: "",
                country: "",
                username: "",
                resources: "",
            });
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="blog"
                    value={formData.blog}
                    onChange={handleChange}
                    placeholder="Blog Title"
                    required
                />
                <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    placeholder="University"
                    required
                />
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="url"
                    name="resources"
                    value={formData.resources}
                    onChange={handleChange}
                    placeholder="Resources URL"
                    required
                />
                <button type="submit">Add Blog</button>
            </form>
        );
    };

    const BlogItem = ({ blog, index }) => {
        return (
            <div className="blog-item">
                <h2>{blog.blog}</h2>
                <p>University: {blog.university}</p>
                <p>Country: {blog.country}</p>
                <p>Username: {blog.username}</p>
                <button onClick={() => removeBlog(index)}>Remove</button>
            </div>
        );
    };

    const BlogList = () => {
        return (
            <div>
                {blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                        <BlogItem key={index} blog={blog} index={index} />
                    ))
                ) : (
                    <p>No blogs available</p>
                )}
            </div>
        );
    };

    return (
        <div>
            <h1>Study Abroad</h1>
            <BlogForm />
            <BlogList />
        </div>
    );
};

export default BlogManager;
