import React, { useState } from 'react';
import './NoteTaker.css';
// import './App.css';


const CreateNote = () => {
  const [title, setName] = useState('');
  const [note, setNote] = useState('');
  
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
        body: JSON.stringify({ title, note }),
      });
      const data = await response.json();
      console.log(data);
      setName('');
      setNote('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
        <textarea 
          placeholder="Enter your note" 
          value={note} 
          onChange={(e) => setNote(e.target.value)} 
          required 
        />
        </div>
         <button  
            type="button" 
            className="action-button" 
            onClick={handleSubmit} 
          > Submit</button>
        {/* <div className="button-container">
          <button 
            type="button" 
            title='press'
            className="action-button" 
            onClick={() => setName('')} 
          >
          </button>
          <button 
            type="button" 
            className="action-button" 
            onClick={() => setNote('')} 
          >
          </button>
          
        </div> */}
      </form>
    </div>
  );
}

export default CreateNote;