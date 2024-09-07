import React, { useState, useEffect, useContext } from 'react';
import '../../../src/index.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { CiMenuBurger } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { UserContext } from '../../context/Usercontext';

function Header() {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);
  const { currentUser } = useContext(UserContext);
  
  // Safely handle currentUser
  const userId = currentUser?.id;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setIsNavShowing(true);
      } else {
        setIsNavShowing(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleNavHandler = () => {
    setIsNavShowing(prevState => !prevState);
  };

  const closeNavHandler = () => {
    setIsNavShowing(window.innerWidth > 800);
  };

  return (
    <nav>
      <div className="container nav_container">
        <Link to='/' className='nav_logo' onClick={closeNavHandler}>
          <img src={logo} alt="logo" />
        </Link>
        
        {userId && isNavShowing && (
          <ul className="nav_menu">
            <li>
              <Link to={`/myposts/${userId}`} onClick={closeNavHandler}>My posts</Link>
            </li>
            <li>
              <Link to="/create" onClick={closeNavHandler}>Create Post</Link>
            </li>
            <li>
              <Link to="/authors" onClick={closeNavHandler}>Authors</Link>
            </li>
            <li>
              <Link to="/logout" onClick={closeNavHandler}>Logout</Link>
            </li>
          </ul>
        )}

        {!userId && isNavShowing && (
          <ul className="nav_menu">
            <li>
              <Link to="/authors" onClick={closeNavHandler}>Authors</Link>
            </li>
            <li>
              <Link to="/register" onClick={closeNavHandler}>Register</Link>
            </li>
            <li>
              <Link to="/login" onClick={closeNavHandler}>Login</Link>
            </li>
          </ul>
        )}

        <button className='nav_toggle-btn btn' onClick={toggleNavHandler}>
          {isNavShowing ? <RxCross2 /> : <CiMenuBurger />}
        </button>
      </div>
    </nav>
  );
}

export default Header;
