import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { artistsContext } from '../../contexts/ArtistsContext';
import './AlbumDetails.css';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { authContext } from '../../contexts/AuthContext';

const AlbumDetails = () => {
  const {
    getAlbumDetails,
    albumDetails,
    setCurrentAlbum,
    isPlaying,
    setIsPlaying,
    songIndex,
    currentAlbum,
    currentArtist,
  } = useContext(artistsContext);

  const { toggleFavorite, favorites } = useContext(authContext);

  const artistId = useLocation().pathname.split('/')[3];

  const albumId = useParams().id;

  useEffect(() => {
    getAlbumDetails(artistId, albumId);
  }, []);

  return (
    <div className="album-details">
      {albumDetails.album ? (
        <>
          <div className="album-details-info">
            <img
              src={albumDetails.album_cover}
              alt={albumDetails.album}
              className="album-details-cover"
            />
            <h2 className="album-title">{albumDetails.album}</h2>
          </div>
          <div className="album-details-songs">
            <h3>Треки</h3>
            {albumDetails.songs.map((song, index) => (
              <div className="album-details-song">
                <div className="song">
                  {currentAlbum.album === albumDetails.album &&
                  songIndex === index &&
                  isPlaying ? (
                    <AiFillPauseCircle
                      onClick={() => setIsPlaying(!isPlaying)}
                    />
                  ) : (
                    <AiFillPlayCircle
                      onClick={() => {
                        setIsPlaying(!isPlaying);
                        setCurrentAlbum(albumDetails, index);
                      }}
                    />
                  )}
                  <span key={index}>{song.song_title}</span>
                  <div className="song-favorites-wrapper">
                    {favorites.songs &&
                    favorites.songs.some(
                      (item) => item.song_title === song.song_title
                    ) ? (
                      <MdFavorite
                        onClick={() =>
                          toggleFavorite(
                            song,
                            albumDetails.album_cover,
                            currentArtist
                          )
                        }
                      />
                    ) : (
                      <MdFavoriteBorder
                        onClick={() =>
                          toggleFavorite(
                            song,
                            albumDetails.album_cover,
                            currentArtist
                          )
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AlbumDetails;
