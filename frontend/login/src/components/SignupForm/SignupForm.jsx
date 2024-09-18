import React, { useState } from 'react'
import './SignupForm.css';
const SignupForm = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [Gender,setGender]=useState('');
    const [age, setAge] = useState('');
    const [school, setSchool] = useState('');
    const [username, setUsername] = useState('');
    const [country, setCountry] = useState('');
    const [education, setEducation] = useState('');
    
   
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/login ', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password,email }),
        });
        const data = await response.json();
        console.log(data);
     } catch (error) {
        console.error('Error:', error);
      }
   }
    return (
        <div style={{color:'gray'}}>
        <div className='signup-wrapper' >
                <h1>SIGNUP</h1>
                <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <input type="text" placeholder='Username' required
                    value={username}
                    onChange={(e) => 
                    setUsername(e.target.value) }/>
                </div>
             
                <div className="input-box">
                    <input type="text" placeholder='Email' required
                     value={email} onChange={(e) => 
                    setEmail(e.target.value) } />
                </div>
                
                <div className="input-box">
                    <input type="password" placeholder='password' required 
                     value={password} on onChange={(e)=>
                    setPassword(e.target.value)  }/>
                </div>
              
                <div className="input-box">
                    <input type="number" placeholder='Age' required 
                     value={age} on onChange={(e)=>
                    setAge(e.target.value)  }/>
                </div>
              
                <div className="input-box">
                    <input type="text" placeholder='Gender' required 
                     value={Gender} on onChange={(e)=>
                    setGender(e.target.value)  }/>
                </div>
              
                <div className="input-box">  
                    <input type="text" placeholder='School' required 
                     value={school} on onChange={(e)=>
                    setSchool(e.target.value)  }/>
                </div>
               
                <div className="input-box">
                    <input type="text" placeholder='Country' required 
                     value={country} on onChange={(e)=>
                    setCountry(e.target.value)  }/>
                </div>
              
                <div className="input-box">
                    <input type="text" placeholder='Education' required 
                     value={education} on onChange={(e)=>
                    setEducation(e.target.value)  }/>
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