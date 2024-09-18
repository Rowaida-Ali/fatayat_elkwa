import React, { useState } from 'react';

const EditPage = ({ profile, onSave, onCancel }) => {
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  const handleChange = (e) => {
    setUpdatedProfile({
      ...updatedProfile,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the image
      setUpdatedProfile({
        ...updatedProfile,
        picture: imageUrl, // Set the picture to the new uploaded image
      });
    }
  };

  const handleSave = () => {
    onSave(updatedProfile); // Save the updated profile data
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

      {}
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