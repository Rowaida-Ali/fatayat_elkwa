import React, { useState } from 'react';
import './SignupForm.css';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        age: '',
        gender: ''
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
                        <input type="text" name="username" placeholder='Username' required onChange={handleChange} />
                    </div>
                    <div className="input-box">
                        <input type="email" name="email" placeholder='Email' required onChange={handleChange} />
                    </div>
                    <div className="input-box">
                        <input type="password" name="password" placeholder='Password' required onChange={handleChange} />
                    </div>
                    <div className="input-box">
                        <input type="number" name="age" placeholder='Age' required onChange={handleChange} />
                    </div>
                    <div className="input-box">
                        <input type="text" name="school" placeholder='School' required onChange={handleChange} />
                    </div>
                    <div className="input-box">
                        <select name="gender" required onChange={handleChange}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Perfer not to say.</option>
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
