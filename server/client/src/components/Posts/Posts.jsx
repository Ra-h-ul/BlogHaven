import React, { useEffect, useState } from 'react';
import '../../index.css';
import Postitem from '../Postitem/Postitem';
import Spinner from '../Spinner/Spinner';
import { REACT_APP_BASE_URL } from '../../lib/env';
import axios from 'axios';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${REACT_APP_BASE_URL}/posts`);
        setPosts(response?.data);
        
      } catch (error) {
        setError('Failed to load posts');
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

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
              {posts.map(({ _id:id, thumbnail, category, title, description, creator, createdAt }) => (
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

export default Posts;
