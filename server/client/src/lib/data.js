import Thumbnail1 from '../assets/images/blog1.jpg';
import Thumbnail2 from '../assets/images/blog2.jpg';
import Thumbnail3 from '../assets/images/blog3.jpg';
import Thumbnail4 from '../assets/images/blog4.jpg';
 const DUMMY_POSTS = [
    {
      id: '1',
      thumbnail: Thumbnail1,
      category: 'education',
      title: 'This is the title of the very first post on this blog.',
      desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Repellat dolor dolor dolorum.Lorem ipsum dolor sit amet consectetur adipiscing elit. Repellat dolor dolor dolorum.Lorem ipsum dolor sit amet consectetur adipiscing elit. Repellat dolor dolor dolorum.',
      authorID: 3
    },
    {
      id: '2',
      thumbnail: Thumbnail2,
      category: 'science',
      title: 'This is the title of the very second post on this blog.',
      desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Repellat dolor dolor dolorum.Lorem ipsum dolor sit amet consectetur adipiscing elit. Repellat dolor dolor dolorum.',
      authorID: 1
    },
    {
      id: '3',
      thumbnail: Thumbnail3,
      category: 'technology',
      title: 'This is the title of the third post on this blog.',
      desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisquam veritatis aliquam ratione.',
      authorID: 2
    },
    {
      id: '4',
      thumbnail: Thumbnail4,
      category: 'health',
      title: 'This is the title of the fourth post on this blog.',
      desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Adipisci deleniti ea veniam dolorem.',
      authorID: 4
    }
  ];

import Avatar1 from '../assets/images/avatar1.jpg'
import Avatar2 from '../assets/images/avatar2.jpg'
import Avatar3 from '../assets/images/avatar3.jpg'
import Avatar4 from '../assets/images/avatar4.jpg'
import Avatar5 from '../assets/images/avatar5.jpg'

const authorsData = [
  {id: 1, avatar: Avatar1, name: 'Ernest Achiever', posts: 3},
  {id: 2, avatar: Avatar2, name:'Jane Doe', posts: 5},
  {id: 3, avatar: Avatar3, name:'Dramani Mahama', posts: 0},
  {id: 4, avatar: Avatar4, name: 'Nana Addo', posts: 2},
  {id: 5, avatar: Avatar5, name: 'Hajia Bintu', posts: 1}
  ]



export {DUMMY_POSTS,authorsData}