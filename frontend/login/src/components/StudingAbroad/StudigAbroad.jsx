import React, { useState } from 'react'
import './StudingAbroad.css';
const StudingAbroad = () =>{
    const [university, setUniversty] = useState('');
    const [username, setUsername] = useState('');
    const [country, setCountry] = useState('');
    const [resources, setResources] = useState('');
    const [yourexperince, setYourExperience] = useState('');
    
   
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('http://localhost:3003/login ', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ university,username,country,resources,yourexperince}),
        });
        const data = await response.json();
        console.log(data);
     } catch (error) {
        console.error('Error:', error);
      }
   }
    return(
        <div className='stuging'>
            <h1>StudingAbroad</h1>
           <form onSubmit={handleSubmit}>
            <div className='user-input-box'>
                <input type="user name" placeholder='User Name' required
                    value={username}
                    onChange={(e) => 
                    setUsername(e.target.value) }/>
            </div>
            <div className='user-input-box'>
                <input type="university" placeholder='Universty'required
                    value={university}
                    onChange={(e) => 
                    setUniversty(e.target.value) }/>
            </div>
            <div className='user-input-box'>
                <input type="country" placeholder='Country' required
                    value={country}
                    onChange={(e) => 
                    setCountry(e.target.value) }/>
            </div>
            <div className='user-input-box'>
                <input type="blog" placeholder='Your Exeprience' required
                    value={yourexperince}
                    onChange={(e) => 
                    setYourExperience(e.target.value) }/>
            </div>
            <div className='user-input-box'>
                <input type="resources" placeholder='Recources' required
                    value={resources}
                    onChange={(e) => 
                    setResources(e.target.value) }/>
            </div>
            <div>
            <button  studing-button type="submit">Submit</button>
            </div>
            </form>   
        </div>

    );
};
export default StudingAbroad;