import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import AuthLayout from './Layouts/AuthLayout'
import FeedPage from './Pages/FeedPage'
import Profile from './Pages/Profile'
import PostDetails from './Pages/PostDetails'
import NotFound from './Pages/NotFound'
import Login from './Pages/Login'
import Register from './Pages/Register'
import MainProtectedRoute from './Components/MainProtectedRoute'
import AuthProtectedRoute from './Components/AuthProtectedRoute'


//Routing by react-router-dom libirary
const router = createBrowserRouter([
  {path:'', element:<MainLayout/>, children:[
    { index: true, element: <MainProtectedRoute> <FeedPage/> </MainProtectedRoute>},
    { path: 'profile', element: <MainProtectedRoute> <Profile/> </MainProtectedRoute>},
    { path: 'post-details/:id', element: <MainProtectedRoute> <PostDetails/> </MainProtectedRoute>},
    { path: '*', element: <MainProtectedRoute> <NotFound/> </MainProtectedRoute>}
  ]},
  {path:'', element:<AuthLayout/>, children:[
    { path: 'login', element: <AuthProtectedRoute> <Login/> </AuthProtectedRoute>},
    { path: 'register', element: <AuthProtectedRoute> <Register/> </AuthProtectedRoute>}
  ]},
])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
