import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { authContext } from './contexts/AuthContext';
import Player from './components/Player/Player';
import Admin from './components/Admin/Admin';
import Search from './components/Search/Search';
import ArtistDetails from './components/ArtistDetails/ArtistDetails';
import AlbumDetails from './components/AlbumDetails/AlbumDetails';
import Favorites from './components/Favorites/Favorites';
import Genre from './components/Search/Genre';

const MainRoutes = () => {
  const { user, isAdmin } = useContext(authContext);

  return (
    <>
      <BrowserRouter>
        {user ? (
          <>
            <Sidebar />
            <Header />
            <Player />
          </>
        ) : null}
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={isAdmin ? <Admin /> : <Navigate to="/" />}
          />
          <Route
            path="/search"
            element={user ? <Search /> : <Navigate to="/login" />}
          />
          <Route
            path="/artist/details/:id"
            element={user ? <ArtistDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/album/details/:id/:id"
            element={user ? <AlbumDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/favorites"
            element={user ? <Favorites /> : <Navigate to="/login" />}
          />
          <Route
            path="/genres/:id"
            element={user ? <Genre /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MainRoutes;
