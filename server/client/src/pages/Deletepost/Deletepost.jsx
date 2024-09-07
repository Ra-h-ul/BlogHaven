import React, { useContext, useState } from 'react';
import UseAuthRedirect from '../../components/UseAuthRedirect/UseAuthRedirect';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../context/Usercontext';
import axios from 'axios';
import { REACT_APP_BASE_URL } from '../../lib/env';
import Spinner from '../../components/Spinner/Spinner';

function Deletepost({postId}) {
  UseAuthRedirect();
  const navigate = useNavigate();
  const Location = useLocation();
  const [isLoading , setIsLoading] = useState(false);
 
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  const Delete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${REACT_APP_BASE_URL}/posts/${postId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 200) {
        if(Location.pathname==`/myposts/${currentUser.id}`){
          navigate(0)
        }else{
          navigate('/')
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
     
    }
  };

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <Link className='btn sm danger' onClick={Delete}>Delete</Link>
    </>
  );
}

export default Deletepost;
