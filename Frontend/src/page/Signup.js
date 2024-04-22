import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword,getAuth} from 'firebase/auth';
import { FaUser, FaLock } from "react-icons/fa";
// import { auth } from '../firebase';
import './Signup.css'
 
const Signup = () => {
    const auth = getAuth();
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }
 
  return (
                <div className='wraping'>                  
                    <h1>Signup</h1>                                                                            
                    <form onSubmit={onsubmit}>                                                                                            
                        <div className='input-box'>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email"                                
                            />
                            <FaUser className='icon' />
                        </div>

                        <div className='input-box'>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                            <FaLock className='icon' />
                        </div>                                             
                        
                        <button
                            type="submit">  
                            Sign up                                
                        </button>
                                                                     
                    </form>
                   
                    <p className='already'>
                        Already have an account?{' '}
                        <NavLink to="/" >
                            Sign in
                        </NavLink>
                    </p>                   
                </div>
  )
}
 
export default Signup