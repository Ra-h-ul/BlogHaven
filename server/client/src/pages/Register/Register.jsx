import React, { useState } from 'react';
import '../../index.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {REACT_APP_BASE_URL} from '../../lib/env'

function Register() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData(prev => {
      return { ...prev, [e.target.name]: e.target.value }; 
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    console.log(REACT_APP_BASE_URL);
    try {
      
      const response = await axios.post(`${REACT_APP_BASE_URL}/users/register`, userData);
      
      

      const newUser = response.data;
      console.log(newUser);

      if (!newUser) {
        setError("Couldn't register user. Please try again.");
      } else {
        navigate('/login');
      }
      
    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <>
      <div className="wrapper">
        <section className="register">
          <div className="container">
            <form className='form register_form' onSubmit={submitHandler}>
              <h3>Sign up</h3>

              {error && 
                <p className='form_error-message'>
                  {error}
                </p>
              }

              <input
                type="text"
                placeholder='Full name'
                name='name'
                value={userData.name}
                onChange={changeInputHandler}
              />

              <input
                type="email"
                placeholder='Email'
                name='email'
                value={userData.email}
                onChange={changeInputHandler}
              />

              <input
                type="password"
                placeholder='Password'
                name='password'
                value={userData.password}
                onChange={changeInputHandler}
              />

              <input
                type="password"
                placeholder='Confirm Password'
                name='password2'
                value={userData.password2}
                onChange={changeInputHandler}
              />

              <button type='submit' className='btn primary'>Register</button>
            </form>

            <small>Already have an account? <Link to="/login" className='sign_in'>Login</Link></small>

            

          </div>
        </section>
      </div>
    </>
  );
}

export default Register;
