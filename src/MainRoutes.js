import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Upload from './components/Upload/Upload'
import { authContext } from './contexts/AuthContext'

const MainRoutes = () => {
  const { user, isAdmin } = useContext(authContext)

  return (
    <>
      {user ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Upload />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <Login />
      )}
    </>
  )
}

export default MainRoutes
