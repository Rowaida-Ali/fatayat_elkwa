// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import './EditBlog.css';

// const EditBlog = ({ blog,  }) => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [country, setCountry] = useState(blog.country || '');
//   const [schoolTitle, setSchoolTitle] = useState(blog.schoolTitle || '');
//   const [videoLink, setVideoLink] = useState(blog.videoLink || '');
//   const [error, setError] = useState('');
//   const [task, setTasks] = useState([]);
//   const [taskTitleInput, setTaskTitleInput] = useState('');
//   const [taskInput, setTaskInput] = useState('');
//   const [editTaskTitle, setEditTaskTitle] = useState(null);
//   const [editInput, setEditInput] = useState('');

//   useEffect(() => {
//     if (!blog) {
//       navigate('/blog-list'); 
//     }
//   }, [blog, navigate]);

//   // const handleUpdateBlog = async () => {
//   //   const updatedBlog = { id: parseInt(id), country, schoolTitle, videoLink };
    
//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     const response = await fetch('http://localhost:3003/edit_blogs', {
//   //       method: 'PUT',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //         'Authorization': `Bearer ${token}`,
//   //       },
//   //       body: JSON.stringify(updatedBlog),
//   //     });

//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       onUpdate(data); 
//   //       navigate('/blog-list');
//   //     } else {
//   //       throw new Error('Failed to update blog');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error updating blog:', error);
//   //     setError('Failed to update blog. Please try again later.');
//   //   }
//   // };

//   const handleUpdateBlog = async () => {
//     if (editInput.trim()) {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch('http://localhost:3003/edit_blogs', {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' ,
//                            'Authorization': `Bearer ${token}`,
        
//                 },
//                 body: JSON.stringify({
//                     title: editTaskTitle, // Use title for the task being edited
//                     text: editInput
//                 }),
//             });
            
//             if (!response.ok) {
//                 console.error("Failed to update task:");
//                 return;
//             }
//             const updatedTask = await response.json();
//             setTasks(prevTasks => prevTasks.map(task => 
//                 task.title === editTaskTitle ? { ...task, text: updatedTask.text } : task
//             ));
//             setEditTaskTitle(''); // Clear the title used for editing
//             setEditInput('');
//         } catch (error) {
//             console.error('Failed to update task:', error);
//         }
//     } else {
//         alert('Please enter a task to save.');
//     }
// };

//   return (
//     <div className="edit-blog-container">
//       <h1>Edit Blog</h1>
//       {error && <p className="error-message">{error}</p>}
//       <input
//       />
//       <input
//         type="text"
//         placeholder="School Title"
//         value={schoolTitle}
//         onChange={(e) => setSchoolTitle(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Video Link"
//         value={videoLink}
//         onChange={(e) => setVideoLink(e.target.value)}
//       />
//       <button onClick={handleUpdateBlog}>Update Blog</button>
//     </div>
//   );
// };

// export default EditBlog;



// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import './EditBlog.css';

// const EditBlog = ({ blog }) => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [country, setCountry] = useState(blog.country || '');
//   const [schoolTitle, setSchoolTitle] = useState(blog.schoolTitle || '');
//   const [videoLink, setVideoLink] = useState(blog.videoLink || '');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!blog) {
//       navigate('/blog-list'); 
//     }
//   }, [blog, navigate]);

//   const handleUpdateBlog = async () => {
//     const updatedBlog = { id: parseInt(id), country, schoolTitle, videoLink };
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:3003/edit_blogs', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedBlog),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         navigate('/blog-list'); // Navigate back to the blog list
//       } else {
//         throw new Error('Failed to update blog');
//       }
//     } catch (error) {
//       console.error('Error updating blog:', error);
//       setError('Failed to update blog. Please try again later.');
//     }
//   };

//   return (
//     <div className="edit-blog-container">
//       <h1>Edit Blog</h1>
//       {error && <p className="error-message">{error}</p>}
//       <input
//         type="text"
//         placeholder="Country"
//         value={country}
//         onChange={(e) => setCountry(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="School Title"
//         value={schoolTitle}
//         onChange={(e) => setSchoolTitle(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Video Link"
//         value={videoLink}
//         onChange={(e) => setVideoLink(e.target.value)}
//       />
//       <button onClick={handleUpdateBlog}>Update Blog</button>
//     </div>
//   );
// };

// export default EditBlog;



import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditBlog.css';

const EditBlog = ({ blog }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [country, setCountry] = useState(blog?.country || '');
  const [schoolTitle, setSchoolTitle] = useState(blog?.schoolTitle || '');
  const [videoLink, setVideoLink] = useState(blog?.videoLink || '');
  const [error, setError] = useState('');

  // useEffect(() => {
  //   if (!blog) {
  //     navigate('/blog-list'); // Redirect if blog is not available
  //   }
  // }, [blog, navigate]);

  const handleUpdateBlog = async () => {
    const updatedBlog = { id: parseInt(id), country, schoolTitle, videoLink };
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3003/edit_blogs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBlog),
      });

      // if (response.ok) {
      //   navigate('/blog-list'); // Navigate back to the blog list after updating
      // } else {
      //   throw new Error('Failed to update blog');
      // }
    } catch (error) {
      console.error('Error updating blog:', error);
      setError('Failed to update blog. Please try again later.');
    }
  };

  // Prevent rendering if `blog` is undefined
  if (!blog) {
    return <p>Loading blog data...</p>;
  }

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

