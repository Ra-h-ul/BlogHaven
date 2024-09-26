import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { REACT_APP_ASSETS_URL, REACT_APP_BASE_URL } from '../../lib/env';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';
import { FaUser } from "react-icons/fa";
import postavatar from '../../lib/profile.png'


// Add locales to TimeAgo
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function Postauthor({ createdAt, creator }) {
  const [author, setAuthor] = useState({});

  // Fetch author details
  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BASE_URL}/users/${creator}`);
        setAuthor(response?.data);
      } catch (error) {
        console.error('Error fetching author:', error);
      }
    };
    getAuthor();
  }, [creator]);

  // Convert createdAt to a timestamp
  const timestamp = new Date(createdAt).getTime();

  return (
    <Link to={`/posts/users/${creator}`} className="post_author">
      <div className="post_author-avatar">
        <img
          src={postavatar}
          alt={author.name || 'Author'}
        />
      </div>

      <div className="post_author-details">
        <h5>{author.name || 'Unknown Author'}</h5>
        <small>
          <ReactTimeAgo date={timestamp} locale="en-US" />
        </small>
      </div>
    </Link>
  );
}

export default Postauthor;
