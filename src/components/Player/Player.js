import React, { useState, useEffect, useRef, useContext } from 'react';
import ControlPanel from './Controls/ControlPanel';
import Slider from './Slider/Slider';
import './Player.css';
import { GoUnmute, GoMute } from 'react-icons/go';
import { artistsContext } from '../../contexts/ArtistsContext';
import NoCover from '../../assets/imgs/no-album-cover.png';

const Player = () => {
  const { currentArtist, currentAlbum, songIndex, isPlaying, setIsPlaying } =
    useContext(artistsContext);

  const [percentage, setPercentage] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);
  const audioEl = useRef(null);

  useEffect(() => {
    if (currentAlbum.songs) {
      setNextSongIndex(() => {
        if (currentSongIndex + 1 > currentAlbum.songs.length) {
          return 0;
        } else {
          return currentSongIndex + 1;
        }
      });
    }
  }, [currentSongIndex]);

  useEffect(() => {
    setCurrentSongIndex(songIndex);
    setIsPlaying(true);
  }, [songIndex]);

  useEffect(() => {
    if (audioEl.current) {
      if (isPlaying) {
        audioEl.current.play();
      } else {
        audioEl.current.pause();
      }
    }
  });

  const skipSong = (forwards = true) => {
    if (currentAlbum.songs) {
      if (forwards) {
        setCurrentSongIndex(() => {
          let temp = currentSongIndex;
          temp++;
          if (temp > currentAlbum.songs.length - 1) {
            temp = 0;
          }
          return temp;
        });
      } else {
        setCurrentSongIndex(() => {
          let temp = currentSongIndex;
          temp--;
          if (temp < 0) {
            temp = currentAlbum.songs.length - 1;
          }
          return temp;
        });
      }
    }
  };

  const handleVolumeChange = (e) => {
    if (audioEl.current) {
      setVolume(e.target.value);
      audioEl.current.volume = volume / 100;
    }
  };

  const handleMute = () => {
    if (audioEl.current) {
      audioEl.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const onChange = (e) => {
    const audio = audioEl.current;
    if (audio) {
      audio.currentTime = (audio.duration / 100) * e.target.value;
      setPercentage(e.target.value);
    }
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
    if (audio) {
      if (!isPlaying) {
        setIsPlaying(true);
        audio.play();
      }

      if (isPlaying) {
        setIsPlaying(false);
        audio.pause();
      }
    }
  };

  return (
    <div className="player">
      {currentAlbum.songs && (
        <audio
          src={currentAlbum.songs[currentSongIndex].song_link}
          ref={audioEl}
          onTimeUpdate={getCurrDuration}
          onLoadedData={(e) => {
            setDuration(e.currentTarget.duration.toFixed(2));
          }}
          onEnded={() => skipSong()}></audio>
      )}
      <div className="player-details">
        {currentAlbum.album_cover ? (
          <img
            src={currentAlbum.album_cover}
            alt="cover"
            className="player-details-img"
          />
        ) : (
          <img
            src={NoCover}
            alt="No Album Cover"
            className="player-details-img"
          />
        )}
        <div className="player-details-text">
          {currentAlbum.songs && (
            <p className="current-track">
              {currentAlbum.songs[currentSongIndex].song_title}
            </p>
          )}
          {currentArtist.artist && (
            <p className="current-artist">{currentArtist.artist}</p>
          )}
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
        <Slider
          percentage={percentage}
          onChange={onChange}
          duration={duration}
          currentTime={currentTime}
        />
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
