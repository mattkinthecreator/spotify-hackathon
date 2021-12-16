import { useState, useRef, useEffect } from 'react';
import './Slider.css';
import './Thumb.css';

function Slider({ percentage = 0, onChange, currentTime, duration }) {
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
    <div className="slider-container">
<<<<<<< HEAD
      <div className="slider-time">
        <div className="timer">{secondsToHms(currentTime)}</div>
        <div className="timer">{secondsToHms(duration)}</div>
      </div>
=======
>>>>>>> 447f917f5946bc2576a67c02142e6f3ec0d72694
      <div
        className="progress-bar-cover"
        style={{
          width: `${progressBarWidth}px`,
<<<<<<< HEAD
        }}></div>
      <div
        className="thumb"
        ref={thumbRef}
        style={{ left: `${position}%`, marginLeft: `${marginLeft}px` }}></div>
=======
        }}
      ></div>
      <div
        className="thumb"
        ref={thumbRef}
        style={{
          left: `${position}%`,
          marginLeft: `${marginLeft}px`,
        }}
      ></div>
>>>>>>> 447f917f5946bc2576a67c02142e6f3ec0d72694
      <input
        type="range"
        value={position}
        ref={rangeRef}
        step="0.01"
        className="range"
        onChange={onChange}
      />
    </div>
  );
}

export default Slider;
