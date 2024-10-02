import React, { useEffect, useState } from 'react';
import './NoteTaker.css';
// import './App.css';


const CreateNote = () => {
  const [title, setName] = useState('');
  const [note, setNote] = useState('');
  const [secret, setSecret]=useState(true);
  const [error, setError] = useState('');
  const [mynotes,setMyNotes]=useState([])
  const [allnotes,setAllNotes]=useState([])
  const handleCheckboxChange = () => {
    setSecret(!secret);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3003/take_note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, note ,secret}),
      });
      const data = await response.json();
      console.log(data)
      console.log(JSON.stringify({ title,note ,secret}))
      setName('')
      setNote('')
      setSecret(true)
    } catch (error){
      console.error("Error",error)
    }
  };

  const deletenote = async (note) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3003/remove_note', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({  title }), 
        });

        if (response.ok) {
            setMyNotes((prevNotes) => prevNotes.filter(n => n.title !== note.title)); 
        } else {
            throw new Error('Failed to delete');
        }
    } catch (error) {
        console.error('Failed to delete note:', error);
        setError('Failed to delete note. Please try again later.');
    }
};
const fetchMyNotes = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3003/get_private_notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    console.log(data)
    const allNotes= data.map(innerArray => {
        if (innerArray.length >= 2) {
            return {
                title: innerArray[0],
                note: innerArray[1],
            };
        }
        return null; 
    }).filter(Boolean); 
    setMyNotes(allNotes); 
    console.log(data)
    console.log(allNotes)

  } catch (error) {
    console.error('Error fetching my notes:', error);
    setError('Failed to load your notes. Please try again later.');
  }
};

useEffect(() => {
  fetchMyNotes();
}, []);

const fetchAllNotes = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3003/get_public_notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    console.log(data)
    const Notes= data.map(innerArray => {
        if (innerArray.length >= 2) {
            return {
                title: innerArray[0],
                note: innerArray[1],
            };
        }
        return null; 
    }).filter(Boolean); 
    setAllNotes(Notes); 
    console.log(data)
    console.log(Notes)

  } catch (error) {
    console.error('Error fetching my notes:', error);
    setError('Failed to load your notes. Please try again later.');
  }
};

useEffect(() => {
  fetchAllNotes();
}, []);


  return (
    <div className="container">
      <form >
        <h1>Notes</h1>
        <div className='inputBox'>
        <input 
          type="text" 
          placeholder="Enter the title" 
          value={title} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
          <input 
          type="text" 
          placeholder="Enter the note" 
          value={note} 
          onChange={(e) => setNote(e.target.value)} 
          required 
        />
        </div>
        <div className="public-private">
           <label><input type="checkbox" checked={secret} onChange={handleCheckboxChange}/>Secret</label>
           <button  
            type="button" 
            className="action-button" 
            onClick={handleSubmit}> Submit</button>
            <button onClick={()=> deletenote(note.title)}>Delete</button>
          </div>
          <h1>My notes</h1>        
            <div className='note-list'>
    {mynotes.map((note) => (
        <div key={note.title} className='note_item'>
            <h3>{note.title}: {note.note}</h3> 
            <button onClick={() => deletenote(note)}>Delete</button> 
           </div>
           
      ))}
      </div>
      <h1>All notes</h1>
      <div className='note-list'>
          {allnotes.map((note) => (
              <div key={note.title} className='note_item'>
                  <h3>{note.title}: {note.note}</h3> 
                  <button onClick={() => deletenote(note)}>Delete</button> 
                </div>
    ))},
    </div>
        
      </form>
    </div>
  );
}

export default CreateNote;