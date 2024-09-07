import './App.css'
import { ReactDOM } from 'react-dom/client'
import { RouterProvider , createBrowserRouter , Routes , Route } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import Errorpage from './pages/Errorpage/Errorpage'
import Homepage from './pages/Homepage/Homepage'
import Postdetail from './pages/Postdetail/Postdetail'
import Login from './pages/Login/Login'
import Logout from './pages/Logout/Logout'
import Register from './pages/Register/Register'
import Authors from './pages/Authors/Authors'
import Authorspost from  './pages/Authorspost/Authorspost'
import Createpost from './pages/Createpost/Createpost'
import Dashboard from './pages/Dashboard/Dashboard'
import Editpost from './pages/Editpost/Editpost'
import Categorypost from './pages/Catogerypost/Catogerypost'
import Userprofile from './pages/Userprofile/Userprofile'
import Deletepost from './pages/Deletepost/Deletepost'
import UserProvider from './context/Usercontext'

function App() {
 
const router = createBrowserRouter([
  {
    path: '/',
    element : <UserProvider> <Layout/> </UserProvider> ,
    errorElement : <Errorpage/>,
    children :[
      {
        index: true , 
        element : <Homepage/>
      },
      {
        path : "posts/:id" , element : <Postdetail/>
      },
      {
        path : "login" ,
         element : <Login/>
      },
      {
        path : "logout" ,
         element : <Logout/>
      },
      {
        path: "register" ,
         element : <Register/>
      },
      {
        path: "authors",
        element: <Authors/>
      },
      {
        path : "profile/:id" , 
        element : <Userprofile/>
      },
      {
        path: "create",
        element: <Createpost/>
      },
      {
        path: "posts/categories/:category",
        element: <Categorypost/>
      },
      {
        path: "posts/users/:id",
        element: <Authorspost/>
      },
      {
        path: "myposts/:id",
        element: <Dashboard/>
      },
      {
        path: "posts/:id/edit",
        element: <Editpost/>
      },
      {
        path: "posts/:id/delete",
        element: <Deletepost/>
      },
     
    ],
  },
]);

return <RouterProvider router={router} />;
}

export default App