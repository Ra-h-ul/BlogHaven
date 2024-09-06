import React, { useContext, useState } from 'react';
import '../../index.css';
import { Link, useNavigate } from 'react-router-dom';
import {REACT_APP_BASE_URL} from '../../lib/env'
import axios from 'axios'; // Ensure axios is imported
import { UserContext } from '../../context/Usercontext';

function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();


  const {setCurrentUser} = useContext(UserContext)

  const changeInputHandler = (e) => {
    setUserData(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
   
    try {
      const response = await axios.post(
        `${REACT_APP_BASE_URL}/users/login`, userData);

      const user = response.data;
      setCurrentUser(user)  // save data in local storage
      navigate('/');
      
    } catch (error) {
      setError(error.response.data.message || "Login Failed");
    }
  };

  return (
    <>
      <div className="wrapper">
        <section className="login">
          <div className="container">
            <form className='form login_form' onSubmit={submitHandler}>
              <h3>Sign in</h3>

              {error && <p className="form_error-message">{error}</p>}

              <input
                type="text"
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

              <button type='submit' className='btn primary'>Sign In</button>
            </form>

            <small>Don't have an account? <Link to="/register">Register</Link></small>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
