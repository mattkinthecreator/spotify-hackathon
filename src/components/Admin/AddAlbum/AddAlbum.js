import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import React, { useContext, useState } from 'react';
import { artistsContext } from '../../../contexts/ArtistsContext';
import { storage } from '../../../helpers/fire';
import './AddAlbum.css';

const AddAlbum = () => {
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [coverUrl, setCoverUrl] = useState(null);
  const [songs, setSongs] = useState([]);

  const [addSong, setAddSong] = useState(false);

  const { addNewAlbum, getSearchArtist, searchedArtists } =
    useContext(artistsContext);

  async function uploadCover(e) {
    const file = e.target.files[0];
    const storageRef = ref(storage, `${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', null, null, async () => {
      setCoverUrl(await getDownloadURL(uploadTask.snapshot.ref));
    });
  }

  async function uploadSong(e) {
    console.log(e.target.parentNode.previousSibling.previousSibling.value);
    const file = e.target.files[0];
    const storageRef = ref(storage, `${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', null, null, async () => {
      let arr = [...songs];
      arr.push({
        song_title: e.target.parentNode.previousSibling.previousSibling.value,
        song_link: await getDownloadURL(uploadTask.snapshot.ref),
      });
      setSongs(arr);
    });
  }

  function handleCreate() {
    let obj = {
      album,
      songs,
      genre,
      album_cover: coverUrl,
    };
    addNewAlbum(artist, obj);
  }

  return (
    <div className="upload">
      <div className="upload-search">
        <input
          type="text"
          placeholder="Найти артиста"
          onChange={(e) => getSearchArtist(e.target.value)}
          className="upload-input"
        />
        {searchedArtists.map((item, index) => (
          <button
            key={index}
            onClick={() => setArtist(item)}
            className="upload-artist-option">
            {item.artist}
          </button>
        ))}
      </div>
      {artist.artist && <p className="upload-artist">{artist.artist}</p>}
      <input
        type="text"
        placeholder="Альбом"
        onChange={(e) => setAlbum(e.target.value)}
        className="upload-input"
      />
      <input
        type="text"
        placeholder="Жанр"
        onChange={(e) => setGenre(e.target.value)}
        className="upload-input"
      />
      <br />
      <p>Загрузить обложку альбома</p>
      <label className="upload__label">
        +
        <input type="file" onChange={uploadCover} className="upload__file" />
      </label>
      {coverUrl && <img src={coverUrl} alt="cover" width="200" height="200" />}
      {addSong && (
        <>
          <input
            name="song"
            type="text"
            placeholder="Название песни"
            className="upload-input"
          />
          <p>Загрузить песню</p>
          <label className="upload__label">
            +
            <input type="file" onChange={uploadSong} className="upload__file" />
          </label>
          <button onClick={() => setAddSong(false)} className="upload-btn">
            Добавить
          </button>
        </>
      )}
      {!addSong && (
        <button onClick={() => setAddSong(true)} className="upload-btn">
          Добавить песню
        </button>
      )}
      {songs ? (
        <>
          {songs.map((item) => (
            <p key={item.song_title}>{item.song_title}</p>
          ))}
        </>
      ) : null}
      <button onClick={handleCreate} className="upload-btn">
        Создать альбом
      </button>
    </div>
  );
};

export default AddAlbum;
