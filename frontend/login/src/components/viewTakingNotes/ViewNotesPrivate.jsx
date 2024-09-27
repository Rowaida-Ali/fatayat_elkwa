import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
///import './EditBlog'; 

const ViewTakingNotes= () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');


  useEffect(() => {
    

    fetchMyNotes();
  }, []);
  const fetchMyNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3003/get_private_notes', {
        method:`GET`,
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const jsonArray=JSON.parse(data)
      setNotes(jsonArray);
    } catch (error) {
      console.error('Error fetching my blogs:', error);
      setError('Failed to load your notes. Please try again later.');
    }
  };
   const HandleDeleteNote = async (title) => {
     try {
       const token = localStorage.getItem('token');
       const response = await fetch(`http://localhost:3003/remove_note`, {
         method: 'DELETE',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`,
         },
         body: JSON.stringify({ title }),
       });

       if (response.ok) {
        
        //  setNotes((prevBlogs) => prevBlogs.filter(blog => blog.id !== id));
       } else {
         throw new Error('Failed to delete blog');
       }
     } catch (error) {
       console.error('Error deleting blog:', error);
       setError('Failed to delete blog. Please try again later.');
     }
   };

   const HandleEditeNote = async (title) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3003/edit_note`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
       fetchMyNotes()
       //  setNotes((prevBlogs) => prevBlogs.filter(blog => blog.id !== id));
      } else {
        throw new Error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      setError('Failed to delete blog. Please try again later.');
    }
  };


  return (
    <div>
      <h1>View Taking Notes</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="mynotes">
        {notes.map((note) => (
          <div key={note.id} className="note-items">
            <button onClick={HandleDeleteNote(note.title)}>Delete</button>
            <link to={`/editnotes`}>
            <button onClick={HandleEditeNote(note.title)}>Edit</button>
            </link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTakingNotes;