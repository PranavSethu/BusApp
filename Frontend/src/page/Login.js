import React, {useState} from 'react';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import { FaUser, FaLock } from "react-icons/fa";
import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const auth = getAuth();
    
    // --------------------------
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    // -------------------

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    // -----------------------------
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error);
            console.log(errorCode, errorMessage)
        });
       
    }

    return(
            <div className='wrapper'>                                                                                                               
                        <form onSubmit={onLogin}>  
                             <h1>Login</h1>                                             
                            <div className='input-box'>
                                <input
                                    id="text"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                                <FaUser className='icon' />
                            </div>

                            <div className='input-box'>
                                <input
                                    type="password"                                                                                                                   
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                 <FaLock className='icon' />
                            </div>
                            <div className='remember-forget'>
                                <label><input type='checkbox' />Remember me</label> 
                                <a href='#'>Forget password</a>   
                            </div>                  
                            <div>
                                <button type='submit'>      
                                    Login                                                                  
                                </button>
                            </div>                               
                        </form>
                       <div className='register-link'>
                        <p>Don't have an account?
                                <NavLink to="/signup">
                                    Sign up
                                </NavLink>
                            </p>
                       </div>
                                                   
                </div>
    )
}
 
export default Login