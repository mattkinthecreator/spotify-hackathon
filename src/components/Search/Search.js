import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { artistsContext } from '../../contexts/ArtistsContext'
import './Search.css'

const Search = () => {
  const { searchedArtists, getSearchArtist } = useContext(artistsContext)

  useEffect(() => {
    getSearchArtist('  ')
  }, [])

  return (
    <div className="search">
      {searchedArtists[0] ? (
        <div className="search-result-wrapper">
          <h1>Результат</h1>
          <img
            src={searchedArtists[0].picture}
            alt={searchedArtists[0].artist}
            className="search-result-img"
          />
          <Link
            to={`/artist/details/${searchedArtists[0].id}`}
            className="search-result-link"
          >
            {searchedArtists[0].artist}
          </Link>
        </div>
      ) : null}
    </div>
  )
}

export default Search
