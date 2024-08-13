import React, { useState } from 'react'
import '../../index.css'

import Thumbnail1 from '../../assets/images/blog1.jpg';
import Thumbnail2 from '../../assets/images/blog2.jpg';
import Thumbnail3 from '../../assets/images/blog3.jpg';
import Thumbnail4 from '../../assets/images/blog4.jpg';
import Postitem from '../Postitem/Postitem';
import {DUMMY_POSTS} from '../../lib/data' 


  
function Posts() {

    const [posts , setPosts] = useState(DUMMY_POSTS);

  return (
   <>
    <section className='posts'>
    {posts.length>0 ?
     <div className="container posts_container ">
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

   </>
  )
}

export default Posts