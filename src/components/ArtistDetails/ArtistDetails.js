import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { artistsContext } from '../../contexts/ArtistsContext'
import './ArtistDetails.css'

const ArtistDetails = () => {
  const { getArtistDetails, artistDetails } = useContext(artistsContext)

  const id = useParams().id

  useEffect(() => {
    getArtistDetails(id)
  }, [])

  return (
    <div className="artist-details">
      {artistDetails ? (
        <>
          <div className="artist-details-info">
            <img
              src={artistDetails.picture}
              alt={artistDetails.artist}
              className="artist-details-img"
            />
            <h2 className="artist-details-name">{artistDetails.artist}</h2>
          </div>
          <div className="artist-details-albums-wrapper">
            <h2>Альбомы</h2>
            <div className="artist-details-albums">
              {artistDetails.albums &&
                artistDetails.albums.map((album) => {
                  return (
                    <div className="album">
                      <img
                        src={album.album_cover}
                        alt={album.album}
                        className="album-cover"
                      />
                      <Link to={`/album/details/${id}/${album.album}`}>
                        {album.album}
                      </Link>
                    </div>
                  )
                })}
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default ArtistDetails
