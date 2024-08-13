import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../assets/images/avatar1.jpg'
function Postauthor() {
  return (
    <>
    <Link to={`/posts/users/123` } className='post_author' >
        <div className='post_author-avatar'  >
            <img src={Avatar} alt="" />
        </div>

        <div className="post_author-details">
            <h5>By : author name</h5>
            <small>just now</small>
        </div>
    </Link>
    </>
  )
}

export default Postauthor