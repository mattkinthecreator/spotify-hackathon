import React, { useContext, useEffect, useState } from 'react';
import { artistsContext } from '../../contexts/ArtistsContext';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '../../helpers/fire';

const Home = () => {
  const { artists, getArtists } = useContext(artistsContext);

  const [song, setSong] = useState();

  useEffect(() => {
    getArtists();
  }, []);

  let updateActive = async (id, song) => {
    const artistDoc = doc(db, 'artists', id);
    let artistsCopy = artists[0];
    let newSongArray = artists[0].albums[0].songs.map((item) => {
      if (item.song_title === song.song_title) {
        item.active = item.active ? false : true;
      }
      return item;
    });
    await updateDoc(artistDoc, artistsCopy);
    getArtists();
  };

  console.log(song);

  return (
    <>
      {/* <div>
        {artists[0]
          ? artists[0].albums[0].songs.map((song) => {
              return (
                <div
                  key={song.song_title}
                  onClick={() => {
                    updateActive(artists[0].id, song);
                  }}
                  onMouseDown={() => setSong(song.song_link)}>
                  <img
                    src={artists[0].albums[0].album_cover}
                    alt="pixel bath cover"
                    width="200"
                    height="200"
                  />
                  <p>{song.song_title}</p>
                  {song.active ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
                </div>
              );
            })
          : null}
      </div> */}
      <audio preload="none" tabindex="0" controls>
        {artists[0]
          ? artists[0].albums[0].songs.map((song, index) => {
              return (
                <source src={song.song_link} data-track-number={index + 1} />
              );
            })
          : null}
      </audio>
    </>
  );
};

export default Home;
