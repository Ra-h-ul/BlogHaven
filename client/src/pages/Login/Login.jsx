import React, { useState } from 'react';
import '../../index.css';
import { Link } from 'react-router-dom';

function Login() {

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const changeInputHandler = (e) => {
    setUserData(prev => {
      return { ...prev, [e.target.name]: e.target.value }; // Corrected to e.target.value
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(userData);
  };

  return (
    <>
      <div className="wrapper">
        <section className="login">
          <div className="container">
            <form action="" className='form login_form' onSubmit={submitHandler}>
              <h3>Sign in</h3>

              <p className='form_error-message'>
                This is an error message
              </p>

             

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

             

              <button type='submit' className='btn primary'>Register</button>

            </form>

            <small>Don't have an account? <Link to="/register" > Register</Link></small>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
