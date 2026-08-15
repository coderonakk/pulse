import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Feed from './pages/Feed'
import CreatePost from './pages/CreatePost'


const App = () => {
  return (

    <Router>

      <Routes>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Feed />} />
        <Route path='/createpost' element={<CreatePost />} />

      </Routes>


    </Router>

  )
}

export default App