import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ProfilePage.css';
import EditPage from './EditPage';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    age: '', 
    school: '', 
    email: '', 
    gender: '',  
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3003/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          
          },
        });
          
      
        if (response.ok) {
          const data = await response.json();
          
          setProfileData(data);
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []); 

  const startEditing = () => setIsEditing(true); 

  const saveProfile = async (updatedProfile) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3003/edit_profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          age:updatedProfile.age,
          school:updatedProfile.school,
          gender:updatedProfile.gender}),

      });
  

      if (response.ok) {
        const data = await response.json();
        setProfileData(data); 
        setIsEditing(false); 
      } else {
        console.error('Failed to update profile');
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
  };

  const cancelEditing = () => setIsEditing(false); 

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3003/delete_account', { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ password }), 
      });
      
      if (response.ok) {
        localStorage.removeItem('token');
        navigate('/signup'); 
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete account. Please check your password.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred while deleting the account.');
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3003/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        navigate('/login'); 
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      alert('An error occurred while logging out.');
    }
  };

  return (
    <div className="profile-container">
      {!isEditing ? (
        <div className="profile-card">
          <h2>{profileData.name}</h2>
          <p><strong>Age:</strong> {profileData.age}</p> 
          <p><strong>School:</strong> {profileData.school}</p> 
          <p><strong>Email:</strong> {profileData.email}</p> 
          <p><strong>Gender:</strong> {profileData.gender}</p> 
          <li>
          <button className="edit-button" onClick={startEditing}>
            Edit Profile
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete Account
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
          </li>
        </div>
        
      ) : (
        <EditPage profile={profileData} onSave={saveProfile} onCancel={cancelEditing} />
      )}

        {showDeleteConfirm && (
        <div className="delete-confirmation">
          <h3>Confirm Account Deletion</h3>
          <p>Please enter your password to confirm:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
          <button onClick={confirmDelete}>Confirm</button>
          <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
export default ProfilePage;
