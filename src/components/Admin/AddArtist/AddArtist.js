import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import React, { useContext, useRef, useState } from 'react';
import { artistsContext } from '../../../contexts/ArtistsContext';
import { storage } from '../../../helpers/fire';
import './AddArtist.css';

const AddArtist = () => {
  const [artist, setArtist] = useState('');
  const [artistPicture, setArtistPicture] = useState('');

  const { createArtist } = useContext(artistsContext);

  const inputFileEl = useRef(null);

  async function uploadPicture(e) {
    const file = e.target.files[0];
    const storageRef = ref(storage, `${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', null, null, async () => {
      setArtistPicture(await getDownloadURL(uploadTask.snapshot.ref));
    });
  }

  function handleCreate() {
    let obj = {
      artist,
      picture: artistPicture,
      albums: [],
    };
    createArtist(obj);
    setArtist('');
    setArtistPicture('');
    inputFileEl.current.value = null;
  }

  return (
    <div className="add-artist">
      <input
        type="text"
        value={artist}
        placeholder="Имя артиста"
        className="add-artist-inp"
        onChange={(e) => setArtist(e.target.value)}
      />
      Загрузить фото артиста
      <label className="add-artist-label">
        +
        <input
          ref={inputFileEl}
          type="file"
          onChange={uploadPicture}
          className="add-artist-file"
        />
      </label>
      {artistPicture && <img src={artistPicture} alt={artist} />}
      <button className="add-artist-btn" onClick={handleCreate}>
        Создать
      </button>
    </div>
  );
};

export default AddArtist;
