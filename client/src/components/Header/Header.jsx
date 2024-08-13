import React, { useState, useEffect } from 'react';
import '../../../src/index.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { CiMenuBurger } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

function Header() {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);

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
    setIsNavShowing(false);
  };
  return (
    <nav>
      <div className="container nav_container">
        <Link to='/' className='nav_logo'  onClick={closeNavHandler}> 
          <img src={logo} alt="logo" />
        </Link>
        {isNavShowing && 
          <ul className="nav_menu">
            <li> 
              <Link to="/profile/123" onClick={closeNavHandler}>Profile Page</Link>
            </li>
            <li> 
              <Link to="/create" onClick={closeNavHandler} >Create Post</Link>
            </li>
            <li> 
              <Link to="/authors" onClick={closeNavHandler} >Authors</Link>
            </li>
            <li> 
              <Link to="/logout" onClick={closeNavHandler}>Logout</Link>
            </li>
          </ul>
        }

        <button className='nav_toggle-btn btn ' onClick={toggleNavHandler}>
          {isNavShowing ? <RxCross2 /> : <CiMenuBurger /> }
        </button>
      </div>
    </nav>
  );
}

export default Header;
