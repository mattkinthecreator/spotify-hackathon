import React, { useContext } from 'react'
import { authContext } from '../../contexts/AuthContext'
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import { artistsContext } from '../../contexts/ArtistsContext'

const Favorites = () => {
  const { favorites } = useContext(authContext)

  const { setCurrentAlbum, setIsPlaying, songIndex, isPlaying } =
    useContext(artistsContext)

  return (
    <div className="favorites">
      {favorites.songs
        ? favorites.songs.map((item, index) => (
            <div className="song-favorites">
              {isPlaying ? (
                <AiFillPauseCircle />
              ) : (
                <AiFillPlayCircle
                  onClick={() => {
                    setIsPlaying(!isPlaying)
                    setCurrentAlbum(favorites, index)
                  }}
                />
              )}
              <p>{item.song_title}</p>
            </div>
          ))
        : null}
    </div>
  )
}

export default Favorites
