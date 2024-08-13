import React, { useState } from 'react'
import '../../index.css'
import {authorsData} from '../../lib/data'
import { Link } from 'react-router-dom'

function Authors() {
  
  const[authors,setAuthors]=useState(authorsData)

  return (
    <>
    <section className="authors">
      {authors.length>0 ? 
      <div className="container authors_container">
        {
          authors.map(({id,avatar,name,posts})=>{
            return <Link key={id} to={`/posts/users/${id}`} className='author'>
              <div className="author_avatar">
                <img src={avatar} alt="author's avatar" />
              </div>

              <div className="author_info">
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>

            </Link>
          })
        }
      </div>
       : <h2 className='center' >No Authors found</h2> 
      } 
    </section>
    </>
  )
}

export default Authors