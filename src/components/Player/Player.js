import React, { useState, useEffect, useRef } from 'react';
import ControlPanel from './Controls/ControlPanel';
import Slider from './Slider/Slider';
import './Player.css';
import { GoUnmute, GoMute } from 'react-icons/go';

const Player = ({ songs, cover, artist }) => {
  const [songsPlaylist, setSongsPlaylist] = useState(songs);
  const [percentage, setPercentage] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);
  const audioEl = useRef(null);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songsPlaylist.length) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  });

  const skipSong = (forwards = true) => {
    if (forwards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp++;
        if (temp > songs.length - 1) {
          temp = 0;
        }
        return temp;
      });
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp--;
        if (temp < 0) {
          temp = songs.length - 1;
        }
        return temp;
      });
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    audioEl.current.volume = volume / 100;
  };

  const handleMute = () => {
    audioEl.current.muted = !muted;
    setMuted(!muted);
  };

  const onChange = (e) => {
    const audio = audioEl.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };

  const play = () => {
    const audio = audioEl.current;
    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    }

    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    }
  };

  return (
    <div className="player">
      <audio
        src={songsPlaylist[currentSongIndex].song_link}
        ref={audioEl}
        onTimeUpdate={getCurrDuration}
        onLoadedData={(e) => {
          setDuration(e.currentTarget.duration.toFixed(2));
        }}></audio>
      <div className="player-details">
        <img src={cover} alt="cover" className="player-details-img" />
        <div className="player-details-text">
          <p>{songs[currentSongIndex].song_title}</p>
          <p>{artist}</p>
        </div>
      </div>
      <div className="player-controls">
        <ControlPanel
          play={play}
          isPlaying={isPlaying}
          duration={duration}
          currentTime={currentTime}
          skipSong={skipSong}
        />
        <Slider percentage={percentage} onChange={onChange} />
      </div>
      <div className="player-volume">
        {muted ? (
          <GoMute onClick={() => handleMute()} />
        ) : (
          <GoUnmute onClick={() => handleMute()} />
        )}
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
  );
};

export default Player;
