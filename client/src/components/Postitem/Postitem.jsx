import React from "react";
import '../../index.css'
import { Link } from "react-router-dom";
import "../../../src/index.css";
import Postauthor from "../Postauthor/Postauthor";
function Postitem({
  postID,
  category,
  title,
  description,
  authorID,
  thumbnail,
}) {
    const shortDescription = description.length > 145 ? description.slice(0, 100) + '...' : description;

    const postTitle = title.length > 30 ? title.slice(0, 30) + '...' : title;


  return (
    <article className="post">
      <div className="post_thumbnail">
        <img src={thumbnail} alt={title} />
      </div>

      <div className="post_content">
        <Link to={`/posts/${postID}`}>
          <h3>{postTitle}</h3>
        </Link>

          <p>{shortDescription}</p>
        

        <div className="post_footer">
          <Postauthor />
          <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
        </div>
      </div>
    </article>
  );
}

export default Postitem;
