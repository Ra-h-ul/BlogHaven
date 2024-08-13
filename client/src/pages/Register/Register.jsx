import React, { useState } from 'react';
import '../../index.css';
import { Link } from 'react-router-dom';

function Register() {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
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
        <section className="register">
          <div className="container">
            <form action="" className='form register_form' onSubmit={submitHandler}>
              <h3>Sign in</h3>

              <p className='form_error-message'>
                This is an error message
              </p>

              <input
                type="text"
                placeholder='Full name'
                name='name'
                value={userData.name}
                onChange={changeInputHandler}
              />

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

              <input
                type="password"
                placeholder='Confirm Password'
                name='password2'
                value={userData.password2}
                onChange={changeInputHandler}
              />

              <button type='submit' className='btn primary'>Register</button>

            </form>

            <small>Already have an account? <Link to="/login" className='sign_in'> Login</Link></small>
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;
