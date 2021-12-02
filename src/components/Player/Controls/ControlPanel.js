import React from 'react';
import Button from './Button';
import './ControlPanel.css';

function ControlPanel({ play, isPlaying, duration, currentTime, skipSong }) {
  return (
    <div className="control-panel">
      <Button play={play} isPlaying={isPlaying} skipSong={skipSong} />
    </div>
  );
}
export default ControlPanel;
