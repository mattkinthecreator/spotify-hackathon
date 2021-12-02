import React, { useContext } from 'react';
import { authContext } from '../../contexts/AuthContext';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { artistsContext } from '../../contexts/ArtistsContext';
import SpotifyBig from '../../assets/imgs/spotify-fav.png';

import './Favorites.css';
import { MdFavorite } from 'react-icons/md';

const Favorites = () => {
  const { favorites, toggleFavorite } = useContext(authContext);

  const { setCurrentAlbum, setIsPlaying, songIndex, isPlaying, currentAlbum } =
    useContext(artistsContext);

  return (
    <div className="favorites">
      <div className="favorites-info">
        <img src={SpotifyBig} alt="spotify favorites" />
        <h2>Любимые треки</h2>
      </div>
      <div className="wrapper-favorites">
        {favorites.songs ? (
          favorites.songs.map((item, index) => (
            <div className="song-favorites">
              <div>
                {currentAlbum.album === favorites.album &&
                songIndex === index &&
                isPlaying ? (
                  <AiFillPauseCircle onClick={() => setIsPlaying(!isPlaying)} />
                ) : (
                  <AiFillPlayCircle
                    onClick={() => {
                      setCurrentAlbum(favorites, index);
                      setIsPlaying(!isPlaying);
                    }}
                  />
                )}
                <img
                  src={item.album_cover}
                  alt={item.artist}
                  className="song-favorites-cover"
                />
                <div>
                  <p>{item.song_title}</p>
                  <p>{item.artist}</p>
                </div>
              </div>
              <div>
                <MdFavorite
                  onClick={() =>
                    toggleFavorite(item, item.album_cover, item.artist)
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>Упс! Вы еще не добавляли треки в любимые</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
