import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaCheck } from "react-icons/fa";
import UseAuthRedirect from '../../components/UseAuthRedirect/UseAuthRedirect';
import { UserContext } from '../../context/Usercontext';
import axios from 'axios';
import { REACT_APP_ASSETS_URL, REACT_APP_BASE_URL } from '../../lib/env';

function Userprofile() {
  UseAuthRedirect();
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_BASE_URL}/users/${currentUser.id}`, 
          {
            withCredentials: true, 
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        const { name, email, avatar } = response.data;
        setName(name);
        setEmail(email);
        setAvatar(avatar);
        
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [currentUser, token]);

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set('avatar', avatar);
      
      const response = await axios.post(
        `${REACT_APP_BASE_URL}/users/change-avatar`, 
        postData, 
        {
          withCredentials: true, 
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setAvatar(response?.data.avatar);
      console.log("avatar");
      
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserDetails = async (e)=>{
    e.preventDefault();

    try {
      const userData = new FormData();
    userData.set('name',name);
    userData.set('email',email);
    userData.set('currentPassword',currentPassword);
    userData.set('newPassword',newPassword);
    userData.set('confirmNewPassword',confirmNewPassword);

    const response = await axios.patch(
        `${REACT_APP_BASE_URL}/users/edit-user`, 
        userData, 
        {
          withCredentials: true, 
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log(response.status);
      if(response.status==200){
        navigate('/logout')
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message)
    }
  }
  
  return (
    <>
      <section className="profile">
        <div className="container profile_container">
          <Link to={`/myposts/${currentUser.id}`} className="btn">My posts</Link>
        </div>
      </section>
    </>
  );
}

export default Userprofile;
