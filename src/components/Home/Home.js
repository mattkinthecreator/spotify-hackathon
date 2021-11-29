import React, { useContext, useEffect, useState } from 'react'
import { artistsContext } from '../../contexts/ArtistsContext'
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import { doc, updateDoc } from '@firebase/firestore'
import { db } from '../../helpers/fire'
import Player from '../Player/Player'

const Home = () => {
  const { artists, getArtists } = useContext(artistsContext)

  useEffect(() => {
    getArtists()
  }, [])

  // let updateActive = async (id, song) => {
  //   const artistDoc = doc(db, 'artists', id)
  //   let artistsCopy = artists[0]
  //   let newSongArray = artists[0].albums[0].songs.map((item) => {
  //     if (item.song_title === song.song_title) {
  //       item.active = item.active ? false : true
  //     }
  //     return item
  //   })
  //   await updateDoc(artistDoc, artistsCopy)
  //   getArtists()
  // }

  return (
    <div className="home">
      <div className="container">
        {artists[0] && <Player songs={artists[0].albums[0].songs} />}
      </div>
    </div>
  )
}

export default Home
