import React, { useEffect, useState } from 'react'
import '../../index.css'

import { Link } from 'react-router-dom'
import axios from 'axios';
import { REACT_APP_ASSETS_URL, REACT_APP_BASE_URL } from '../../lib/env';
import DefaultAvatar from '../../assets/images/avatar1.jpg'
function Authors() {
  
  const[authors,setAuthors]=useState([])
  const [isLoading , setIsLoading]=useState(false);


  useEffect(()=>{
    const getAuthors = async ()=>{
      setIsLoading(true);
      try {
        const response = await axios.get(`${REACT_APP_BASE_URL}/users`)
        setAuthors(response.data)
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false)
    }
    getAuthors();
  },[])

  return (
    <>
    <section className="authors">
      {authors.length>0 ? 
      <div className="container authors_container">
        {
          authors.map(({id,avatar,name,posts})=>{
            return <Link key={id} to={`/posts/users/${id}`} className='author'>
              <div className="author_avatar">
                <img src={`${REACT_APP_ASSETS_URL}/uploads/${avatar}`}  alt="" />
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