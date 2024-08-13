import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DUMMY_POSTS } from '../../lib/data';

function Dashboard() {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  return (
    <>
      <section className="dashboard">
        {posts.length ? (
          <div className="container dashboard_container">
            {posts.map((post) => (
              <article key={post.id} className="dashboard_post">
                <div className="dashboard_post-info">
                  <div className="dashboard_post-thumbnail">
                    <img src={post.thumbnail} alt={post.title} />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard_post-actions">
                  <Link to={`/posts/${post.id}`} className="btn btn_sm">
                    View
                  </Link>
                  <Link to={`/posts/${post.id}/edit`} className=" btn btn_sm primary">
                    Edit
                  </Link>
                  <Link to={`/posts/${post.id}/delete`} className="btn btn_sm danger">
                    Delete
                  </Link>
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
