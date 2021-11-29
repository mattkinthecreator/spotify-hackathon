import React from 'react';
import './Button.css';
import { BsSkipEndFill, BsSkipStartFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';

function Button({ play, isPlaying, skipSong }) {
  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <div className="btn-container">
        <BsSkipStartFill onClick={() => skipSong(false)} className="btn-skip" />
        {isPlaying ? (
          <AiFillPauseCircle onClick={play} className="btn-stop" />
        ) : (
          <AiFillPlayCircle onClick={play} className="btn-play" />
        )}
        <BsSkipEndFill onClick={() => skipSong()} className="btn-skip" />
      </div>
    </IconContext.Provider>
  );
}
export default Button;
