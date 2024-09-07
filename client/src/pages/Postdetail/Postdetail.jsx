import React, { useContext, useEffect, useState } from 'react';
import '../../index.css';
import { Link, useParams } from 'react-router-dom';
import Postauthor from '../../components/Postauthor/Postauthor';
import Spinner from '../../components/Spinner/Spinner';
import Deletepost from '../Deletepost/Deletepost';
import UseAuthRedirect from '../../components/UseAuthRedirect/UseAuthRedirect';
import { UserContext } from '../../context/Usercontext';
import axios from 'axios';
import { REACT_APP_ASSETS_URL, REACT_APP_BASE_URL } from '../../lib/env';

function Postdetail() {
  UseAuthRedirect();

  const { id } = useParams();
  const [post, setPost] = useState();
  const [creatorID, setCreatorID] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${REACT_APP_BASE_URL}/posts/${id}`);
        setPost(response.data);
        setCreatorID(response.data.creator);
      } catch (error) {
        setError('Failed to load post.');
        console.error(error);
      }
      setIsLoading(false);
    };
    getPost();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="center">
        <h2>{error}</h2>
      </div>
    );
  }

  
  
  return (
    <section className="post-details">
      {post && (
        <div className="container post-detail_container">
          <div className="post-detail_header">
            <Postauthor createdAt={post.createdAt} creator={post.creator} />

            {currentUser?.id === post.creator && (
              <div className="post-detail_buttons">
                <Link to={`/posts/${id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <Deletepost postId={post._id} />
              </div>
            )}
          </div>

          <h1>{post.title}</h1>
          {post.thumbnail && (
            <div className="post-detail_thumbnail">
              <img src={`${REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt={post.title} />
            </div>
          )}

          <div className="post-detail_content">
            <p dangerouslySetInnerHTML={{__html : post.description} } ></p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Postdetail;
