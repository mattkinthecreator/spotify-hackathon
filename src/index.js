import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ArtistsContextProvider from './contexts/ArtistsContext';
import AuthContextProvider from './contexts/AuthContext';

ReactDOM.render(
  <AuthContextProvider>
    <ArtistsContextProvider>
      <App />
    </ArtistsContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);
