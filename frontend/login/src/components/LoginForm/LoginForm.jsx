import React, { useState } from 'react';
import './LoginForm.css';
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const LoginForm = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3003/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, email }),
            });
            const data = await response.json();
            console.log(data);
            localStorage.setItem('token', data.access_token);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='wrapper'>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder='Email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <MdEmail className='icon' />
                </div>
                <div className="input-box">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder='Password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className='icon' />
                </div>
                <div className="remember-forget">
                    <label><input type="checkbox" /> Remember me </label>
                </div>
                <button type="submit">Log In</button>
                <div className="register-link"></div>
                <p>Don't have an account? <a href='/signup'>Register</a></p>
            </form>
        </div>
    );
};

export default LoginForm;
