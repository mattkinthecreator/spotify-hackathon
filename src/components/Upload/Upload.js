import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import React, { useContext, useState } from 'react';
import { artistsContext } from '../../contexts/ArtistsContext';
import { storage } from '../../helpers/fire';
import './style.css';

const Upload = () => {
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [coverUrl, setCoverUrl] = useState(null);
  const [songs, setSongs] = useState([]);

  const [addSong, setAddSong] = useState(false);

  const { createArtist } = useContext(artistsContext);

  async function uploadCover(e) {
    const file = e.target.files[0];
    const storageRef = ref(storage, `${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', null, null, async () => {
      setCoverUrl(await getDownloadURL(uploadTask.snapshot.ref));
    });
  }

  async function uploadSong(e) {
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
      artist,
      albums: [
        {
          album,
          songs,
          album_cover: coverUrl,
        },
      ],
    };
    createArtist(obj);
  }

  return (
    <div className="upload">
      <input
        type="text"
        placeholder="Artist"
        onChange={(e) => setArtist(e.target.value)}
      />
      <input
        type="text"
        placeholder="Album"
        onChange={(e) => setAlbum(e.target.value)}
      />
      <br />
      <p>Upload album cover</p>
      <label className="upload__label">
        +
        <input type="file" onChange={uploadCover} className="upload__file" />
      </label>
      {coverUrl && <img src={coverUrl} alt="cover" width="200" height="200" />}
      {addSong && (
        <div>
          <input name="song" type="text" placeholder="Song Title" />
          <p>Upload song</p>
          <label className="upload__label">
            +
            <input type="file" onChange={uploadSong} className="upload__file" />
          </label>
          <button onClick={() => setAddSong(false)}>Add</button>
        </div>
      )}
      {!addSong && <button onClick={() => setAddSong(true)}>Add song</button>}
      {songs ? (
        <>
          {songs.map((item) => (
            <p key={item.song_title}>{item.song_title}</p>
          ))}
        </>
      ) : null}
      <button onClick={handleCreate}>Create Artist</button>
    </div>
  );
};

export default Upload;
