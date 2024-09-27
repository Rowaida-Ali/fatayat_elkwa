import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '', 
        age: '',
        gender: '',
        school: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'password') {
            checkPasswordStrength(value);
        }
    };

    const checkPasswordStrength = (password) => {
        if (password.length < 6) {
            setPasswordStrength('weak');
        } else if (password.length < 10) {
            setPasswordStrength('medium');
        } else {
            setPasswordStrength('strong');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (formData.age < 1 || formData.age <= 16) {
            setErrorMessage('Age must be greater than 16');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (passwordStrength === 'weak') {
            setErrorMessage('Password is too weak. Please choose a stronger password.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3003/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.access_token);
                navigate('/login'); 
            } else {
                setErrorMessage(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div style={{ color: 'gray' }}>
            <div className='signup-wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>SIGNUP</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="input-box">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" placeholder="Enter your username" required onChange={handleChange} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email" required onChange={handleChange} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Create a password" 
                            required 
                            onChange={handleChange} 
                            className={passwordStrength} 
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" required onChange={handleChange} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="age">Age</label>
                        <input 
                            type="number" 
                            name="age" 
                            id="age" 
                            placeholder="Enter your age" 
                            required 
                            min="1" 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="school">School</label>
                        <input type="text" name="school" id="school" placeholder="Enter your school name" required onChange={handleChange} />
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
