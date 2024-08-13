import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import '../../index.css';
import AvatarImage from '../../assets/images/avatar15.jpg';

function Userprofile() {
  const [avatar, setAvatar] = useState(AvatarImage);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  return (
    <>
      <section className="profile">
        <div className="container profile_container">
          <Link to={`/myposts/123`} className="btn">My posts</Link>

          <div className="profile_details">
            <div className="avatar_wrapper">
              <div className="profile_avatar">
                <img src={avatar} alt="User Avatar" />
              </div>

              <form className="avatar_form">
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={e => setAvatar(URL.createObjectURL(e.target.files[0]))}
                />
                <label htmlFor="avatar" className='cursor-pointer' >
                  <MdEdit />
                </label>
              </form>
            </div>
            <h1>{name || 'User username'}</h1>
          </div>

          <form className="form profile_form">
            <p className="form_error-message">This is an error message</p>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
            />
            <button type="submit" className="btn primary">Update details</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Userprofile;
