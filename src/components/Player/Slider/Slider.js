import { useState, useRef, useEffect } from 'react';
import './Slider.css';
import './Thumb.css';

function Slider({ percentage = 0, onChange }) {
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [styleProgress, setStyleProgress] = useState({
    backgroundColor: '#fff',
    width: `${progressBarWidth}px`,
  });
  const [styleThumb, setStyleThumb] = useState({
    display: 'none',
    left: `${position}%`,
    marginLeft: `${marginLeft}px`,
  });

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

  return (
    <div className="slider-container">
      <div className="progress-bar-cover" style={styleProgress}></div>
      <div className="thumb" ref={thumbRef} style={styleThumb}></div>
      <input
        type="range"
        value={position}
        ref={rangeRef}
        step="0.01"
        className="range"
        onChange={onChange}
        onMouseEnter={() => {
          setStyleProgress({
            backgroundColor: '#1ed760',
            width: `${progressBarWidth}px`,
          });
          setStyleThumb({
            display: 'block',
            left: `${position}%`,
            marginLeft: `${marginLeft}px`,
          });
        }}
        onMouseLeave={() => {
          setStyleProgress({
            backgroundColor: '#fff',
            width: `${progressBarWidth}px`,
          });
          setStyleThumb({
            display: 'none',
            left: `${position}%`,
            marginLeft: `${marginLeft}px`,
          });
        }}
      />
    </div>
  );
}

export default Slider;
