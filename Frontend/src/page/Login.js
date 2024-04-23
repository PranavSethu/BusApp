import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import './Login.css';
import axios from 'axios';  

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const onLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(''); 
        axios.post('https://busapp-fgg9.onrender/api/v1/users/login', { email, password }, {
            withCredentials: true  
        })
        .then(response => {
            console.log('Login successful:', response.data);
            navigate("/home");
        })
        .catch(error => {
            const errorResponse = error.response ? error.response.data.message : 'No response from server';
            console.error('Login error:', errorResponse);
            setErrorMessage('Login failed: ' + errorResponse); 
        });
    };

    return (
        <div className='wrapper'>
            <form onSubmit={onLogin}>
                <h1>Login</h1>
                <div className='input-box'>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={handleEmailChange}
                        required
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
                {errorMessage && <div className="error-message">{errorMessage}</div>} 
                <div className='remember-forget'>
                    <label><input type='checkbox' /> Remember me</label>
                    <a href='#'>Forget password?</a>
                </div>
                <button type='submit'>Login</button>
            </form>
            <div className='register-link'>
                <p>Don't have an account?
                    <NavLink to="/signup">Sign up</NavLink>
                </p>
            </div>
        </div>
    );
}

export default Login;


