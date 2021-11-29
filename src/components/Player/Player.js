import React, { useState, useEffect, useRef } from 'react'

const Player = ({ songs }) => {
  const [songsPlaylist, setSongsPlaylist] = useState(songs)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(100)
  const audioEl = useRef(null)

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songsPlaylist.length) {
        return 0
      } else {
        return currentSongIndex + 1
      }
    })
  }, [currentSongIndex])

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play()
      console.log(audioEl.current.duration)
      console.log(audioEl.current.currentTime)
    } else {
      audioEl.current.pause()
    }
  })

  const skipSong = (forwards = true) => {
    if (forwards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex
        temp++
        if (temp > songs.length - 1) {
          temp = 0
        }
        return temp
      })
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex
        temp--
        if (temp < 0) {
          temp = songs.length - 1
        }
        return temp
      })
    }
  }

  const handleVolumeChange = (e) => {
    setVolume(e.target.value)
    audioEl.current.volume = volume / 100
  }

  const handleMute = () => {
    audioEl.current.muted
      ? (audioEl.current.muted = false)
      : (audioEl.current.muted = true)
  }

  return (
    <div>
      <audio
        src={songsPlaylist[currentSongIndex].song_link}
        ref={audioEl}
        onTimeUpdate={(e) => {
          setDuration(e.target.duration)
          setCurrentTime(e.target.currentTime)
        }}
      ></audio>
      <p>Current song: {songs[currentSongIndex].song_title}</p>
      <p>Next song: {songs[nextSongIndex].song_title}</p>
      <progress className="progress-bar" value={currentTime} max={duration}>
        {currentTime}
      </progress>
      <button onClick={() => skipSong(false)}>Prev</button>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button onClick={() => skipSong()}>Next</button>
      <div className="slidecontainer">
        <button onClick={() => handleMute()}>Mute</button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          className="slider"
          id="myRange"
          onChange={(e) => handleVolumeChange(e)}
        />
      </div>
    </div>
  )
}

export default Player
