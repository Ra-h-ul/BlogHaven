import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import UseAuthRedirect from '../../components/UseAuthRedirect/UseAuthRedirect';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import { UserContext } from '../../context/Usercontext';
import { REACT_APP_BASE_URL } from '../../lib/env';
import Deletepost from '../Deletepost/Deletepost';

function Dashboard() {
  UseAuthRedirect();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${REACT_APP_BASE_URL}/posts/user/${id}`,
          { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
        );
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load posts');
      }
      setIsLoading(false);
    };

    if (id) {
      fetchPosts();
    }
  }, [id, token]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="dashboard">
        
        {posts.length ? (
          <div className="container dashboard_container">
            {posts.map((post) => (
              <article key={post._id} className="dashboard_post">
                <div className="dashboard_post-info">
                  <div className="dashboard_post-thumbnail">
                    <img src={post.thumbnail} alt={post.title} />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard_post-actions">
                  <Link to={`/posts/${post._id}`} className="btn btn_sm">
                    View
                  </Link>
                  <Link to={`/posts/${post._id}/edit`} className="btn btn_sm primary">
                    Edit
                  </Link>
                  <Deletepost postId={post._id} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <h2 className="center">You have no posts yet.</h2>
        )}
      </section>
    </>
  );
}

export default Dashboard;
