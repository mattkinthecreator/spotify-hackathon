import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { artistsContext } from '../../contexts/ArtistsContext';

const Genre = () => {
  const { artists, getArtists } = useContext(artistsContext);

  useEffect(() => {
    getArtists();
  }, []);

  const genre = useLocation().pathname.split('/')[2];

  let albums = [];
  artists.forEach((item) => {
    albums.push({
      albums: item.albums.filter((album) => {
        return album.genre === genre;
      }),
      artistId: item.id,
    });
  });

  return (
    <div className="genre-list">
      <h1>{genre}</h1>
      <h3>Альбомы</h3>
      {albums
        ? albums.map((item) => (
            <>
              {item.albums.map((album) => (
                <div className="album">
                  <img src={album.album_cover} alt={album.album} />
                  <Link to={`/album/details/${item.artistId}/${album.album}`}>
                    {album.album}
                  </Link>
                </div>
              ))}
            </>
          ))
        : null}
    </div>
  );
};

export default Genre;
