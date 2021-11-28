import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Upload from './components/Upload/Upload';
import ArtistsContextProvider from './contexts/ArtistsContext';

const MainRoutes = () => {
  return (
    <ArtistsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </ArtistsContextProvider>
  );
};

export default MainRoutes;
