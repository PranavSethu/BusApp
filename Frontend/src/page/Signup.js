// import React, {useState} from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// // import {  createUserWithEmailAndPassword,getAuth} from 'firebase/auth';
// import { FaUser, FaLock } from "react-icons/fa";
// // import { auth } from '../firebase';
// import './Signup.css'
 
// const Signup = () => {
//     const auth = getAuth();
//     const navigate = useNavigate();
 
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('');
 
//     const onSubmit = async (e) => {
//       e.preventDefault()
     
//     //   await createUserWithEmailAndPassword(auth, email, password)
//     //     .then((userCredential) => {
//     //         // Signed in
//     //         const user = userCredential.user;
//     //         console.log(user);
//     //         navigate("/")
//     //         // ...
//     //     })
//     //     .catch((error) => {
//     //         const errorCode = error.code;
//     //         const errorMessage = error.message;
//     //         console.log(errorCode, errorMessage);
//     //         // ..
//     //     });
 
   
//     }
 
//   return (
//                 <div className='wraping'>                  
//                     <h1>Signup</h1>                                                                            
//                     <form onSubmit={onsubmit}>                                                                                            
//                         <div className='input-box'>
//                             <input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}  
//                                 required                                    
//                                 placeholder="Email"                                
//                             />
//                             <FaUser className='icon' />
//                         </div>

//                         <div className='input-box'>
//                             <input
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)} 
//                                 required                                 
//                                 placeholder="Password"              
//                             />
//                             <FaLock className='icon' />
//                         </div>                                             
                        
//                         <button
//                             type="submit">  
//                             Sign up                                
//                         </button>
                                                                     
//                     </form>
                   
//                     <p className='already'>
//                         Already have an account?{' '}
//                         <NavLink to="/" >
//                             Sign in
//                         </NavLink>
//                     </p>                   
//                 </div>
//   )
// }
 
// export default Signup

// -------------------------------------------------------------------------------------------------------------

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Add name state if required by your backend

    const onSubmit = async (e) => {
        e.preventDefault();

        const bodyData = JSON.stringify({
            name, // include only if your backend needs the name for registration
            email,
            password,
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: bodyData,
        };

        try {
            const response = await fetch('http://localhost:4000/api/v1/users/register', requestOptions);
            const data = await response.json();
            if (response.ok) {
                console.log('User registered:', data);
                navigate("/"); // Assuming you have a login route
            } else {
                throw new Error(data.message || 'Failed to register');
            }
        } catch (error) {
            console.error('Registration error:', error.message);
        }
    };

    return (
        <div className='wraping'>
            <h1>Signup</h1>
            <form onSubmit={onSubmit}>
                <div className='input-box'>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Full Name" // Include this field only if necessary
                    />
                    <FaUser className='icon' />
                </div>
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
                <button type="submit">Sign up</button>
            </form>
            <p className='already'>
                Already have an account?{' '}
                <NavLink to="/login">Sign in</NavLink>
            </p>
        </div>
    );
};

export default Signup;
