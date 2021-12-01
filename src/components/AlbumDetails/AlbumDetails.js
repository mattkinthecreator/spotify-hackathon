import React, { useContext, useEffect } from 'react'
import { useLocation, useParams } from 'react-router'
import { artistsContext } from '../../contexts/ArtistsContext'
import './AlbumDetails.css'
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'

const AlbumDetails = () => {
  const {
    getAlbumDetails,
    albumDetails,
    setCurrentAlbum,
    isPlaying,
    setIsPlaying,
  } = useContext(artistsContext)

  const artistId = useLocation().pathname.split('/')[3]

  const albumId = useParams().id

  useEffect(() => {
    getAlbumDetails(artistId, albumId)
  }, [])

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
            <h2>{albumDetails.album}</h2>
          </div>
          <div className="album-details-songs">
            <h3>Треки</h3>
            {albumDetails.songs.map((song, index) => (
              <div className="aldbum-details-song">
                <span key={index}>{song.song_title}</span>
                <AiFillPlayCircle
                  onClick={() => {
                    setIsPlaying(!isPlaying)
                    setCurrentAlbum(albumDetails, index)
                  }}
                />
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default AlbumDetails
