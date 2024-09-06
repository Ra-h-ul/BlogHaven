import React, { useState, useEffect } from 'react';
import Postitem from '../../components/Postitem/Postitem';
import Spinner from '../../components/Spinner/Spinner';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BASE_URL } from '../../lib/env'; // Ensure this is imported

function Authorspost() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${REACT_APP_BASE_URL}/posts/user/${id}`);
        setPosts(response?.data);
      } catch (error) {
        setError('Failed to load posts');
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [id]); // Include id in dependency array

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className='posts'>
      {error ? (
        <div className="center">
          <h2>{error}</h2>
        </div>
      ) : (
        <>
          {posts.length > 0 ? (
            <div className="container posts_container">
              {posts.map(({ _id: id, thumbnail, category, title, description, creator, createdAt }) => (
                <Postitem
                  key={id}
                  postID={id}
                  thumbnail={thumbnail}
                  category={category}
                  title={title}
                  description={description}
                  creator={creator}
                  createdAt={createdAt}
                />
              ))}
            </div>
          ) : (
            <div className="center">
              <h2>No Posts Available</h2>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Authorspost;
