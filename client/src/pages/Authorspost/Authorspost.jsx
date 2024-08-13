import React, { useState } from 'react'

import { DUMMY_POSTS } from '../../lib/data'
import Postitem from '../../components/Postitem/Postitem'
function Authorspost() {

  const[posts,setPosts] = useState(DUMMY_POSTS)

  return (
    <section className='author_posts'>
    {posts.length>0 ? <div className="container author_posts_container ">
      {posts.map(({ id, thumbnail, category, title, desc, authorID }) => (
            <Postitem
                key={id}
                postID={id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                description={desc}
                authorID={authorID}
            />
            ))} 
        </div> 
        : <div className="center">
          <h2>No Posts Available</h2>
          </div>
        } 
    </section>
  )
}

export default Authorspost