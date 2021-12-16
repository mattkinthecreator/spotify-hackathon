import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { artistsContext } from '../../contexts/ArtistsContext';
import './Search.css';

const Search = () => {
  const { searchedArtists, getSearchArtist, artists, getArtists } =
    useContext(artistsContext);

  useEffect(() => {
    getSearchArtist('  ');
    getArtists();
  }, []);

  let genres = ['Rap', 'Rock', 'R&B', 'EDM'];

  let randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

  return (
    <div className="search">
      {searchedArtists[0] && <h1>Результат</h1>}
      {searchedArtists[0] ? (
        <div className="search-result-wrapper">
          <img
            src={searchedArtists[0].picture}
            alt={searchedArtists[0].artist}
            className="search-result-img"
          />
          <Link
            to={`/artist/details/${searchedArtists[0].id}`}
            className="search-result-link">
            {searchedArtists[0].artist}
          </Link>
        </div>
      ) : null}
      <h3>Жанры</h3>
      <div className="genres">
        {genres.map((item) => (
          <Link
            to={`/genres/${item}`}
            className="genre"
            style={{ backgroundColor: `#${randomColor()}` }}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
