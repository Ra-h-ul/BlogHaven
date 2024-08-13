import React from 'react'
import '../../index.css'
import { Link } from 'react-router-dom'
import Postauthor from '../../components/Postauthor/Postauthor'
import image1 from '../../assets/images/blog6.jpg'

function Postdetail() {
  return (
    <section className="post-details">
      <div className="container post-detail_container">
        
        <div className="post-detail_header">
          <Postauthor/>
    
        <div className="post-detail_buttons">
          <Link to={`/posts/werwer/edit`} className='btn sm primary' >Edit</Link>
          <Link to={`/posts/werwer/delete`} className='btn sm danger' >Delete</Link>
        </div>
        </div>

        <h1>This is the post title</h1>
        <div className="post-detail_thumbnail">
            <img src={image1} alt="" />
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, eveniet nisi dicta provident necessitatibus ratione molestiae voluptas dignissimos minus perspiciatis? Iste, pariatur laudantium! Hic in ipsam ut optio beatae maxime sequi illo ea. Accusamus eaque odio quis voluptatum ipsa laudantium, harum, nisi facilis repellendus iste qui sint, quaerat dicta fugiat porro. Dolore consequuntur nisi veniam beatae vel blanditiis? Voluptate eligendi, voluptatum ut, earum, deserunt culpa quaerat sunt laudantium facere delectus deleniti ipsa perferendis laboriosam illo atque ullam repellendus consequuntur blanditiis voluptatem. Nostrum dolores cupiditate quos ducimus amet distinctio maxime tempora! Cupiditate dolorem distinctio harum illum enim ipsam necessitatibus quos debitis!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, eveniet nisi dicta provident necessitatibus ratione molestiae voluptas dignissimos minus perspiciatis? Iste, pariatur laudantium! Hic in ipsam ut optio beatae maxime sequi illo ea. Accusamus eaque odio quis voluptatum ipsa laudantium, harum, nisi facilis repellendus iste qui sint, quaerat dicta fugiat porro. Dolore consequuntur nisi veniam beatae vel blanditiis? Voluptate eligendi, voluptatum ut, earum, deserunt culpa quaerat sunt laudantium facere delectus deleniti ipsa perferendis laboriosam illo atque ullam repellendus consequuntur blanditiis voluptatem. Nostrum dolores cupiditate quos ducimus amet distinctio maxime tempora! Cupiditate dolorem distinctio harum illum enim ipsam necessitatibus quos debitis!
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, eveniet nisi dicta provident necessitatibus ratione molestiae voluptas dignissimos minus perspiciatis? Iste, pariatur laudantium! Hic in ipsam ut optio beatae maxime sequi illo ea. Accusamus eaque odio quis voluptatum ipsa laudantium, harum, nisi facilis repellendus iste qui sint, quaerat dicta fugiat porro. Dolore consequuntur nisi veniam beatae vel blanditiis? Voluptate eligendi, voluptatum ut, earum, deserunt culpa quaerat sunt laudantium facere delectus deleniti ipsa perferendis laboriosam illo atque ullam repellendus consequuntur blanditiis voluptatem. Nostrum dolores cupiditate quos ducimus amet distinctio maxime tempora! Cupiditate dolorem distinctio harum illum enim ipsam necessitatibus quos debitis!
        </p>
      </div> 
    </section>
  )
}

export default Postdetail