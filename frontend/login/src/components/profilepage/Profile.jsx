import React, { useState } from 'react';
import './ProfilePage.css';
import EditPage from './EditPage';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'MUHAB',
    title: 'A member in fatyat el kewa + wald',
    about: 'I am Mohab Abdelgwad aka Muhab, I love Playboy Carti and my Spotify playlist',
    picture: '',
    age: 4,
    school: 'Elekbal', 
    gender: 'Male', 
  });

  const startEditing = () => setIsEditing(true); 

  const saveProfile = (updatedProfile) => {
    setProfileData(updatedProfile); 
    setIsEditing(false); 
  };

  const cancelEditing = () => setIsEditing(false); 

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
        </div>
      ) : (
        <EditPage profile={profileData} onSave={saveProfile} onCancel={cancelEditing} />
      )}
    </div>
  );
};

export default ProfilePage;