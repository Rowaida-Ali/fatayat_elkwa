import React, { useEffect, useState } from 'react';
import './NoteTaker.css';
// import './App.css';


const CreateNote = () => {
  const [title, setName] = useState('');
  const [note, setNote] = useState('');
  const [secret, setSecret]=useState(true);
  const [error, setError] = useState('');
  const [mynotes,setMyNotes]=useState([])
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
      // setMyNotes((prevNotes) => [...prevNotes, data]);
      setName('')
      setNote('')
      setSecret(true)
    } catch (error){
      console.error("Error",error)
    }
  };

  const deletenote = async (title) => {
    try {
         const token = localStorage.getItem('token')
        const response= await fetch('http://localhost:3003/remove_note', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' ,
                        'Authorization': `Bearer ${token}`,
            },

            body: JSON.stringify({title: title})        
        });
        if (response.ok) {
          setMyNotes((prevNote) => prevNote.filter(note => note!== title));
        } else {
          throw new Error('Failed to delete');
        }
    } catch (error) {
        console.error('Failed to delete task:', error);
        setError('Failed to delete blog. Please try again later.');
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

// const fetchMyNotes = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await fetch('http://localhost:3003/get_private_notes', {
//       method:`GET`,
//       headers:{
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       }
//     });
//     if (!response.ok) throw new Error('Network response was not ok');
//     const data = await response.json();
//     const jsonArray=JSON.parse(data)
//     console.log()
//     setMyNotes(jsonArray);
//   } catch (error) {
//     console.error('Error fetching my notes:', error);
//     setError('Failed to load your notes. Please try again later.');
//   }
// };
// useEffect(()=>{
//   fetchMyNotes()
// },[])
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
          <div key={note.id} className='note_item'>
            <h3>{note.title} {note.note}</h3>
            <button onClick={()=> deletenote(note.title)}>Delete</button>
          </div>
        ))}
         </div>
      </form>
    </div>
  );
}

export default CreateNote;