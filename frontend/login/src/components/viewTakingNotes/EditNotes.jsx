import React, { useState } from 'react';

const EditNote = ({ takingnotes , onSave, onCancel }) => {
  const [title, setTitle] = useState("")
  const [input , setInput]=useState("")
 
  const HandleChange = (e) => {
    setUpdatedNotes({
      ...updatedNotes,
      [e.target.text]: e.target.value,
    });
  };

   const handleChange = (e) => {
    setUpdatedNotes({
      ...updatedNotes,
      [e.target.input]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3003/edit-notes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatednote),
      });

      if (!response.ok) {
        throw new Error('Failed to save note');
      }

      const data = await response.json();
      console.log(data);
      onSave();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save note. Please try again.');
    }
  };
  return (
    <div className="edit-components">
      <input 
        type="text" 
        name="name" 
        onChange={handleChange} 
        placeholder="Text"
      /> 
      <input 
        type="text" 
        name="input" 
        onChange={HandleChange} 
        placeholder="Input"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditNotes;