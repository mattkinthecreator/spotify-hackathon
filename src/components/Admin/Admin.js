import React, { useState } from 'react';
import AddAlbum from './AddAlbum/AddAlbum';
import AddArtist from './AddArtist/AddArtist';
import './Admin.css';

const Admin = () => {
  const [display, setDisplay] = useState(true);

  return (
    <div className="admin">
      <div className="admin-nav">
        <p onClick={() => setDisplay(true)}>Создать артиста</p>
        <p onClick={() => setDisplay(false)}>Добавить альбом</p>
      </div>
      <div className="admin-content">
        {display ? <AddArtist /> : <AddAlbum />}
      </div>
    </div>
  );
};

export default Admin;
