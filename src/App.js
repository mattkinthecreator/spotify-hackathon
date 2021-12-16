import React from 'react'
import MainRoutes from './MainRoutes'
import './index.css'
import AuthContextProvider from './contexts/AuthContext'
import ArtistsContextProvider from './contexts/ArtistsContext'

const App = () => {
  return (
    <div className="container">
      <AuthContextProvider>
        <ArtistsContextProvider>
          <MainRoutes />
        </ArtistsContextProvider>
      </AuthContextProvider>
    </div>
  )
}

export default App
