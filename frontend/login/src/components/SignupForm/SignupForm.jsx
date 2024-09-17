import React from 'react'
import './SignupForm.css';

const SignupForm = () => {
    return (
        <div style={{color:'gray'}}>
        <div className='signup-wrapper' >
            <form action=''>
                <h1>SIGNUP</h1>
                <div className="input-box">
                    <input type="text" placeholder='Username' required/>
                 
                </div>
                <div className="input-box">
                    <input type="text" placeholder='Email' required/>
               
                </div>
                <div className="input-box">
                    <input type="password" placeholder='password' required/>
                </div>
                <div className="input-box">
                    <input type="number" placeholder='Age' required/>
                 
                </div>
                <div className="input-box">
                    <input type="text" placeholder='Gender' required/>
               
                </div>
                <button type="submit">SignUp</button>
                <div className="register-link"></div>
                <p>Already have an account? <a href='#'>Login</a></p>
            </form>
        </div>
        </div>
    );
};
export default SignupForm;