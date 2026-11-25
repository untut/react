import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Home from './Home'
import Category from './Category'
import Post from './Post'
import Login from './Login'
import Profile from './Profile'
import NotFound from './NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Category />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App