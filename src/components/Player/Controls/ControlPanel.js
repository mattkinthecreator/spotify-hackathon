import React from 'react';
import Button from './Button';
import './ControlPanel.css';

<<<<<<< HEAD
function ControlPanel({ play, isPlaying, duration, currentTime, skipSong }) {
=======
function ControlPanel({ play, isPlaying, skipSong }) {
>>>>>>> 803c76ba82cd6b954904a8ecdf60cff62b5c78ee
  return (
    <div className="control-panel">
      <Button play={play} isPlaying={isPlaying} skipSong={skipSong} />
    </div>
  );
}
export default ControlPanel;
