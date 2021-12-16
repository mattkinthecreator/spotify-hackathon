import React, { useState } from 'react';
import AddAlbum from './AddAlbum/AddAlbum';
import AddArtist from './AddArtist/AddArtist';
import './Admin.css';

const Admin = () => {
  const [display, setDisplay] = useState(true);

  return (
    <div className="admin">
      <div className="admin-nav">
        <span
          onClick={() => setDisplay(true)}
          className={display ? 'active' : null}>
          Создать артиста /
        </span>
        <span
          onClick={() => setDisplay(false)}
          className={display ? null : 'active'}>
          Добавить альбом
        </span>
      </div>
      <div className="admin-content">
        {display ? <AddArtist /> : <AddAlbum />}
      </div>
    </div>
  );
};

export default Admin;
