import React, { useState } from 'react';
import './SignupForm.css';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        age: '',
        gender: '',
        school: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3003/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert(data.message); 
        } catch (error) {
            console.error('Error:', error);
            alert('Error');
        }
    };

    return (
        <div style={{ color: 'gray' }}>
            <div className='signup-wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>SIGNUP</h1>
                    <div className="input-box">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" required onChange={handleChange} />
        
                    </div>
                    <div className="input-box">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required onChange={handleChange} />
                
                    </div>
                    <div className="input-box">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" required onChange={handleChange} />
           
                    </div>
                    <div className="input-box">
                        <label htmlFor="age">Age</label>
                        <input type="number" name="age" id="age" required onChange={handleChange} />
                   
                    </div>
                    <div className="input-box">
                        <label htmlFor="school">School</label>
                        <input type="text" name="school" id="school" required onChange={handleChange} />
                
                    </div>
                    <div className="input-box">
                        <label htmlFor="gender">Gender</label>
                        <select name="gender" id="gender" required onChange={handleChange}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Prefer not to say</option>
                        </select>
              
                    </div>
                    <button type="submit">SignUp</button>
                    <p>Already have an account? <a href='/login'>Login</a></p>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
