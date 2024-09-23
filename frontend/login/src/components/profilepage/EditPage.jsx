import React, { useState } from 'react';

const EditPage = ({ profile, onSave, onCancel }) => {
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  const handleChange = (e) => {
    setUpdatedProfile({
      ...updatedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setUpdatedProfile({
        ...updatedProfile,
        picture: imageUrl, 
      });
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3003/edit-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      const data = await response.json();
      console.log(data);
      onSave(updatedProfile);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  return (
    <div className="edit-page">
      <input 
        type="text" 
        name="name" 
        value={updatedProfile.name} 
        onChange={handleChange} 
        placeholder="Name"
      />
      <input 
        type="text" 
        name="title" 
        value={updatedProfile.title} 
        onChange={handleChange} 
        placeholder="Title"
      />
      <textarea 
        name="about" 
        value={updatedProfile.about} 
        onChange={handleChange} 
        placeholder="About"
      />
      <input 
        type="number" 
        name="age" 
        value={updatedProfile.age} 
        onChange={handleChange} 
        placeholder="Age"
      />
      <input 
        type="text" 
        name="school" 
        value={updatedProfile.school} 
        onChange={handleChange} 
        placeholder="School"
      />
      <select 
        name="gender" 
        value={updatedProfile.gender} 
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditPage;
