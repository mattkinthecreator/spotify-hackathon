import React from 'react';
import Button from './Button';
import './ControlPanel.css';

function ControlPanel({ play, isPlaying, duration, currentTime, skipSong }) {
  function secondsToHms(seconds) {
    if (!seconds) return '0:00';

    let duration = seconds;
    let hours = duration / 3600;
    duration = duration % 3600;

    let min = parseInt(duration / 60);
    duration = duration % 60;

    let sec = parseInt(duration);

    if (sec < 10) {
      sec = `0${sec}`;
    }
    if (min < 10) {
      min = `${min}`;
    }

    if (parseInt(hours, 10) > 0) {
      return `${parseInt(hours, 10)}:${min}:${sec}`;
    } else if (min == 0) {
      return `0:${sec}`;
    } else {
      return `${min}:${sec}`;
    }
  }

  return (
    <div className="control-panel">
      <div className="timer">{secondsToHms(currentTime)}</div>
      <Button play={play} isPlaying={isPlaying} skipSong={skipSong} />
      <div className="timer">{secondsToHms(duration)}</div>
    </div>
  );
}
export default ControlPanel;
