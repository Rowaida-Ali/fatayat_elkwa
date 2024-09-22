import React, { useState } from 'react';
import BlogForm from './BlogForm';
import BlogList from './BlogList';

const BlogManager = () => {
    const [blogs, setBlogs] = useState([]);

    const addBlog = (newBlog) => {
        setBlogs([...blogs, newBlog]);
    };

    const removeBlog = async (index) => {
        const blogToRemove = blogs[index];

        try {
            const response = await fetch(`http://localhost:3003/delete_blog}`, {
                method: 'DELETE',
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

    return (
        <div>
            <h1>Study Abroad</h1>
            <BlogForm addBlog={addBlog} />
            <BlogList blogs={blogs} removeBlog={removeBlog} />
        </div>
    );
};

export default BlogManager;
