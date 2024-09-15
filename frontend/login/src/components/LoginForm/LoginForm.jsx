import React from 'react'
import './LoginForm.css';
import { FaLock} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const LoginForm = () => {
    return (
        <div className='wrapper'>
            <form action=''>
                <h1>LogIn</h1>
                <div className="input-box">
                    <input type="text" placeholder='Email' required/>
                    <MdEmail className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='password' required/>
                    <FaLock className='icon'/>
                </div>
                <div className="remember-forget">
                    <label><input type="checkbox"/>Remember me </label>
                    <a href='#'>Forget password?</a>
                </div>
                <button type="submit">LogIn</button>
                <div className="register-link"></div>
                <p>Don't have an account? <a href='#'>Register</a></p>
            </form>
        </div>
    );
};
export default LoginForm;
