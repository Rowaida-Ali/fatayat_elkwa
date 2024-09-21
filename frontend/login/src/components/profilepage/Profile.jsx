import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ProfilePage.css';
import EditPage from './EditPage';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    title: '',
    about: '',
    picture: '',
    age: '', 
    school: '', 
    gender: '', 
  });

  const startEditing = () => setIsEditing(true); 

  const saveProfile = (updatedProfile) => {
    setProfileData(updatedProfile); 
    setIsEditing(false); 
  };

  const cancelEditing = () => setIsEditing(false); 

  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:3003/delete_account', { 
        method: 'DELETE',
      });
      
      if (response.ok) {
        navigate('/signup'); 
      } 
      }
     catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred while deleting the account.');
    }
  };

  return (
    <div className="profile-container">
      {!isEditing ? (
        <div className="profile-card">
          <div className="profile-picture">
            {profileData.picture ? (
              <img src={profileData.picture} alt="Profile" className="image" />
            ) : (
              <div className="image-placeholder">150 x 150</div>
            )}
          </div>
          <h2>{profileData.name}</h2>
          <h4>{profileData.title}</h4>
          <p>{profileData.about}</p>
          <p><strong>Age:</strong> {profileData.age}</p> 
          <p><strong>School:</strong> {profileData.school}</p> 
          <p><strong>Gender:</strong> {profileData.gender}</p> 
          <button className="edit-button" onClick={startEditing}>
            Edit Profile
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      ) : (
        <EditPage profile={profileData} onSave={saveProfile} onCancel={cancelEditing} />
      )}
    </div>
  );
};

export default ProfilePage;
