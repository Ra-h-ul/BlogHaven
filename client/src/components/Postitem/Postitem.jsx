import React from "react";
import '../../index.css'
import { Link } from "react-router-dom";
import "../../../src/index.css";
import Postauthor from "../Postauthor/Postauthor";
import { REACT_APP_ASSETS_URL } from "../../lib/env";

function Postitem({
  postID,
  category,
  title,
  description,
  creator,
  thumbnail,
  createdAt
}) {

  console.log(description);
  console.log(thumbnail);
  const shortDescription = description.length > 145 ? description.slice(0, 100) + '...' : description;

    const postTitle = title.length > 30 ? title.slice(0, 30) + '...' : title;


  return (
    <article className="post">
      <div className="post_thumbnail">
        <img src={`${REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
      </div>

      <div className="post_content">
        <Link to={`/posts/${postID}`}>
          <h3>{postTitle}</h3>
        </Link>

          <p>{shortDescription}</p>
        

        <div className="post_footer">
          <Postauthor creator={creator} createdAt={createdAt} />
          <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
        </div>
      </div>
    </article>
  );
}

export default Postitem;
