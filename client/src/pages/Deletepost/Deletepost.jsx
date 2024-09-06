import React from 'react'
import UseAuthRedirect from '../../components/UseAuthRedirect/UseAuthRedirect';
import { Link } from 'react-router-dom';
function Deletepost() {
  UseAuthRedirect();

  return (
   <>
   <Link className='btn sm danger' >Delete</Link>
   </>
  )
}

export default Deletepost