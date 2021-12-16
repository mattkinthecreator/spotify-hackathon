import { useState, useRef, useEffect } from 'react';
import './Slider.css';
import './Thumb.css';

<<<<<<< HEAD
function Slider({ percentage = 0, onChange, currentTime, duration }) {
=======
function Slider({
  percentage = 0,
  onChange,
  container,
  duration,
  currentTime,
}) {
>>>>>>> 803c76ba82cd6b954904a8ecdf60cff62b5c78ee
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const rangeRef = useRef();
  const thumbRef = useRef();

  useEffect(() => {
    const rangeWidth = rangeRef.current.getBoundingClientRect().width;
    const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * percentage -
      (thumbWidth / 100) * percentage;
    setPosition(percentage);
    setMarginLeft(centerThumb);
    setProgressBarWidth(centerProgressBar);
  }, [percentage]);

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
<<<<<<< HEAD
    <div className="slider-container">
      <div
        className="progress-bar-cover"
        style={{
          width: `${progressBarWidth}px`,
        }}></div>
      <div
        className="thumb"
        ref={thumbRef}
        style={{
          left: `${position}%`,
          marginLeft: `${marginLeft}px`,
        }}></div>
      <input
        type="range"
        value={position}
        ref={rangeRef}
        step="0.01"
        className="range"
        onChange={onChange}
      />
=======
    <div className={container}>
      {container === 'slider-container' ? (
        <div className="timer">{secondsToHms(currentTime)}</div>
      ) : null}
      <div className="progress-bar-wrapper">
        <div
          className="progress-bar-cover"
          style={{
            width: `${progressBarWidth}px`,
          }}></div>
        <div
          className="thumb"
          ref={thumbRef}
          style={{
            left: `${position}%`,
            marginLeft: `${marginLeft}px`,
          }}></div>
        <input
          type="range"
          value={position}
          ref={rangeRef}
          step="0.01"
          className={`${container}-range`}
          onChange={onChange}
        />
      </div>
      {container === 'slider-container' ? (
        <div className="timer">{secondsToHms(duration)}</div>
      ) : null}
>>>>>>> 803c76ba82cd6b954904a8ecdf60cff62b5c78ee
    </div>
  );
}

export default Slider;
