import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import { authContext } from './contexts/AuthContext'
import Player from './components/Player/Player'
import Admin from './components/Admin/Admin'
import Search from './components/Search/Search'
import ArtistDetails from './components/ArtistDetails/ArtistDetails'
import AlbumDetails from './components/AlbumDetails/AlbumDetails'

const MainRoutes = () => {
  const { user, isAdmin } = useContext(authContext)

  return (
    <>
      {user ? (
        <BrowserRouter>
          <Sidebar />
          <Header />
          <Player />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/search" element={<Search />} />
            <Route path="/artist/details/:id" element={<ArtistDetails />} />
            <Route path="/album/details/:id/:id" element={<AlbumDetails />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <Login />
      )}
    </>
  )
}

export default MainRoutes
